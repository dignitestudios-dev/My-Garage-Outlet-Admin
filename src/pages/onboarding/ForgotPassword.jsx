import React, { useContext, useState } from "react";
import { login } from "../../assets/export";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { navigate } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDeviceId = () => {
    const rawId = `${navigator.userAgent}-${navigator.platform}-${navigator.language}`;
    return CryptoJS.MD5(rawId).toString();
  };

  const handleValidateEmail = async () => {
    if (!email) {
      alert("Enter you email address");
      return;
    }
    setLoading(true);
    try {
      const id = generateDeviceId();
      const res = await axios.post(
        `${BASE_URL}/admin/auth/forgot`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            deviceModel: navigator.userAgent,
            deviceuniqueid: id,
          },
        }
      );
      Cookies.set("adminEmail", JSON.stringify(email));
      console.log("email res >>>", res?.data);
      if (res?.data?.success) {
        toast.success("OTP has been sent you email address");
        navigate("/verify-otp");
      }
    } catch (error) {
      console.log("error while validating email >>>", error?.response?.data);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
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
          <h1 className="text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
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
          <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start">
            <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
              Email
            </label>
            <div
              className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#EF1C68] rounded-[12px] bg-[#1A293D] flex items-center justify-start   `}
            >
              <div
                className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
              >
                <input
                  type={"email"}
                  placeholder={"Enter your email"}
                  className="w-full outline-none  rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          <button
            type="button"
            onClick={handleValidateEmail}
            className="w-full h-[52px] lg:w-[434px] bg-[#EF1C68] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            Continue
          </button>
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
