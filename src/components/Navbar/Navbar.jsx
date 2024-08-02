import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="flex justify-between lg:p-5 lg:px-10 border-b p-3">
      <div className="flex justify-center items-center gap-x-3">
        <img
          className="lg:h-16 lg:w-16 h-10 w-10 object-cover"
          src={assets.quickbite_logo}
          alt="Quickbite logo"
        />
        <h1 className="lg:text-3xl font-bold text-xl">QuickBite Admin</h1>
      </div>
      <img
        className="lg:h-16 lg:w-16 h-10 w-10 object-cover"
        src={assets.profile_image}
        alt="profile logo"
      />
    </div>
  );
};

export default Navbar;
