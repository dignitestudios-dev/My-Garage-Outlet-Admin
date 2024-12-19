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

export const normalRoutes = [
  {
    title: "Home",
    url: "/",
    page: <GlobalLayout page={<Home />} />,
  },
  {
    title: "Notifications",
    url: "/notifications",
    page: <GlobalLayout page={<NotificationsPage />} />,
  },
  {
    title: "Users",
    url: "/users",
    page: <GlobalLayout page={<Users />} />,
  },
  {
    title: "Events",
    url: "/events",
    page: <GlobalLayout page={<Events />} />,
  },
  {
    title: "User Info",
    url: "/user-info/:id",
    page: <GlobalLayout page={<UsersInfo />} />,
  },
  {
    title: "User Info",
    url: "/user-info",
    page: <GlobalLayout page={<UsersInfo />} />,
  },
  {
    title: "Items",
    url: "/items",
    page: <GlobalLayout page={<Items />} />,
  },
  {
    title: "Event Details",
    url: "/event-details/:id",
    page: <GlobalLayout page={<EventDetails />} />,
  },
  {
    title: "Reports",
    url: "/reports",
    page: <GlobalLayout page={<Reports />} />,
  },
  {
    title: "Report Details",
    url: "/report-details",
    page: <GlobalLayout page={<ReportDetails />} />,
  },

  // {
  //   title: "Subscriptions",
  //   url: "/subscriptions",
  //   page: <GlobalLayout page={<Subscription/>} />,

  // },
  {
    title: "Item Details",
    url: "/item-details/:id",
    page: <GlobalLayout page={<ItemDetails />} />,
  },
  {
    title: "Settings",
    url: "/settings",
    page: <GlobalLayout page={<Settings />} />,
  },
];
