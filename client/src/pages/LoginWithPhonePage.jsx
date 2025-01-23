import { faEye, faEyeSlash, faLock, faMobile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

export default function CheckPhonePage() {
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
  const [data, setData] = useState({
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/login`;
      const response = await axios.post(URL, data, { withCredentials: true });

      toast.success(response.data.message);
      console.log(response.data);
      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        setData({
          phone: "",
          password: "",
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form className="w-[310px]" onSubmit={handleLogin}>
        <div className="border-b border-[#f0f0f0] flex items-center mb-[18px] py-[5px]">
          <FontAwesomeIcon icon={faMobile} width={8.5} />
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

        <button className="h-[44px] px-5 bg-[#0190f3] text-white w-full font-medium">Đăng nhập với mật khẩu</button>
      </form>
      <a href="#!" className="text-sm mt-3">
        Quên mật khẩu
      </a>
    </div>
  );
}
