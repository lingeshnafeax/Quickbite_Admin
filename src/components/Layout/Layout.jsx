import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow lg:flex-row flex-col">
        <Sidebar />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
