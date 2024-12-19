import React, { useContext, useState } from "react";
import { login } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const { navigate } = useContext(GlobalContext);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const generateDeviceId = () => {
    const rawId = `${navigator.userAgent}-${navigator.platform}-${navigator.language}`;
    return CryptoJS.MD5(rawId).toString();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),

      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const id = generateDeviceId();
        const res = await axios.post(
          `https://backend.mygarageoutlet.com/admin/auth/signIn`,
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              deviceModel: navigator.userAgent,
              deviceuniqueid: id,
            },
          }
        );
        console.log("login res >>>", res?.data);
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Login successful");
          Cookies.set("admin", JSON.stringify(res?.data?.data));
          Cookies.set("token", res?.data?.data?.accessToken);
          localStorage.setItem(
            "token",
            JSON.stringify(res?.data?.data?.accessToken)
          );
          navigate("/");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    },
  });
  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full lg:w-1/2 h-full bg-[#0D1B2A] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-6"
      >
        <h1 className="w-full justify-start items-start text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
          Log In
        </h1>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <div className="w-full lg:w-[434px] flex flex-col justify-start items-end gap-1">
            <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <label
                htmlFor="email"
                className="ml-1 text-sm font-medium text-[#fff] capitalize"
              >
                Email
              </label>
              <div
                className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#EF1C68] rounded-[12px] bg-[#1A293D] flex items-center justify-start`}
              >
                <div
                  className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
                >
                  <input
                    type={"email"}
                    id="email"
                    name="email"
                    placeholder={"Email address"}
                    className="w-full outline-none rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full lg:w-[434px] flex flex-col justify-start items-end gap-1 mt-2">
            <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <label
                htmlFor="password"
                className="ml-1 text-sm font-medium text-[#fff] capitalize"
              >
                Password
              </label>
              <div
                className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#EF1C68] rounded-[12px] bg-[#1A293D] flex items-center justify-start`}
              >
                <div
                  className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
                >
                  <input
                    type={isPassVisible ? "text" : "password"}
                    placeholder={"placeholder"}
                    id="password"
                    name="password"
                    className="w-full outline-none rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
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
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full lg:w-[434px]">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[13px] font-medium text-[#fff] float-end"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          <button
            type="submit"
            className="w-full h-[52px] lg:w-[434px] bg-[#EF1C68] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            Login
          </button>
        </div>
        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  "></div>

        <div className="w-full  h-auto flex  flex-col gap-1 justify-center items-start  ">
          <div className="w-full lg:w-[434px] flex justify-center items-center"></div>
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
