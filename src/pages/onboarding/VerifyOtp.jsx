import React, { useContext, useRef, useState, useEffect } from "react";
import { login } from "../../assets/export";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import ButtonLoader from "../../layouts/ButtonLoader";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { navigate } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  inputRefs.current = [];

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("Text");

    if (/^\d{4}$/.test(pastedValue)) {
      setOtp(pastedValue.split(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const generateDeviceId = () => {
    const rawId = `${navigator.userAgent}-${navigator.platform}-${navigator.language}`;
    return CryptoJS.MD5(rawId).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id = generateDeviceId();
      const otpNumber = Number(otp.join(""));
      const res = await axios.post(
        `${BASE_URL}/admin/auth/verifyOTP`,
        {
          email: JSON.parse(Cookies.get("adminEmail")),
          otp: otpNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            deviceModel: navigator.userAgent,
            deviceuniqueid: id,
          },
        }
      );
      // console.log("otp verification res >>>>", res);
      if (res?.data?.success) {
        toast.success("OTP Verified");
        navigate("/update-password");
      }
    } catch (error) {
      // console.log("err while verifying otp >>>", error?.response?.data);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const [counter, setCounter] = useState(60);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleResentOtp = async () => {
    try {
      const id = generateDeviceId();
      const res = await axios.post(
        `${BASE_URL}/admin/auth/resendOTP`,
        {
          email: JSON.parse(Cookies.get("adminEmail")),
        },
        {
          headers: {
            "Content-Type": "application/json",
            deviceModel: navigator.userAgent,
            deviceuniqueid: id,
          },
        }
      );
      console.log("resent otp res >>>", res?.data);
      if (res?.data?.success) {
        toast.success("OTP sent successfully");
        setCounter(60);
      }
    } catch (error) {
      console.log("err while resent otp >>>", error);
    }
  };

  const arr = [1, 2, 3, 4];

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-start gap-8"
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
            Enter the code we sent to your email{" "}
          </p>
        </div>

        <div className="w-full flex justify-between lg:w-[430px] items-center gap-4 my-4">
          {arr.map((item, index) => (
            <input
              key={item}
              type="number"
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-16 h-16 rounded-lg bg-transparent outline-none text-center border-[1px] border-[#EF1C68] text-[#EF1C68] text-2xl focus-within:border-[#EF1C68] flex items-center justify-center appearance-none otpInput"
              min="0"
              step="1"
              inputMode="numeric"
            />
          ))}
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start  ">
          <button
            type="submit"
            className="w-full h-[52px] lg:w-[434px] bg-[#EF1C68] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {loading ? <ButtonLoader /> : "Verify"}
          </button>
        </div>
        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't receive a code?
            </span>
            <button
              type="button"
              onClick={() => handleResentOtp()}
              className="outline-none text-[13px] border-none text-[#EF1C68] font-bold disabled:cursor-not-allowed"
              disabled={counter > 0}
            >
              {counter > 0 ? `Resend in ${counter}s` : "Resend now"}
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
