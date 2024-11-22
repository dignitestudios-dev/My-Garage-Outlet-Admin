import React, { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const SidebarLink = ({ link, onCloseDrawer }) => {
  const { navigate, activeLink } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (url, title) => {
    navigate(url, title);
    onCloseDrawer();
  };

  return (
    <div className="w-full">
      <button
        onClick={link.submenu ? toggleSubmenu : () => handleNavigation(link?.url, link?.title)}
        className={`w-full h-[46px] outline-none rounded-[12px] ${
          activeLink === link?.title
            ? "bg-gradient-to-r from-[#EF1C68] to-gray-900 text-white"
            : "bg-transparent text-white/50 "
        } font-medium flex items-center justify-between transition-all duration-500 hover:bg-gradient-to-r from-[#EF1C68] to-gray-900 hover:text-white px-3 gap-2`}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{link?.icon}</span>
          <span className="capitalize text-sm">{link?.title}</span>
        </div>
        {link.submenu && (
          <span className="text-sm">
            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        )}
      </button>
      {link.submenu && isOpen && (
        <div className="ml-4">
          {link.submenu.map((sublink, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(sublink.url, sublink.title)}
              className={`block w-full h-[46px] outline-none rounded-[12px] 
              bg-transparent text-white/50 
              font-medium flex items-center justify-start transition-all duration-500 hover:bg-gray-900 hover:text-white px-3 gap-2`}
            >
              <span className="capitalize text-sm">{sublink.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
  