import { Link, useLocation } from "react-router-dom";
import useGlobalStore from "@/state/GlobalState";
import {
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  BarChart,
  HelpCircle,
  CircleEllipsis,
} from "lucide-react";
import Logo from "/images/logo/logo.webp";
import { Divider } from "@nextui-org/react";

export default function Sidebar() {
  const { user } = useGlobalStore();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Partners", path: "/partners", icon: Users },
    { name: "Blogs", path: "/blogs", icon: BookOpen },
    { name: "Community", path: "/community", icon: BookOpen },
    {
      name: "Submissions",
      path: "/submissions",
      icon: BookOpen,
      disabled: true,
    },
    { name: "Analytics", path: "/analytics", icon: BarChart, disabled: true },
    { name: "Support", path: "/support", icon: HelpCircle, disabled: true },
    { name: "Others", path: "/others", icon: CircleEllipsis, disabled: true },
  ];

  const isActive = (itemPath: string) => {
    if (itemPath === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(itemPath);
  };
  const isProfile = location.pathname.startsWith("/profile");
  return (
    <aside className="w-64 h-full  bg-white border-r border-gray-200 flex flex-col justify-between py-[12px]">
      <div>
        {/* Logo */}
        <div className="mb-1 flex justify-center items-center">
          <img src={Logo} className="h-[34px]" alt="Logo" />
        </div>

        <Divider className="mb-4" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map(({ name, path, icon: Icon, disabled }) => {
            const active = isActive(path);
            return (
              <div
                key={name}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
        ${disabled ? "cursor-not-allowed text-gray-400" : active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
              >
                {disabled ? (
                  <>
                    <Icon size={18} />
                    {name}
                  </>
                ) : (
                  <Link to={path} className="flex items-center gap-3 w-full">
                    <Icon size={18} />
                    {name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <Link
        to={"/profile"}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
          isProfile
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }`}
      >
        {user?.userRole}
      </Link>
    </aside>
  );
}
