import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home

      {/* Message component */}
      <section>
        <Outlet />
      </section>
      </div>
  )
}
