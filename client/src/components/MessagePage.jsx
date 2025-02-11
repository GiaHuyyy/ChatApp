import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBookmark,
  faFaceLaughSquint,
  faFaceSmile,
  faFolderClosed,
  faImage,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBolt,
  faCamera,
  faEllipsis,
  faFilePen,
  faMagnifyingGlass,
  faPaperPlane,
  faPhone,
  faPlus,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import commingSoon from "../helpers/commingSoon";
import uploadFileToCloud from "../helpers/uploadFileToClound";
import { format } from "date-fns";

export default function MessagePage() {
  const params = useParams();
  const { socketConnection } = useGlobalContext();
  const user = useSelector((state) => state?.user);
  console.log("params", params);
  console.log("Socket Connection Status:", socketConnection);

  const [dataUser, setDataUser] = useState({
    _id: "",
    name: "",
    phone: "",
    profilePic: "",
    online: false,
  });

  const [messages, setMessages] = useState({
    text: "",
    imageUrl: "",
    fileUrl: "",
    fileName: "",
  });
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [openTrash, setOpenTrash] = useState(false);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("joinRoom", params.userId);

      socketConnection.on("messageUser", (payload) => {
        console.log("Message User: ", payload);
        setDataUser(payload);
      });

      socketConnection.on("message", (message) => {
        console.log("Message Data", message);
        setAllMessages(message.messages);
      });
    }
  }, [socketConnection, params.userId, user]);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [allMessages]);

  const Button = ({ icon, width, title, styleIcon, isUpload, id, handleOnClick }) => {
    return isUpload ? (
      <label
        htmlFor={id}
        title={title}
        onClick={handleOnClick}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[3px] hover:bg-[#ebe7eb]"
      >
        <FontAwesomeIcon icon={icon} width={width} className={`${styleIcon}`} />
      </label>
    ) : (
      <button
        title={title}
        onClick={handleOnClick}
        className="flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-[#ebe7eb]"
      >
        <FontAwesomeIcon icon={icon} width={width} className={`${styleIcon}`} />
      </button>
    );
  };

  Button.propTypes = {
    icon: PropTypes.object,
    width: PropTypes.number,
    title: PropTypes.string,
    styleIcon: PropTypes.string,
    isUpload: PropTypes.bool,
    id: PropTypes.string,
    handleOnClick: PropTypes.func,
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    console.log("File: ", file);
    setSelectedFile(file);
  };

  const handleClearUploadFile = () => {
    setSelectedFile(null);
    if (imageInputRef.current) imageInputRef.current.value = null;
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSendMessage = async () => {
    let fileUrl = "";
    if (selectedFile) {
      const uploadFile = await uploadFileToCloud(selectedFile);
      fileUrl = uploadFile.url;
      // Ensure the URL starts with https
      // if (!fileUrl.startsWith("https://")) {
      //   fileUrl = fileUrl.replace(/^http:\/\//i, "https://");
      // }
      
    }

    const newMessage = {
      sender: user._id,
      receiver: params.userId,
      text: messages.text,
      imageUrl: selectedFile?.type.startsWith("image/") ? fileUrl : "",
      fileUrl: !selectedFile?.type.startsWith("image/") ? fileUrl : "",
      fileName: selectedFile?.name,
      msgByUserId: user?._id,
    };

    // Gửi tin nhắn qua socket
    socketConnection.emit("newMessage", newMessage);

    // Reset state
    setMessages({ text: "", imageUrl: "", fileUrl: "", fileName: "" });
    setSelectedFile(null);
    handleClearUploadFile();
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    if (selectedFile.type.startsWith("image/")) {
      return (
        <img src={URL.createObjectURL(selectedFile)} alt="image" className="aspect-square max-w-sm object-scale-down" />
      );
    }

    if (selectedFile.type.startsWith("video/")) {
      return (
        <video controls className="aspect-square max-w-sm object-scale-down">
          <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <div className="mt-5 flex flex-col items-center">
        <FontAwesomeIcon icon={faFilePen} width={50} className="text-[#ccc]" />
        <p className="mt-2 text-sm">{selectedFile.name}</p>
      </div>
    );
  };

  return (
    <main className="flex h-full flex-col">
      {/* Header chat */}
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
          <Button title="Thêm bạn vào nhóm" icon={faPlus} width={20} handleOnClick={commingSoon} />
          <Button title="Cuộc gọi thoại" icon={faPhone} width={20} />
          <Button title="Cuộc gọi video" icon={faVideo} width={20} />
          <Button title="Tìm kiếm tin nhắn" icon={faMagnifyingGlass} width={18} />
          <Button title="Thông tin hội thoại" icon={faBars} width={18} />
        </div>
      </header>

      {/* Show all message chat */}
      <section className="relative flex-1 overflow-y-auto overflow-x-hidden bg-[#ebecf0]">
        {/* All message chat */}
        <div className="absolute inset-0 mt-2 flex flex-col gap-y-2 px-4" ref={currentMessage}>
          {allMessages.map((message) => (
            <div
              key={message._id}
              className={`flex gap-x-2 ${message.msgByUserId === user._id ? "justify-end" : "justify-start"}`}
            >
              {message.msgByUserId !== user._id && (
                <button className="flex">
                  <img
                    src={dataUser.profilePic}
                    alt="avatar"
                    className="h-9 w-9 rounded-full border border-[rgba(0,0,0,0.15)] object-cover"
                  />
                </button>
              )}

              <div
                className={`h-full max-w-md rounded-md border border-[#c9d0db] p-3 ${
                  message.msgByUserId === user._id ? "bg-[#dbebff] text-[#081b3a]" : "bg-white text-[#081b3a]"
                }`}
              >
                {message.imageUrl && (
                  <img src={message.imageUrl} alt="image" className="rounded-[3px] object-contain" />
                )}
                {message.fileUrl && (
                  <div className="flex items-center gap-x-1">
                    {message.fileUrl.endsWith(".mp4") ||
                    message.fileUrl.endsWith(".webm") ||
                    message.fileUrl.endsWith(".ogg") ? (
                      <video controls className="rounded-[3px] object-contain">
                        <source src={message.fileUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faFilePen} width={20} className="text-[#ccc]" />
                        <a href={message.fileUrl} className="break-words text-sm">
                          {message.fileName}
                        </a>
                      </>
                    )}
                  </div>
                )}
                <div>
                  <p className="break-words text-sm">{message.text}</p>
                  <p className="mt-1 text-[11px] text-[#00000080]">{format(new Date(message.createdAt), "HH:mm")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Render file preview */}
        {selectedFile && (
          <div className="sticky top-0 z-50 flex h-full items-center justify-center bg-gray-400 bg-opacity-40">
            <div
              className="relative rounded bg-[#fffefe] p-4"
              onMouseEnter={() => setOpenTrash(true)}
              onMouseLeave={() => setOpenTrash(false)}
            >
              {renderFilePreview()}
              {openTrash && (
                <button
                  onClick={handleClearUploadFile}
                  className="group absolute right-0 top-0 mr-1 mt-1 h-7 w-7 rounded hover:bg-[#f0f0f0]"
                >
                  <FontAwesomeIcon icon={faTrash} width={12} className="text-[#ccc] group-hover:text-red-400" />
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Sent message */}
      <footer>
        <div className="flex h-10 items-center gap-x-3 border-b border-t border-[#c8c9cc] px-2">
          <Button title="Gửi Sticker" icon={faFaceLaughSquint} width={20} handleOnClick={commingSoon}/>
          <Button title="Gửi hình ảnh" icon={faImage} width={20} isUpload id="image" />
          <Button title="Gửi kèm File" icon={faFolderClosed} width={20} isUpload id="file" />
          <Button title="Gửi danh thiếp" icon={faAddressCard} width={20} handleOnClick={commingSoon}/>
          <Button title="Chụp kèm với cửa sổ Z" icon={faCamera} width={20} handleOnClick={commingSoon}/>
          <Button title="Định dạng tin nhắn" icon={faFilePen} width={20} handleOnClick={commingSoon}/>
          <Button title="Chèn tin nhắn nhanh" icon={faBolt} width={20} handleOnClick={commingSoon}/>
          <Button title="Tùy chọn thêm" icon={faEllipsis} width={20} handleOnClick={commingSoon}/>
        </div>

        {/* Input file*/}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          hidden
          onChange={handleUploadFile}
          ref={imageInputRef}
        />
        <input type="file" name="file" id="file" hidden onChange={handleUploadFile} ref={fileInputRef} />

        <div className="flex h-[50px] items-center px-3 py-[10px]">
          <input
            type="text"
            placeholder={`Nhập @, tin nhắn với ${dataUser.name}`}
            className="h-full flex-1 rounded-[3px] text-sm"
            value={messages.text}
            onChange={(e) => setMessages({ ...messages, text: e.target.value })}
          />
          <div className="flex items-center gap-x-1">
            <Button title="Biểu cảm" icon={faFaceSmile} width={20} />
            {messages.text === "" && !selectedFile ? (
              <Button title="Gửi nhanh biểu tưởng cảm xúc" icon={faThumbsUp} width={20} />
            ) : (
              <Button
                title="Gửi tin nhắn"
                icon={faPaperPlane}
                width={20}
                styleIcon="text-[#005ae0]"
                handleOnClick={handleSendMessage}
              />
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
