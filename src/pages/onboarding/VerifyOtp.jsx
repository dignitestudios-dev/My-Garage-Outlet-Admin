import React, { useContext } from "react";
import { login } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";

const VerifyOtp = () => {
  const { navigate } = useContext(GlobalContext);
  const arr = [1, 2, 3, 4];
  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={() => navigate("/update-password")}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-white" />
        </button>

        <div className="w-full flex justify-start items-start flex-col">
          <h1 className=" text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Verification
          </h1>
          <p className=" font-normal text-[16px] text-white leading-[21.6px] tracking-[-1.2px]">
          Enter the code we sent to your email          </p>
        </div>
        <div className="w-full h-auto flex justify-start items-center gap-4 my-4 ">
          {arr.map((item) => {
            return (
              <input
              key={item}
              type="number"
              className="w-[68px] h-[68px] rounded-lg bg-transparent outline-none text-center border-[1px] border-[#EF1C68] text-[#EF1C68] text-2xl focus-within:border-[#EF1C68] flex items-center justify-center appearance-none -moz-appearance-none -webkit-appearance-none"
              min="0"
              step="1"
              inputMode="numeric"
            />
            
            );
          })}
        </div>

        <AuthSubmitBtn text={"Verify"} />
        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center ">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't recieve a code?
            </span>
            <button className="outline-none text-[13px] border-none text-[#EF1C68] font-bold">
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

export default VerifyOtp;
