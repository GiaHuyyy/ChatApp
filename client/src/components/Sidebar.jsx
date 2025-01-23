import { faAddressBook, faMessage, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faBriefcase, faCloud, faCloudArrowUp, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function Sidebar() {
  const user = useSelector((state) => state.user);

  const ButtonTab = ({ icon, isActive }) => {
    return (
      <button
        className={`flex items-center justify-center w-12 h-12 text-2xl rounded-md ${
          isActive ? "bg-[#00000040]" : ""
        } hover:bg-[#38383840] text-white`}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    );
  };

  ButtonTab.propTypes = {
    icon: PropTypes.object.isRequired,
    isActive: PropTypes.bool,
  };

  return (
    <nav className="h-full">
      {/* Main tabs */}
      <div className="w-16 bg-[#005ae0] h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="h-[100px] pt-8 flex justify-center">
              <img src={user?.profilePic} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
            </div>

            {/* Tabs top */}
            <div className="flex flex-col items-center gap-y-2 py-1">
              <ButtonTab icon={faMessage} isActive={true} />
              <ButtonTab icon={faAddressBook} />
              <ButtonTab icon={faSquareCheck} />
            </div>
          </div>

          {/* Tabs bottom */}
          <div className="flex flex-col items-center gap-y-[8px] pb-3">
            <ButtonTab icon={faCloudArrowUp} />
            <div className="w-[38px] h-[1px] bg-white"></div>
            <ButtonTab icon={faCloud} />
            <ButtonTab icon={faBriefcase} />
            <ButtonTab icon={faGear} />
          </div>
        </div>
      </div>
    </nav>
  );
}
