import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ onclose }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("admin");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
    onclose();
  };
  return (
    <div className="w-full h-screen fixed inset-0 z-50 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
      <div className="relative p-1 w-full max-w-sm max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">
          <div className="p-4 md:p-5 text-center flex flex-col items-center">
            <span className="text-4xl">
              <RiLogoutCircleLine className="text-red-500" />
            </span>
            <h3 className="mb-5 text-2xl font-semibold my-2">Logout</h3>
            <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to log out of your account?
            </h3>
            <div className="w-full flex items-center justify-center gap-3">
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={onclose}
                className="py-2.5 px-8 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 bg-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-600 font-medium rounded-lg text-sm inline-flex items-center px-8 py-2.5 text-center"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
