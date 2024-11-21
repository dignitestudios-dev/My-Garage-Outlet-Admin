import React, { useContext } from "react";
import { login } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
  const { navigate } = useContext(GlobalContext);
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={() => navigate("/verify-otp")}
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
            Forgot Password
          </h1>
          <p className="w-[90%] font-normal text-[16px] text-white leading-[21.6px] tracking-[-1.2px]">
            No worries, we’ve got you covered. Enter your registered email
            address below, and we will send you a code to reset your password.
            Get back to enjoying a seamless experience in just a few simple
            steps.
          </p>
        </div>
        <div className="w-full h-auto flex flex-col my-4 justify-start items-start gap-4">
          <AuthInput
            text={"Email"}
            placeholder={"Type your email here"}
            type={"text"}
          />
        </div>

        <AuthSubmitBtn text={"Continue"} />
        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center ">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't recieve a code?
            </span>
            <button className="outline-none text-[13px] border-none text-[#199BD1] font-bold">
              Resend now
            </button>
          </div>
        </div>
      </form>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-16 h-full bg-black/50 blur-xl absolute top-0 -left-4"></span>
        <img src={login} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default ForgotPassword;
