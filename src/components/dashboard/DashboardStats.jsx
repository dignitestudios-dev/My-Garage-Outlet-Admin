import React from "react";
import { LuUsers } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { PiUsersThreeBold } from "react-icons/pi";
import { IoBoatOutline } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiMoneyWavyLight } from "react-icons/pi";



const DashboardStats = () => {
  return (
    <div className="w-full lg:w-[70%] grid grid-cols-2 lg:grid-cols-4 justify-start items-start gap-2 lg:gap-24">
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700 p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#1A293D] text-[#35CFFF] text-2xl flex items-center justify-center">
          <LuUsers />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-white">0</span>
          <span className="text-[#fff]/[0.5] text-[14px] font-normal">
            Users
          </span>
        </div>
      </div>
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700 p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#1A293D] text-[#1FBA46] text-3xl flex items-center justify-center">
          <CgFileDocument />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-white">0</span>
          <span className="text-[#fff]/[0.5] text-[14px] font-normal">
            Events
          </span>
        </div>
      </div>
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700 p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#1A293D] text-[#FF3B30] text-3xl flex items-center justify-center">
          <MdOutlineShoppingCart />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-white">240</span>
          <span className="text-[#fff]/[0.5] text-[14px] font-normal">
            Items
          </span>
        </div>
      </div>
      <div className="w-full lg:w-[214px] h-[88px] rounded-[24px] bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700 p-[12px] flex gap-2 items-center justify-start">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-[#1A293D] text-[#FFCC00] text-3xl flex items-center justify-center">
          <PiMoneyWavyLight />
        </span>
        <div className="w-auto flex flex-col justify-start items-start">
          <span className="text-[18px] font-bold text-white">0</span>
          <span className="text-[#fff]/[0.5] text-[14px] font-normal">
            Revenue
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardStats;