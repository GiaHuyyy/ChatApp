import { useState, useRef } from "react";
import {
  faEye,
  faEyeSlash,
  faImage,
  faLock,
  faMobileScreenButton,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uploadFileToCloud from "../helpers/uploadFileToClound";
import axios from "axios";
import { toast } from "sonner";
import { useGlobalContext } from "../context/GlobalProvider";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    phone: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
    password: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
  const fileInputRef = useRef(null);

  const { setIsLoginWithPhone } = useGlobalContext();

  const contries = [
    {
      name: "Vietnam",
      code: "+84",
    },
    {
      name: "United States",
      code: "+1",
    },
    {
      name: "Japan",
      code: "+81",
    },
  ];

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOnChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
  };

  const handleClearUploadPhoto = (e) => {
    e.preventDefault();
    setUploadPhoto("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Đặt lại giá trị của input file để có thể chọn lại cùng 1 file
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let profilePicUrl = "";
      if (uploadPhoto) {
        const uploadPhotoToCloud = await uploadFileToCloud(uploadPhoto);
        if (!uploadPhotoToCloud?.url) {
          throw new Error("Failed to upload profile picture");
        }
        profilePicUrl = uploadPhotoToCloud.url;
      }

      const registrationData = { ...data, profilePic: profilePicUrl };

      try {
        const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/register`;
        const response = await axios.post(URL, registrationData);
        toast.success(response.data.message);
        if (response.data.success) {
          setData({
            phone: "",
            name: "",
            confirmPassword: "",
            profilePic: "",
            password: "",
          });
          setUploadPhoto("");
          setIsLoginWithPhone(true);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form className="w-[310px]" onSubmit={handleRegister}>
        <div className="border-b border-[#f0f0f0] flex items-center mb-[18px] py-[5px]">
          <FontAwesomeIcon icon={faMobileScreenButton} width={8.5} />
          <select name="country" id="country" className="w-[70px] p-1 text-sm">
            {contries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Số điện thoại"
            className="flex-1 text-sm ml-3"
            value={data.phone}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="border-b border-[#f0f0f0] flex items-center mb-[18px] py-[5px]">
          <FontAwesomeIcon icon={faUser} width={8.5} />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Tên người dùng"
            className="flex-1 text-sm ml-3"
            value={data.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="border-b border-[#f0f0f0] flex items-center mb-[18px] py-[5px]">
          <FontAwesomeIcon icon={faLock} width={8.5} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Mật khẩu"
            className="flex-1 text-sm ml-3"
            value={data.password}
            onChange={handleOnChange}
            required
          />
          <span className="cursor-pointer ml-2" onClick={handleShowPassword}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} width={10} />
          </span>
        </div>

        <div className="border-b border-[#f0f0f0] flex items-center mb-[18px] py-[5px]">
          <FontAwesomeIcon icon={faLock} width={8.5} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            className="flex-1 text-sm ml-3"
            value={data.confirmPassword}
            onChange={handleOnChange}
            required
          />
          <span className="cursor-pointer ml-2" onClick={handleShowConfirmPassword}>
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} width={10} />
          </span>
        </div>

        <div className="border-b border-[#f0f0f0] mb-[18px] py-[5px]">
          <label htmlFor="profilePic" className="w-full cursor-pointer">
            <div className="h-11 bg-slate-200 gap-x-3 flex justify-center items-center border hover:border-[#64b9f7]">
              <FontAwesomeIcon icon={faImage} width={14} />
              <p> {uploadPhoto?.name ? uploadPhoto?.name : "Chọn ảnh đại diện"} </p>
              {uploadPhoto?.name && (
                <button className="hover:text-red-500 px-1" onClick={handleClearUploadPhoto}>
                  <FontAwesomeIcon icon={faX} width={8} />
                </button>
              )}
            </div>
          </label>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            className="hidden"
            onChange={handleUploadPhoto}
            ref={fileInputRef}
          />
        </div>

        <button className="h-[44px] px-5 bg-[#0190f3] text-white w-full font-medium">Đăng ký</button>
      </form>
    </div>
  );
}
