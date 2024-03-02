import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl px-4 mx-auto">
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
