import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBars, faMagnifyingGlass, faPhone, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function MessagePage() {
  const params = useParams();
  const { socketConnection } = useGlobalContext();
  const user = useSelector((state) => state?.user);
  console.log("params", params.userId);
  console.log("Socket Connection Status:", socketConnection);

  const [dataUser, setDataUser] = useState({
    _id: "",
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

      // return () => {
      //   socketConnection.off("messageUser");
      // };
    }
  }, [socketConnection, params.userId, user]);
  return (
    <main className="h-full">
      <header className="sticky top-0 flex h-[68px] items-center justify-between border-b border-[#c8c9cc] px-4">
        <div className="flex w-full items-center space-x-4">
          <button className="relative">
            <img
              src={dataUser?.profilePic}
              alt={dataUser.name}
              className="h-12 w-12 rounded-full border border-[rgba(0,0,0,0.15)] object-cover"
            />
            {dataUser.online ? (
              <div className="absolute bottom-[2px] right-[2px] h-3 w-3 rounded-full border-2 border-white bg-[#2dc937]"></div>
            ) : (
              <div className="absolute bottom-[2px] right-[2px] h-3 w-3 rounded-full border-2 border-white bg-[#c8c9cc]"></div>
            )}
          </button>
          <div className="flex flex-col gap-y-1">
            <span className="text-base font-semibold">{dataUser?.name}</span>
            <button className="flex">
              <FontAwesomeIcon
                icon={faBookmark}
                width={16}
                className="rotate-90 text-sm text-[#555454] hover:text-[#005ae0]"
              />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-[3px]">
          <button className="flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-[#ebe7eb]">
            <FontAwesomeIcon icon={faPlus} width={20} className="text-lg" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-[#ebe7eb]">
            <FontAwesomeIcon icon={faPhone} width={20} className="text-lg" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-[#ebe7eb]">
            <FontAwesomeIcon icon={faVideo} width={20} className="text-lg" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-[#ebe7eb]">
            <FontAwesomeIcon icon={faMagnifyingGlass} width={18} className="text-lg" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-[#ebe7eb]">
            <FontAwesomeIcon icon={faBars} width={18} className="text-lg" />
          </button>
        </div>
      </header>
    </main>
  );
}
