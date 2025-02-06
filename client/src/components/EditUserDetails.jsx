import { faAngleLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Images from "../constants/images";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

export default function EditUserDetails({ onClose, dataUser }) {
  const [infoUserVisible, setInfoUserVisible] = useState(false);
  const [data, setData] = useState({
    name: dataUser?.name,
  });

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/update-user`;
      const response = await axios.post(URL, data, { withCredentials: true });

      toast.success(response.data.message);
      dispatch(setUser(response.data.data));
      setInfoUserVisible(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 ">
      <div className="relative top-[92px] bg-white w-[400px] mx-auto rounded">
        {/* Head */}
        <div className="flex items-center justify-between h-12 pr-2 pl-4 border-b border-[#00000026]">
          {/* Title */}
          {infoUserVisible ? (
            <div className="flex items-center gap-x-2">
              <button className="px-2 rounded-full" onClick={() => setInfoUserVisible(false)}>
                <FontAwesomeIcon icon={faAngleLeft} fontSize={18} />
              </button>
              <span className="text-base font-semibold">Cập nhật thông tin cá nhân</span>
            </div>
          ) : (
            <span className="text-base font-semibold">Thông tin cá nhân</span>
          )}
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faClose} width={20} />
          </button>
        </div>

        {!infoUserVisible ? (
          <div>
            <div className="w-full h-[171px]">
              <img src={Images.BLACK} alt="" className="h-full w-full object-cover" />
            </div>
            {/* Avatar */}
            <div className="flex items-center p-4 pt-0 gap-x-3 -mt-4 mb-[6px]">
              <img
                src={dataUser?.profilePic}
                alt="avatar"
                className="w-20 h-20 rounded-full border-white object-cover"
              />
              <span className="text-lg font-semibold">{dataUser?.name}</span>
              <button onClick={() => setInfoUserVisible(true)}>
                <FontAwesomeIcon icon={faEdit} width={20} />
              </button>
            </div>

            <div className="h-[6px] w-full bg-[#ebecf0]"></div>

            <div className="py-3 px-4">
              {/* Info */}
              <div>
                <p className="text-base font-semibold">Thông tin cá nhân</p>
                <div className="mt-3">
                  <div className="flex items-center">
                    <span className="w-[100px] text-[#5a6981] text-sm">Giới tính</span>
                    <span className="text-sm">Chưa có</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="w-[100px] text-[#5a6981] text-sm">Ngày sinh</span>
                    <span className="text-sm">Chưa có</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="w-[100px] text-[#5a6981] text-sm">Điện thoại</span>
                    <span className="text-sm">+84 {dataUser?.phone}</span>
                  </div>
                  <p className="mt-3 font-normal text-[13px] leading-[18px] text-[#5a6981] ">
                    Chỉ bạn bè có lưu số của bạn trong danh sách danh bạ máy xem được số này
                  </p>
                </div>

                <div className="my-3 border border-[#0000000d]"></div>

                <button
                  className="flex items-center justify-center gap-x-2 hover:bg-[#f0f2f5] w-full py-1 rounded"
                  onClick={() => setInfoUserVisible(true)}
                >
                  <FontAwesomeIcon icon={faEdit} width={20} />
                  <span className="font-semibold">Cập nhật</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdateUser}>
            <div className="py-3 px-4">
              <label htmlFor="name" className="text-sm">
                Tên hiển thị
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleOnChange}
                className="w-full px-3 h-[38px] mt-1 border border-[#00000026] rounded text-sm font-normal text-[#081b3a] focus:outline-[#4b4eff]"
              />
            </div>
            <div className="py-3 px-4">
              <span className="text-sm font-semibold">Thông tin cá nhân</span>
              <div className="flex items-center mt-3 gap-x-10">
                <label htmlFor="nam" className="text-sm flex items-center gap-x-2">
                  <input type="radio" name="gender" id="nam" />
                  Nam
                </label>
                <label htmlFor="nu" className="text-sm flex items-center gap-x-2">
                  <input type="radio" name="gender" id="nu" />
                  Nữ
                </label>
              </div>
              <div className="mt-3">
                <span className="text-sm">Ngày sinh</span>
                <div>
                  <input
                    type="date"
                    className="w-full px-3 h-[38px] mt-1 border border-[#00000026] rounded text-sm font-normal text-[#081b3a] focus:outline-[#ccc]"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 py-3 px-4 flex items-center justify-end gap-x-2 border-t border-[#00000026]">
              <button
                className="text-[#081b3a] text-sm font-semibold bg-[#e5e7eb] hover:bg-[#c6cad2] h-10 px-4 rounded"
                onClick={() => setInfoUserVisible(false)}
              >
                Hủy
              </button>
              <button className="text-white text-sm font-semibold bg-[#0068ff] hover:bg-[#0045ad] h-10 px-4 rounded">
                Cập nhật
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

EditUserDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  dataUser: PropTypes.object.isRequired,
};
