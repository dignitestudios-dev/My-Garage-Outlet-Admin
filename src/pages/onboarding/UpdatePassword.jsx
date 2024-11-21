import React, { useContext, useState } from "react";
import { login } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import PasswordUpdateSuccessModal from "../../components/onboarding/PasswordUpdateSuccessModal";

const UpdatePassword = () => {
  const { navigate } = useContext(GlobalContext);
  const [isUpdated, setIsUpdated] = useState(false);
  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsUpdated(true);
        }}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-white" />
        </button>
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className=" text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Update Password
          </h1>
        </div>
        <div className="w-full h-auto flex flex-col my-4 justify-start items-start gap-4">
          <AuthInput
            text={"New Password"}
            placeholder={"Enter Password"}
            type={"password"}
          />
          <AuthInput
            text={"Repeat Password"}
            placeholder={"Enter Password"}
            type={"password"}
          />
        </div>

        <AuthSubmitBtn text={"Update Password"} />
        {isUpdated && (
          <PasswordUpdateSuccessModal
            isOpen={isUpdated}
            setIsOpen={setIsUpdated}
          />
        )}
      </form>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-16 h-full bg-black/50 blur-xl absolute top-0 -left-4"></span>
        <img src={login} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default UpdatePassword;
