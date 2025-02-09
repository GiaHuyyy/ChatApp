import { useEffect, useRef, useState } from "react";

import { faAddressBook, faMessage, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faBriefcase,
  faCloud,
  faCloudArrowUp,
  faEllipsis,
  faGear,
  faMagnifyingGlass,
  faPlus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import EditUserDetails from "./EditUserDetails";
import DropdownAvatar from "./DropdownAvatar";
import DropdownSetting from "./DropdownSetting";
import AddFriend from "./AddFriend";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const isOnline = user?.onlineUser?.includes(user?._id);

  const [allUsers, setAllUsers] = useState([]);

  const [dropdownSettingVisible, setDropdownSettingVisible] = useState(false);
  const dropdownSettingRef = useRef(null);
  const buttonSettingRef = useRef(null);

  const [dropdownAvatarVisible, setDropdownAvatarVisible] = useState(false);
  const dropdownAvatarRef = useRef(null);
  const buttonAvatarRef = useRef(null);

  const [editUserDetails, setEditUserDetails] = useState(false);
  const [addFriend, setAddFriend] = useState(false);

  const toggleDropdownSetting = () => {
    setDropdownSettingVisible(!dropdownSettingVisible);
    setDropdownAvatarVisible(false);
  };

  const toggleDropdownAvatar = () => {
    setDropdownAvatarVisible(!dropdownAvatarVisible);
    setDropdownSettingVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownSettingRef.current &&
        !dropdownSettingRef.current.contains(event.target) &&
        !buttonSettingRef.current.contains(event.target)
      ) {
        setDropdownSettingVisible(false);
      }

      if (
        dropdownAvatarRef.current &&
        !dropdownAvatarRef.current.contains(event.target) &&
        !buttonAvatarRef.current.contains(event.target)
      ) {
        setDropdownAvatarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownSettingRef, buttonSettingRef]);

  const ButtonTab = ({ icon, styles, isActive, isRef, handleClick }) => {
    return (
      <button
        ref={isRef ? buttonSettingRef : null}
        className={`flex h-12 w-12 items-center justify-center rounded-md text-2xl ${
          isActive ? "bg-[#00000040]" : ""
        } text-white hover:bg-[#38383840] ${styles}`}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    );
  };

  ButtonTab.propTypes = {
    icon: PropTypes.object.isRequired,
    styles: PropTypes.string,
    isActive: PropTypes.bool,
    handleClick: PropTypes.func,
    isRef: PropTypes.bool,
  };

  return (
    <nav className="flex h-full">
      {/* Main tabs */}
      <div className="h-full w-16 bg-[#005ae0]">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="relative flex h-[100px] justify-center pt-8">
              <button onClick={toggleDropdownAvatar} ref={buttonAvatarRef}>
                <img
                  src={user?.profilePic}
                  alt="avatar"
                  className="h-12 w-12 select-none rounded-full object-cover"
                  title={user?.name}
                />
                {/* Status online */}
                {isOnline && (
                  <div className="absolute bottom-[9px] right-[9px] h-3 w-3 rounded-full border-2 border-white bg-[#2dc937]"></div>
                )}
              </button>

              {/* Dropdown Avatar */}
              {dropdownAvatarVisible && (
                <DropdownAvatar
                  dropdownAvatarRef={dropdownAvatarRef}
                  dataUser={user}
                  openEditUserDetails={() => setEditUserDetails(true)}
                />
              )}
            </div>

            {/* Tabs top */}
            <div className="flex flex-col items-center gap-y-2 py-1">
              <ButtonTab icon={faMessage} isActive={true} />
              <ButtonTab icon={faAddressBook} />
              <ButtonTab icon={faSquareCheck} />
            </div>
          </div>

          {/* Tabs bottom */}
          <div className="relative flex flex-col items-center gap-y-[8px] pb-3">
            <ButtonTab icon={faCloudArrowUp} />
            <div className="h-[1px] w-[38px] bg-white"></div>
            <ButtonTab icon={faCloud} />
            <ButtonTab icon={faBriefcase} />
            <ButtonTab icon={faGear} handleClick={toggleDropdownSetting} isRef />

            {/* Dropdown Settings */}
            {dropdownSettingVisible && (
              <DropdownSetting
                dropdownSettingRef={dropdownSettingRef}
                openEditUserDetails={() => setEditUserDetails(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Sidebar action */}
      <div className="flex-1">
        {/* Contact */}
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex h-8 w-60 items-center overflow-hidden rounded-[5px] bg-[#ebecf0] pl-3">
            <FontAwesomeIcon icon={faMagnifyingGlass} width={15} className="text-[#a5a4a4]" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Tìm kiếm"
              className="flex-1 bg-transparent pl-1 text-sm"
            />
          </div>

          <div className="flex items-center">
            <button
              className="flex h-8 w-8 items-center justify-center rounded hover:bg-[#ebecf0]"
              onClick={() => setAddFriend(true)}
            >
              <FontAwesomeIcon icon={faUserPlus} width={18} className="text-[#555454]" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded hover:bg-[#ebecf0]">
              <FontAwesomeIcon icon={faPlus} width={18} className="text-[#555454]" />
            </button>
          </div>
        </div>

        {/* Chat */}
        <div className="h-[calc(100%-4rem)]">
          {/* Chat filter */}
          <div className="flex h-8 items-center border-b border-gray-300 px-4">
            <div className="h-full">
              <button className="mr-3 h-full border-b-[2px] border-[#005ae0] text-[13px] font-semibold text-[#005ae0]">
                Tất cả
              </button>
              <button className="text-[13px] font-semibold text-[#5a6981]">Chưa đọc</button>
            </div>
            <div className="ml-auto flex items-center gap-x-4">
              <button className="flex items-center gap-x-2 pl-2 pr-1">
                <span className="text-[13px]">Phân loại</span>
                <FontAwesomeIcon icon={faAngleDown} width={12} />
              </button>
              <button>
                <FontAwesomeIcon icon={faEllipsis} width={12} />
              </button>
            </div>
          </div>

          {/* Chat list */}
          <div className="h-[calc(100%-2rem)] overflow-y-auto">
            {allUsers.length === 0 && (
              <div className="flex h-[calc(100%-4rem)] items-center justify-center">
                <p className="mt-3 text-sm text-[#5a6981]">Không có tin nhắn nào</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EditUserDetails */}
      {editUserDetails && <EditUserDetails onClose={() => setEditUserDetails(false)} dataUser={user} />}

      {/* AddFriend */}
      {addFriend && <AddFriend onClose={() => setAddFriend(false)} />}
    </nav>
  );
}
