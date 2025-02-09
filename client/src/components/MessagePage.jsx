import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";

export default function MessagePage() {
  const params = useParams();
  const { socketConnection } = useGlobalContext();
  console.log("params", params.userId);
  console.log("Socket Connection Status:", socketConnection);

  const [dataUser, setDataUser] = useState({
    name: "",
    phone: "",
    profilePic: "",
    online: false,
  });

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("joinRoom", params.userId);
      
      socketConnection.on("messageUser", (payload) => {
        console.log("Message User: ", payload);
        setDataUser(payload);
      });
    }
  }, [socketConnection, params.userId]);
  return (
    <div>
      <h1>Message Page</h1>
      <div>
        <img src={dataUser?.profilePic} alt={dataUser.name} />
        <h3>{dataUser?.name}</h3>
        <p>{dataUser?.phone}</p>
        <p>{dataUser.online ? "Online" : "Offline"}</p>
      </div>
    </div>
  )
}
