import React, { useContext, useState } from "react";
import { AuthMockup } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import EmailVerificationSuccessModal from "../../components/onboarding/EmailVerificationSuccessModal";

const OnboardVerifyOtp = () => {
  const { navigate } = useContext(GlobalContext);
  const arr = [1, 2, 3, 4, 5, 6];
  const [isVerified, setIsVerified] = useState(false);
  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsVerified(true);
        }}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className=" text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Verification
          </h1>
          <p className=" font-normal text-[16px] text-white leading-[21.6px] tracking-[-1.2px]">
            Enter the OTP code sent to your email
          </p>
        </div>
        <div className="w-full h-auto flex justify-start items-center gap-4 my-4 ">
          {arr.map((item) => {
            return (
              <input
                key={item}
                className="w-[48px] h-[68px] rounded-lg bg-transparent outline-none text-center border-[1px] border-[#c2c6cb] text-white text-2xl focus-within:border-[#55C9FA] flex items-center justify-center"
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
            <button className="outline-none text-[13px] border-none text-[#199BD1] font-bold">
              Resend now
            </button>
          </div>
        </div>
        {isVerified && (
          <EmailVerificationSuccessModal
            isOpen={isVerified}
            setIsOpen={setIsVerified}
          />
        )}
      </form>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-16 h-full bg-black/50 blur-xl absolute top-0 -left-4"></span>
        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default OnboardVerifyOtp;
