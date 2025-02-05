import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Images from "../constants/images";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";

export default function EditUserDetails({ onClose, dataUser }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white w-[400px] rounded">
        {/* Head */}
        <div className="flex items-center justify-between h-12 pr-2 pl-4">
          <p className="text-base font-bold">Thông tin tài khoản</p>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faClose} width={20} />
          </button>
        </div>
        <div className="w-full h-[171px]">
          <img src={Images.BLACK} alt="" className="h-full w-full object-cover" />
        </div>

        {/* Avatar */}
        <div className="flex items-center p-4 pt-0 gap-x-3 -mt-4 mb-[6px]">
          <img src={dataUser?.profilePic} alt="avatar" className="w-20 h-20 rounded-full border-white object-cover" />
          <span className="text-lg font-semibold">{dataUser?.name}</span>
          <button>
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

            <button className="flex items-center justify-center gap-x-2 hover:bg-[#f0f2f5] w-full py-1 rounded">
              <FontAwesomeIcon icon={faEdit} width={20} />
              <span className="font-semibold">Cập nhật</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

EditUserDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  dataUser: PropTypes.object.isRequired,
};
