const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");
const app = express();

// Socket connection
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FONTEND_URL,
    credentials: true,
  },
});

/***
 * Socket running at port 5000
 */

// Online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("Connected User: ", socket.id);

  const token = socket.handshake.auth.token;

  // Current user
  const user = await getUserDetailsFromToken(token);

  // Create a room with user id
  socket.join(user?._id);
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("joinRoom", async (userId) => {
    console.log("Join room", userId);
    const userDetail = await UserModel.findById(userId).select("-password");

    const payload = {
      _id: userDetail?._id,
      name: userDetail?.name,
      phone: userDetail?.phone,
      profilePic: userDetail?.profilePic,
      online: onlineUser.has(userId),
    };

    socket.emit("messageUser", payload);
  });

  //   Disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("User disconnected", socket.id);
  });
});

module.exports = {
  app,
  server,
};
