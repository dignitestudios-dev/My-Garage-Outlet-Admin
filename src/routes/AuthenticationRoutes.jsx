import ForgotPassword from "../pages/onboarding/ForgotPassword";
import Login from "../pages/onboarding/Login";
import VerifyOtp from "../pages/onboarding/VerifyOtp";
import UpdatePassword from "../pages/onboarding/UpdatePassword";


export const AuthenticationRoutes = [
  // {
  //   title: "Signup",
  //   url: "/signup",
  //   page: <Signup />,
  // },
  // {
  //   title: "Verify Otp Onboard",
  //   url: "/onboard-verify-otp",
  //   page: <OnboardVerifyOtp />,
  // },
  // {
  //   title: "Select Package",
  //   url: "/select-package",
  //   page:\ <SelectPackage />,
  // },
  // {
  //   title: "Add Card",
  //   url: "/add-card",
  //   page: <AddCard />,
  // },
  // {
  //   title: "Summary",
  //   url: "/summary",
  //   page: <Summary />,
  // },
  {
    title: "Login",
    url: "/login",
    page: <Login />,
  },
  {
    title: "Forgot Password",
    url: "/forgot-password",
    page: <ForgotPassword />,
  },
  {
    title: "Verify Otp",
    url: "/verify-otp",
    page: <VerifyOtp />,
  },
  {
    title: "Update Password",
    url: "/update-password",
    page: <UpdatePassword />,
  },
];
