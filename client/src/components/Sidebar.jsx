import { useEffect, useRef, useState } from "react";

import { faAddressBook, faMessage, faSquareCheck, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faArrowUpRightFromSquare,
  faBriefcase,
  faCloud,
  faCloudArrowUp,
  faDatabase,
  faGear,
  faGlobe,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Images from "../constants/images";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import EditUserDetails from "./EditUserDetails";

export default function Sidebar() {
  const user = useSelector((state) => state.user);

  const [dropdownSettingVisible, setDropdownSettingVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(null);
  const dropdownSettingRef = useRef(null);
  const buttonSettingRef = useRef(null);

  const [dropdownAvatarVisible, setDropdownAvatarVisible] = useState(false);
  const dropdownAvatarRef = useRef(null);
  const buttonAvatarRef = useRef(null);

  const [editUserDetails, setEditUserDetails] = useState(false);

  const toggleDropdownSetting = () => {
    setDropdownSettingVisible(!dropdownSettingVisible);
    setDropdownAvatarVisible(false);
  };

  const toggleDropdownAvatar = () => {
    setDropdownAvatarVisible(!dropdownAvatarVisible);
    setDropdownSettingVisible(false);
  };

  const handleMouseEnter = (menu) => {
    setSubmenuVisible(menu);
  };

  const handleMouseLeave = () => {
    setSubmenuVisible(null);
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
        className={`flex items-center justify-center w-12 h-12 text-2xl rounded-md ${
          isActive ? "bg-[#00000040]" : ""
        } hover:bg-[#38383840] text-white ${styles}`}
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
    <nav className="h-full">
      {/* Main tabs */}
      <div className="w-16 bg-[#005ae0] h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="h-[100px] pt-8 flex justify-center relative">
              <button onClick={toggleDropdownAvatar} ref={buttonAvatarRef}>
                <img
                  src={user?.profilePic}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover select-none"
                  title={user?.name}
                />
              </button>

              {/* Dropdown Avatar */}
              {dropdownAvatarVisible && (
                <div
                  ref={dropdownAvatarRef}
                  className="absolute -top-3 left-16 py-2 mt-14 w-[298px] bg-white shadow-md rounded"
                >
                  <p className="px-2 mb-2 text-lg font-bold">{user?.name}</p>

                  <div className="h-[1px] bg-[#00000026] my-1 mx-2"></div>

                  <button className="flex items-center justify-between w-full h-9 text-left px-2 hover:bg-gray-200">
                    <span className="text-sm">Nâng cấp tài khoản</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} width={15} />
                  </button>
                  <button
                    className="w-full h-9 text-left px-2 hover:bg-gray-200"
                    onClick={() => setEditUserDetails(true)}
                  >
                    <span className="text-sm">Hồ sơ của bạn</span>
                  </button>
                  <button className="w-full h-9 text-left px-2 hover:bg-gray-200">
                    <span className="text-sm">Cài đặt</span>
                  </button>

                  <div className="h-[1px] bg-[#00000026] my-1 mx-2"></div>

                  <button className="w-full h-9 text-left px-2 hover:bg-gray-200">
                    <span className="text-sm">Đăng xuất</span>
                  </button>
                </div>
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
          <div className="flex flex-col items-center gap-y-[8px] pb-3 relative">
            <ButtonTab icon={faCloudArrowUp} />
            <div className="w-[38px] h-[1px] bg-white"></div>
            <ButtonTab icon={faCloud} />
            <ButtonTab icon={faBriefcase} />
            <ButtonTab icon={faGear} handleClick={toggleDropdownSetting} isRef />

            {/* Dropdown Settings */}
            {dropdownSettingVisible && (
              <div
                ref={dropdownSettingRef}
                className="absolute bottom-[66px] left-2 py-2 mt-14 w-56 bg-white shadow-md rounded-md"
              >
                <button className="w-full h-9 px-3 text-left hover:bg-gray-200">
                  <FontAwesomeIcon icon={faUser} width={20} className="mr-3" />
                  <span className="text-sm">Thông tin tài khoản</span>
                </button>
                <button className="w-full h-9 px-3 text-left hover:bg-gray-200">
                  <FontAwesomeIcon icon={faGear} width={20} className="mr-3" />
                  <span className="text-sm">Cài đặt</span>
                </button>

                <div className="h-[1px] bg-[#00000026] my-1 mx-2"></div>

                <button
                  className="flex items-center w-full h-9 px-3 text-left hover:bg-gray-200"
                  onMouseEnter={() => handleMouseEnter("data")}
                  onMouseLeave={handleMouseLeave}
                >
                  <FontAwesomeIcon icon={faDatabase} width={20} className="mr-3" />
                  <span className="mr-auto text-sm">Dữ liệu</span>
                  <FontAwesomeIcon icon={faAngleRight} fontSize={13} />
                </button>
                {submenuVisible === "data" && (
                  <div
                    className="absolute left-full top-[74px] mt-2 w-[157px] py-2 bg-white shadow-md rounded-md"
                    onMouseEnter={() => handleMouseEnter("data")}
                  >
                    {/* Submenu items for Dữ liệu */}
                    <button className="w-full h-9 px-3 text-left text-sm hover:bg-gray-200">Quản lý File</button>
                  </div>
                )}
                <button
                  className="flex items-center w-full h-9 px-3 text-left hover:bg-gray-200"
                  onMouseEnter={() => handleMouseEnter("language")}
                  onMouseLeave={handleMouseLeave}
                >
                  <FontAwesomeIcon icon={faGlobe} width={20} className="mr-3" />
                  <span className="mr-auto text-sm">Ngôn ngữ</span>
                  <FontAwesomeIcon icon={faAngleRight} fontSize={13} />
                </button>
                {submenuVisible === "language" && (
                  <div
                    className="absolute left-full top-[108px] mt-2 w-[157px] py-2 bg-white shadow-md rounded-md"
                    onMouseEnter={() => handleMouseEnter("language")}
                  >
                    {/* Submenu items for Ngôn ngữ */}
                    <button className="flex items-center w-full h-9 px-3 text-left text-sm hover:bg-gray-200">
                      <img src={Images.VI} alt="Viet Nam" className="w-5 mr-3 object-contain" />
                      Tiếng việt ✔
                    </button>
                    <button className="flex items-center w-full h-9 px-3 text-left text-sm hover:bg-gray-200">
                      <img src={Images.EN} alt="Viet Nam" className="w-5 mr-3 object-contain" />
                      English
                    </button>
                  </div>
                )}
                <button
                  className="flex items-center w-full h-9 px-3 text-left hover:bg-gray-200"
                  onMouseEnter={() => handleMouseEnter("support")}
                  onMouseLeave={handleMouseLeave}
                >
                  <FontAwesomeIcon icon={faQuestion} width={20} className="mr-3" />
                  <span className="mr-auto text-sm">Hỗ trợ</span>
                  <FontAwesomeIcon icon={faAngleRight} fontSize={13} />
                </button>
                {submenuVisible === "support" && (
                  <div
                    className="absolute left-full top-[144px] mt-2 w-[157px] py-2 bg-white shadow-md rounded-md"
                    onMouseEnter={() => handleMouseEnter("support")}
                  >
                    {/* Submenu items for Hỗ trợ */}
                    <button className="w-full h-9 px-3 text-left text-sm hover:bg-gray-200">Thông tin phiên bản</button>
                    <button className="w-full h-9 px-3 text-left text-sm hover:bg-gray-200">Liên hệ</button>
                    <button className="w-full h-9 px-3 text-left text-sm hover:bg-gray-200">Gửi fie log tới Z</button>
                  </div>
                )}

                <div className="h-[1px] bg-[#00000026] my-1 mx-2"></div>

                <button className="w-full h-9 px-3 text-left hover:bg-gray-200">
                  <span className="mr-[32px]"></span>
                  <span className="text-sm text-[#c31818]">Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EditUserDetails */}
      {editUserDetails && <EditUserDetails onClose={() => setEditUserDetails(false)} dataUser={user} />}
    </nav>
  );
}
