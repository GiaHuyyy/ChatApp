import axios from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    const fetchUseDetails = async () => {
      try {
        const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;
        const response = await axios.get(URL, { withCredentials: true });
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchUseDetails();
  }, []);
  return (
    <div>
      Home
      {/* Message component */}
      <section>
        <Outlet />
      </section>
    </div>
  );
}
