import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  phone: "",
  name: "",
  profilePic: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.profilePic = action.payload.profilePic;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state._id = "";
      state.phone = "";
      state.name = "";
      state.profilePic = "";
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
