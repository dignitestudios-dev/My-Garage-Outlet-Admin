import ForgotPassword from "../pages/onboarding/ForgotPassword";
import Login from "../pages/onboarding/Login";
import VerifyOtp from "../pages/onboarding/VerifyOtp";
import UpdatePassword from "../pages/onboarding/UpdatePassword";
import GlobalLayout from "../layouts/GlobalLayout";
import Home from "../pages/dashboard/Home";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import Users from "../pages/users/Users";
import Events from "../pages/events/Events";
import UsersInfo from "../pages/users/UsersInfo";
import Items from "../pages/Items/Items";
import EventDetails from "../pages/events/EventDetails";
import Reports from "../pages/reports/Reports";
import ReportDetails from "../pages/reports/ReportDetails";
import Subscription from "../pages/subscriptions/Subscription";
import ItemDetails from "../pages/Items/ItemDetails";
import Settings from "../pages/settings/Settings";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

const isAuthenticated = () => {
  return Cookies.get("token") !== undefined;
  // return ACCESS_TOKEN !== undefined && ACCESS_TOKEN !== null;
};

const AuthRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? element : <Navigate to={redirectTo} />;
};

const PublicRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? <Navigate to={redirectTo} /> : element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<PublicRoute element={<Login />} redirectTo={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={<PublicRoute element={<ForgotPassword />} redirectTo={"/"} />}
      />
      <Route
        path="/verify-otp"
        element={<PublicRoute element={<VerifyOtp />} redirectTo={"/"} />}
      />
      <Route
        path="/update-password"
        element={<PublicRoute element={<UpdatePassword />} redirectTo={"/"} />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <AuthRoute
            element={<GlobalLayout page={<Home />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/notifications"
        element={
          <AuthRoute
            element={<GlobalLayout page={<NotificationsPage />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/users"
        element={
          <AuthRoute
            element={<GlobalLayout page={<Users />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/user-info/:id"
        element={
          <AuthRoute
            element={<GlobalLayout page={<UsersInfo />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/events"
        element={
          <AuthRoute
            element={<GlobalLayout page={<Events />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/event-details/:id"
        element={
          <AuthRoute
            element={<GlobalLayout page={<EventDetails />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/items"
        element={
          <AuthRoute
            element={<GlobalLayout page={<Items />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/item-details/:id"
        element={
          <AuthRoute
            element={<GlobalLayout page={<ItemDetails />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/reports"
        element={
          <AuthRoute
            element={<GlobalLayout page={<Reports />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/report-details/:id"
        element={
          <AuthRoute
            element={<GlobalLayout page={<ReportDetails />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/settings"
        element={
          <AuthRoute
            element={<GlobalLayout page={<Settings />} />}
            redirectTo={"/login"}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
