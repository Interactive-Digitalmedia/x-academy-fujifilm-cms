import { Link, useLocation } from "react-router-dom";
import useGlobalStore from "@/state/GlobalState";
import Logo from "/images/logo/logo.webp";
import { Divider } from "@nextui-org/react";

export default function Sidebar() {
  const { user } = useGlobalStore();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: "/banner/icons/Dashboard.svg" },
    { name: "Events", path: "/events", icon: "/banner/icons/Events.svg" },
    { name: "Partners", path: "/partners", icon: "/banner/icons/Partners.svg" },
    { name: "Blogs", path: "/blogs", icon: "/banner/icons/Blogs.svg" },
    {
      name: "Community",
      path: "/community",
      icon: "/banner/icons/Community.svg",
    },
    {
      name: "Submissions",
      path: "/submissions",
      icon: "/banner/icons/Submission.svg",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "/banner/icons/Analytics.svg",
      disabled: true,
    },
    {
      name: "Support",
      path: "/support",
      icon: "/banner/icons/Support.svg",
      disabled: true,
    },
    {
      name: "Others",
      path: "/others",
      icon: "/banner/icons/Others.svg",
      disabled: true,
    },

//     { name: "Analytics", path: "/analytics", icon: BarChart, disabled: true },
//     { name: "Support", path: "/support", icon: HelpCircle, },
//     { name: "Others", path: "/others", icon: CircleEllipsis, disabled: true },

  ];

  const isActive = (itemPath: string) => {
    if (itemPath === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(itemPath);
  };

  const isProfile = location.pathname.startsWith("/profile");

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col justify-between py-[12px]">
      <div>
        {/* Logo */}
        <div className="mb-1 flex justify-center items-center">
          <img src={Logo} className="h-[34px]" alt="Logo" />
        </div>

        <Divider className="mb-4" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map(({ name, path, icon, disabled }) => {
            const active = isActive(path);
            return (
              <div
                key={name}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                  ${disabled ? "cursor-not-allowed text-gray-400" : active ? "bg-[#CFEAFD] text-[#1098F7]" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}
              >
                {disabled ? (
                  <>
                    <img src={icon} alt={name} className="w-5 h-5" />
                    {name}
                  </>
                ) : (
                  <Link to={path} className="flex items-center gap-3 w-full">
                    <img src={icon} alt={name} className="w-5 h-5" />
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
        className={`flex items-center gap-3 rounded-lg px-3 py-2 mx-1 text-sm font-medium transition-all duration-200 ${
          isProfile
            ? "bg-[#CFEAFD] text-[#526581]"
            : "text-gray-700 hover:bg-[#CFEAFD] border-t"
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium text-gray-600">
          {user?.fullname?.charAt(0).toUpperCase() || "A"}
        </div>
        {user?.userRole}
      </Link>
    </aside>
  );
}
