import { faLock, faMobile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  return (
    <div className="flex flex-col items-center">
      <form className="w-[310px]">
        <div className="border-b border-[#f0f0f0] flex items-center mb-[18px] py-[5px]">
          <FontAwesomeIcon icon={faMobile} width={8.5} />
          <select name="country" id="country" className="w-[70px] p-1 text-sm">
            {contries.map((country, index) => (
              <option key={index} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
          <input type="tel" name="phone" id="phone" placeholder="Số điện thoại" className="flex-1 text-sm ml-3" />
        </div>

        <div className="border-b border-[#f0f0f0] flex items-center mb-[18px] py-[5px]">
          <FontAwesomeIcon icon={faLock} width={8.5} />
          <input type="password" name="password" id="password" placeholder="Mật khẩu" className="flex-1 text-sm ml-3" />
        </div>

        <button className="h-[44px] px-5 bg-[#0190f3] text-white w-full font-medium">Đăng nhập với mật khẩu</button>
      </form>
      <a href="#!" className="text-sm mt-3">
        Quên mật khẩu
      </a>
    </div>
  );
}
