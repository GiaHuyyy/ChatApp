import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../redux/userSlice";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUseDetails = async () => {
      try {
        const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;
        const response = await axios.get(URL, { withCredentials: true });

        dispatch(setUser(response.data.data));

        if (response.data.data.logout) {
          toast.warning(response.data.data.message);
          dispatch(logout());
          navigate("/auth", { replace: true });
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchUseDetails();
  }, [dispatch, navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <section className="bg-gray-200 w-[408px]">
        {/* Main tab */}
        <Sidebar />

        {/*  */}
      </section>

      {/* Message component */}
      <section className="bg-slate-500 flex-1">
        <Outlet />
      </section>
    </div>
  );
}
