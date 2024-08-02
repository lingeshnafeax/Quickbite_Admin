import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const isActiveLink = ({ isActive }) => {
    return `lg:text-xl font-semibold ${
      isActive ? "text-primary" : "text-black"
    }`;
  };
  return (
    <div className="min-h-full lg:min-w-[170px] lg:gap-y-6 py-3 lg:p-7 justify-evenly lg:justify-start flex lg:flex-col  border-r-2 ">
      <NavLink className={isActiveLink} to="/">
        Add Item
      </NavLink>
      <NavLink className={isActiveLink} to="/list">
        List Items
      </NavLink>
      <NavLink className={isActiveLink} to="/orders">
        Orders
      </NavLink>
    </div>
  );
};

export default Sidebar;
