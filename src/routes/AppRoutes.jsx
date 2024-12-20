const ForgotPassword = React.lazy(() =>
  import("../pages/onboarding/ForgotPassword")
);
const Login = React.lazy(() => import("../pages/onboarding/Login"));
const VerifyOtp = React.lazy(() => import("../pages/onboarding/VerifyOtp"));
const UpdatePassword = React.lazy(() =>
  import("../pages/onboarding/UpdatePassword")
);
const GlobalLayout = React.lazy(() => import("../layouts/GlobalLayout"));
const Home = React.lazy(() => import("../pages/dashboard/Home"));
const NotificationsPage = React.lazy(() =>
  import("../pages/notifications/NotificationsPage")
);
const Users = React.lazy(() => import("../pages/users/Users"));
const Events = React.lazy(() => import("../pages/events/Events"));
const UsersInfo = React.lazy(() => import("../pages/users/UsersInfo"));
const Items = React.lazy(() => import("../pages/Items/Items"));
const EventDetails = React.lazy(() => import("../pages/events/EventDetails"));
const Reports = React.lazy(() => import("../pages/reports/Reports"));
const ReportDetails = React.lazy(() =>
  import("../pages/reports/ReportDetails")
);
const ItemDetails = React.lazy(() => import("../pages/Items/ItemDetails"));
const Settings = React.lazy(() => import("../pages/settings/Settings"));
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
