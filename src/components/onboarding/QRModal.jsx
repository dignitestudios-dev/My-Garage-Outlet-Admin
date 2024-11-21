import React, { useRef } from "react";
import { QR } from "../../assets/export";

const QRModal = ({ isOpen, setIsOpen }) => {
  const qrRef = useRef();

  const toggleModal = (e) => {
    if (qrRef.current && !qrRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  return (
    <div
      onClick={toggleModal}
      className={`w-screen h-screen flex justify-center items-center transition-all duration-500 z-50 fixed top-0 left-0 ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div
        ref={qrRef}
        className="w-[630px] h-[540px] flex flex-col gap-16 items-center rounded-[18px] justify-center bg-[#1A293D] shadow-sm"
      >
        <h1 className="font-normal text-[24px] leading-[32.4px] text-white text-center">
          Scan the QR code to download the app
        </h1>
        <img src={QR} alt="qrcode" />
      </div>
    </div>
  );
};

export default QRModal;
