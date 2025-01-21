import { useState, useEffect, useRef } from "react";
import logo from "/vite.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoginWithQR from "../pages/LoginWithQR";
import LoginWithPhonePage from "../pages/LoginWithPhonePage";

export default function AuthLayout() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [isLoginWithQR, setIsLoginWithQR] = useState(true);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoginWithPhone = () => {
    setIsLoginWithQR(false);
    setDropdownVisible(false);
  };

  return (
    <div className="bg-[#e8f3ff] h-[100vh] justify-center flex ">
      <div className="mt-[70px]">
        <div className="text-center">
          <h1>
            <img src={logo} alt="logo" className="mx-auto mb-[18px] w-[60px] object-cover" />
          </h1>
          <h2 className="text-lg text-[#333] text-[17.5px]">
            Đăng nhập tài khoản Zz <br />
            để kết nối với ứng dụng Zz Web
          </h2>
        </div>

        {/* Action */}
        <div className="w-[560px] pb-3 bg-white mt-[18px] shadow-xl rounded-lg relative">
          <div className="min-h-14 border-b border-[#f0f0f0] flex items-center justify-center">
            {isLoginWithQR ? (
              <p className="text-center font-bold">Đăng nhập qua mã QR</p>
            ) : (
              <p className="text-center font-bold">Đăng nhập với mật khẩu</p>
            )}
          </div>

          {isLoginWithQR ? (
            <button
              ref={buttonRef}
              className="absolute right-3 top-3 px-[15px] py-1 rounded-md border border-[#d9d9d9]"
              onClick={toggleDropdown}
            >
              <FontAwesomeIcon icon={faBars} width={11} />
            </button>
          ) : (
            <></>
          )}

          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute top-[48px] w-[200px] text-center right-3 bg-white p-[5px] rounded-md shadow-lg cursor-pointer"
              onClick={handleLoginWithPhone}
            >
              <p className="text-sm">Đăng nhập với mật khẩu</p>
            </div>
          )}

          <div className="mt-[42px]">{isLoginWithQR ? <LoginWithQR /> : <LoginWithPhonePage />}</div>

          {!isLoginWithQR && (
            <div className="text-center mt-[20px]">
              <button className="text-[#006af5] text-sm mt-3 font-bold" onClick={() => setIsLoginWithQR(true)}>
                Đăng nhập qua mã QR
              </button>
            </div>
          )}

          <div className="text-center mt-[20px]">
            <p className="text-[#333] text-[13px]">
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="text-[#006af5]">
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
