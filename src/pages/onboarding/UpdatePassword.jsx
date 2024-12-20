import React, { useContext, useState } from "react";
import { login } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import PasswordUpdateSuccessModal from "../../components/onboarding/PasswordUpdateSuccessModal";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ButtonLoader from "../../layouts/ButtonLoader";

const UpdatePassword = () => {
  const { navigate } = useContext(GlobalContext);
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const generateDeviceId = () => {
    const rawId = `${navigator.userAgent}-${navigator.platform}-${navigator.language}`;
    return CryptoJS.MD5(rawId).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminEmail = JSON.parse(Cookies.get("adminEmail"));
    if (!newPass) {
      toast.error("Enter Password");
      return;
    }
    if (!confirmPass) {
      toast.error("Re-enter your password");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("Password do not match");
      return;
    }
    setLoading(true);
    try {
      const id = generateDeviceId();
      const res = await axios.post(
        `${BASE_URL}/admin/auth/resetPassword`,
        {
          email: adminEmail,
          newPassword: confirmPass,
        },
        {
          headers: {
            "Content-Type": "application/json",
            deviceModel: navigator.userAgent,
            deviceuniqueid: id,
          },
        }
      );
      console.log("otp verification res >>>>", res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/login");
        Cookies.remove("adminEmail");
      }
    } catch (error) {
      console.log("err while verifying otp >>>", error?.response?.data);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={handleSubmit}
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
          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <label
              htmlFor="newPass"
              className="ml-1 text-sm font-medium text-[#fff] capitalize"
            >
              New Password
            </label>
            <div
              className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#EF1C68] rounded-[12px] bg-[#1A293D] flex items-center justify-start`}
            >
              <div
                className={` w-full h-full flex items-center justify-center rounded-[12px] relative`}
              >
                <input
                  type={isPassVisible ? "text" : "password"}
                  placeholder={"New Password"}
                  id="newPass"
                  name="newPass"
                  className="w-full outline-none  rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium "
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setIsPassVisible((prev) => !prev)}
                  className="absolute top-4 text-lg right-2"
                  style={{
                    color: "#6B7373",
                  }}
                >
                  {isPassVisible ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <label
              htmlFor="confirmPass"
              className="ml-1 text-sm font-medium text-[#fff] capitalize"
            >
              Confirm Password
            </label>
            <div
              className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#EF1C68] rounded-[12px] bg-[#1A293D] flex items-center justify-start`}
            >
              <div
                className={` w-full h-full flex items-center justify-center rounded-[12px] relative`}
              >
                <input
                  type={isPassVisible ? "text" : "password"}
                  placeholder={"Confirm Password"}
                  id="confirmPass"
                  name="confirmPass"
                  className="w-full outline-none  rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium "
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setIsPassVisible((prev) => !prev)}
                  className="absolute top-4 text-lg right-2"
                  style={{
                    color: "#6B7373",
                  }}
                >
                  {isPassVisible ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start  ">
          <button
            type="submit"
            className="w-full h-[52px] lg:w-[434px] bg-[#EF1C68] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {loading ? <ButtonLoader /> : "Update"}
          </button>
        </div>
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
