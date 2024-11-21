import React, { useContext, useEffect, useRef } from "react";
import { CheckMark } from "../../assets/export";
import { GlobalContext } from "../../contexts/GlobalContext";

const AccountCreateSuccess = ({ isOpen, setIsOpen }) => {
  const { navigate } = useContext(GlobalContext);
  const successRef = useRef();
  const toggleModal = (e) => {
    if (successRef.current && !successRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    navigate("/add-fleet");
  }, []);
  return (
    <div
      onClick={toggleModal}
      className={`fixed top-0 left-0 w-screen h-screen transition-all duration-500 z-50 flex items-center justify-center ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div
        ref={successRef}
        className="bg-[#02203A] w-[418px] h-[269px] flex flex-col  gap-5 justify-start items-center p-8 shadow-md rounded-[8px]"
      >
        <img src={CheckMark} alt="success" />
        <div className="w-auto flex flex-col justify-center items-center gap-3">
          <h1 className="text-[22px] leading-[29.7px] text-white font-bold">
            Congratulations
          </h1>
          <span className="text-[16px] leading-[21.6px] text-white font-normal text-center">
            You’ve successfully subscribed to Fleet Enterprise. Enjoy premium
            features and benefits
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountCreateSuccess;
