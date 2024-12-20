import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { navigate } = useContext(GlobalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const admin = Cookies.get("admin") ? JSON.parse(Cookies.get("admin")) : null;

  return (
    <div className="w-full h-[60px] bg-[#001229] border-b border-gray-700 flex justify-between items-center px-6 shadow-lg">
      <div className="flex items-center gap-6"></div>

      <div className="flex items-center gap-6">
        <Link
          to="/notifications"
          className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#1A293D] p-1 relative hover:bg-[#21344C] transition-all duration-300"
        >
          <IoNotificationsOutline className="text-white w-full h-full" />
          {/* <GoDotFill className="w-[20px] h-[20px] text-[#F44237] absolute -top-2 -right-2" /> */}
        </Link>

        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 relative"
        >
          <img
            src="https://i.pravatar.cc/50?img=12"
            alt="Profile"
            className="w-[28px] h-[28px] rounded-full cursor-pointer"
            onClick={() => navigate("/settings")}
          />
          <div className="w-auto flex flex-col justify-start items-start">
            <p
              className="text-[11px] font-normal text-white hover:text-white transition-all"
              onClick={() => navigate("/settings", "settings")}
            >
              {admin?.name}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
