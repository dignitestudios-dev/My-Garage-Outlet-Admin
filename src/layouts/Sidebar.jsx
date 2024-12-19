import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets/export";
import { sidebarArr } from "../constants/sidebarArr";
import SidebarLink from "./SidebarLink";
import { RiLogoutCircleLine, RiMenuLine } from "react-icons/ri";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("admin");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div>
      {/* Drawer Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
      >
        <RiMenuLine size={24} />
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed lg:static top-0 left-0 w-[260px] bg-[#001229] transition-transform py-4 px-2 flex flex-col justify-start items-left pl-8 duration-300 shadow-lg p-6 border-b  border-r border-gray-700 text-white items-center hover:bg-[#001229] ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40 h-screen overflow-y-auto`}
      >
        <Link to="/" onClick={handleCloseDrawer}>
          <img src={logo} alt="perfectboat_logo" className="w-auto pt-8" />
        </Link>

        <div className="w-full mt-6 flex flex-col justify-start items-start gap-3">
          {sidebarArr?.map((link, index) => (
            <SidebarLink
              key={index}
              link={link}
              onCloseDrawer={handleCloseDrawer}
            />
          ))}
          <button
            // onClick={() => {
            //   navigate("/login", "Home");
            //   handleCloseDrawer();
            // }}
            onClick={() => handleLogout()}
            className={`w-full h-[46px] outline-none rounded-[12px] 
            bg-transparent text-white/50 
            font-medium flex items-center justify-start transition-all duration-500 hover:bg-gradient-to-r from-[#EF1C68] to-gray-900 hover:text-white px-3 gap-2`}
          >
            <span className="text-2xl">
              <RiLogoutCircleLine />
            </span>
            <span className="capitalize text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
