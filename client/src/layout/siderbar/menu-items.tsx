import {
  BookCheck,
  ChartCandlestick,
  Home,
  List,
  LogOut,
  User,
  UsersRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";
import userGlobelStore, { UsersStoreType } from "../../store/user-store";

function MenuItems() {
  const iconSize = 16;
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const { currentUser }: UsersStoreType = userGlobelStore() as UsersStoreType;

  const usermenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />, //ye icon lucide react se aata hai
      isActive: currentPath === "/",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={iconSize} />,
      isActive: currentPath === "/profile",
    },
    {
      name: "Booking",
      path: "/profile/bookings",
      icon: <List size={iconSize} />,
      isActive: currentPath === "/profile/bookings",
    },
    {
      name: "Reports",
      path: "/profile/reports",
      icon: <ChartCandlestick size={iconSize} />,
      isActive: currentPath === "/profile/reports",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];
  const adminmenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: <List size={iconSize} />,
      isActive: currentPath.includes("/admin/events"), //agar hame kabhi futher me kabhi child route or nested route ke jaurat hoe...ess liye ham includes funtion ka use kiye
    },
    {
      name: "Booking",
      path: "/admin/bookings",
      icon: <BookCheck size={iconSize} />,
      isActive: currentPath.includes("/admin/bookings"),
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <UsersRound size={iconSize} />,
      isActive: currentPath.includes("/admin/users"),
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <ChartCandlestick size={iconSize} />,
      isActive: currentPath.includes("/admin/reports"),
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];
  const menuToRender = currentUser?.isAdmin ? adminmenu : usermenu;

  const onLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    message.success("Logout Successfully");
  };
  return (
    <div className="lg:bg-gray-200 h-full p-5 w-full">
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-2xl font-bold text-red-600">
          EVENTOPIA
          {/* <b className="text-primary font-bold pl-2">EVENTS</b> */}
        </h1>
        <span className="text-sm text-gray-600">{currentUser?.name}</span>
      </div>

      <div className="flex flex-col gap-10 mt-20">
        {menuToRender.map((item: any) => (
          <div
            className={`cursor-pointer px-5 py-3 rounded flex gap-5 text-sm items-center ${
              item.isActive ? "bg-red-500 text-white" : ""
            }`}
            key={item.name}
            onClick={() => {
              if (item.name === "Logout") {
                onLogout();
              } else {
                console.log(item.path);
                navigate(item.path);
              }
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
