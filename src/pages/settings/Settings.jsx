import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

const Settings = () => {
  const token = Cookies.get("token");
  const admin = JSON.parse(Cookies.get("admin"));
  const [username, setUsername] = useState(admin ? admin?.name : "");
  const [email, setEmail] = useState(admin ? admin?.email : "");
  const [previewPic, setPreviewPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const generateDeviceId = () => {
    const rawId = `${navigator.userAgent}-${navigator.platform}-${navigator.language}`;
    return CryptoJS.MD5(rawId).toString();
  };

  // Simulating a current profile image URL (you can replace this with real data)
  const currentProfilePic = "https://i.pravatar.cc/?img=12";

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      newPassword: Yup.string()
        .min(8, "New password must be at least 8 characters")
        .matches(
          /[a-z]/,
          "New password must contain at least one lowercase letter"
        )
        .matches(
          /[A-Z]/,
          "New password must contain at least one uppercase letter"
        )
        .matches(/[0-9]/, "New password must contain at least one number")
        .matches(
          /[^A-Za-z0-9]/,
          "New password must contain at least one special character"
        )
        .required("New password is required"),
      // .notOneOf(
      //   [Yup.ref("password"), null],
      //   "New password cannot be the same as the old password"
      // ), // Ensure newPassword is not the same as password
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const id = generateDeviceId();
      try {
        const res = await axios.post(
          `${BASE_URL}/admin/auth/changePassword`,
          {
            password: values.password,
            newPassword: values.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              deviceModel: navigator.userAgent,
              deviceuniqueid: id,
            },
          }
        );
        console.log("password changes res >>>", res);
        if (res?.data?.success) {
          toast.success("Password changed successfully");
          resetForm();
        }
      } catch (error) {
        console.log("error while changing password >>>", error?.response?.data);
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <motion.div
      className=" bg-gray-900 bg-opacity-50 backdrop-blur-md p-6 w-full flex flex-col overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-6">
        Account Settings
      </h2>

      <div className="flex items-center mb-6">
        <div className="mr-6">
          {previewPic ? (
            <img
              src={previewPic}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <img
              src={currentProfilePic}
              alt="Current Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        <div>
          <p className="text-xl font-semibold text-gray-100 ">{admin?.name}</p>
          <p className="text-sm text-gray-400">{admin?.email}</p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-100">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            disabled
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mt-2 text-gray-100 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700"
            placeholder="Enter new username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-100">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 text-gray-100 rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700"
            placeholder="Enter new email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-100">
            Current Password
          </label>
          <div className="w-full flex items-center mt-2 pr-3 justify-between rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700">
            <input
              type={showCurrentPass ? "text" : "password"}
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter current password"
              className="w-full p-3 text-gray-100 bg-transparent outline-none"
            />
            <button
              type="button"
              className="text-gray-300"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
            >
              {showCurrentPass ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-sm text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-100">
            New Password
          </label>
          <div className="w-full flex items-center mt-2 pr-3 justify-between rounded-md bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg border border-gray-700">
            <input
              type={showNewPass ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="w-full p-3 text-gray-100 outline-none bg-transparent"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="text-gray-300"
            >
              {showNewPass ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-sm text-red-500">
              {formik.errors.newPassword}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-[#EF1C68] text-white px-6 py-2 rounded-md mt-4 font-semibold"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </motion.div>
  );
};

export default Settings;
