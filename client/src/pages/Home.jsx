import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlice";
import { toast } from "sonner";

export default function Home() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("user ", user);

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
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchUseDetails();
  }, [dispatch, navigate]);

  return (
    <div>
      Home
      <p>Chào {user?.name}</p>
      {/* Message component */}
      <section>
        <Outlet />
      </section>
    </div>
  );
}
