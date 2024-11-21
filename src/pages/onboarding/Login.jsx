import React, { useContext } from "react";
import { login } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";

const Login = () => {
  const { navigate } = useContext(GlobalContext);
  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={() => navigate("/", "Home")}
        className="w-full lg:w-1/2 h-full bg-[#0D1B2A] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <h1 className="w-full justify-start items-start text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
          Log In
        </h1>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text={"Email"}
            placeholder={"Type your email address here"}
            type={"text"}
          />
          <div className="w-full lg:w-[434px] flex flex-col justify-start items-end gap-1">
            <AuthInput
              text={"Password"}
              placeholder={"Enter Password"}
              type={"password"}
            />
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[13px] font-medium text-[#fff]"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <AuthSubmitBtn text={"Login"} />
        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          {/* <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center ">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Don’t have an account?
            </span>
            <button
              type="button"
              className="outline-none text-[13px] border-none text-[#EF1C68] font-bold"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create one
            </button>
          </div> */}
        </div>

        <div className="w-full  h-auto flex  flex-col gap-1 justify-center items-start  ">
          <div className="w-full lg:w-[434px] flex justify-center items-center">
            {/* <div className="grid grid-cols-3 gap-3 lg:gap-10">
              <div className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D]  text-white text-2xl flex items-center justify-center">
                <FaGoogle />
              </div>
              <div className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D]  text-white text-3xl flex items-center justify-center">
                <FaFacebookF />
              </div>
              <div className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D]  text-white text-3xl flex items-center justify-center">
                <FaApple />
              </div>
            </div> */}
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

export default Login;
