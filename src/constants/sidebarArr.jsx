import { GoHome } from "react-icons/go";
import { FaRegBell } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export const sidebarArr = [
  {
    title: "Home",
    url: "/",
    icon: <GoHome />,
  },
  {
    title: "User Management",
    url: "/users",
    icon: <LuUsers />,
  },
  {
    title: "Event Management",
    url: "/events",
    icon: <CgFileDocument />,
  },
  {
    title: "Items Management",
    url: "/items",
    icon: <MdOutlineShoppingCart />,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: <FaRegBell />,
  },
  {
    title: "Manage Reports",
    url: "/reports",
    icon: <GoReport />,
  },
  // {
  //   title: "Subscriptions",
  //   url: "/subscriptions",
  //   icon: <MdOutlineUnsubscribe />,
  // },
  {
    title: "Settings",
    url: "/settings",
    icon: <IoSettingsOutline />,
  },
];
