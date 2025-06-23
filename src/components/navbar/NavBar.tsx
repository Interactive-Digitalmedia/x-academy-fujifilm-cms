import {
  Bell,
  UserPlus,
  CirclePlus,
  Trash2,
  Settings,
  SquarePen,
} from "lucide-react";
import InviteAdminModal from "./InviteAdminModal";
import { Button, useDisclosure } from "@nextui-org/react";
import useGlobalStore from "@/state/GlobalState";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useGlobalStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    console.log("here user :", user);
  }, []);

  // Helper function to determine current section
  const getCurrentSection = () => {
    const path = location.pathname;

    if (path === "/") return "dashboard";
    if (path.startsWith("/events")) return "events";
    if (path.startsWith("/partners")) return "partners";
    if (path.startsWith("/blogs")) return "blogs";
    if (path.startsWith("/community")) return "community";
    if (path.startsWith("/submissions")) return "submissions";
    if (path.startsWith("/analytics")) return "analytics";
    if (path.startsWith("/support")) return "support";
    if (path.startsWith("/others")) return "others";
    if (path.startsWith("/profile")) return "profile";

    return "dashboard"; // fallback
  };

  const currentSection = getCurrentSection();

  // Section configurations
  const sectionConfig = {
    dashboard: {
      title: "Dashboard",
      buttons: [
        {
          label: "",
          icon: Bell,
          action: () => console.log("Notification clicked"),
        },
      ],
    },

    events: {
      title: "Events",
      buttons: [
        {
          label: "Create New",
          icon: CirclePlus,
          action: () => navigate("/events/create-events"),
        },
        {
          label: "Drafts",
          icon: "",
          action: () => console.log("Event settings"),
        },
      ],
    },
    partners: {
      title: "Partners",
      buttons: [
        {
          label: "Create New",
          icon: CirclePlus,
          action: () => navigate("/partners/create-partner"),
        },
        {
          label: "Drafts",
          icon: "",
          action: () => console.log("Partner analytics"),
        },
      ],
    },
    blogs: {
      title: "Blogs",
      buttons: [
        {
          label: "Create New",
          icon: CirclePlus,
          action: () => navigate("/blogs/createblogs"),
        },
        {
          label: "Drafts",
          icon: "",
          action: () => console.log("View drafts"),
        },
      ],
    },
    community: {
      title: "Community",
      buttons: [],
    },
    submissions: {
      title: "Submissions",
      buttons: [],
    },
    analytics: {
      title: "Analytics",
      buttons: [
        {
          label: "Edit Event",
          icon: SquarePen,
          action: () => console.log("Generate report"),
        },
        {
          label: "Delete",
          icon: Trash2,
          action: () => console.log("Export analytics"),
        },
      ],
    },
    support: {
      title: "Support",
      buttons: [],
    },
    others: {
      title: "Others",
      buttons: [],
    },
    profile: {
      title: "Profile",
      buttons: [
        {
          label: "Edit Profile",
          icon: Settings,
          action: () => console.log("Edit profile"),
        },
      ],
    },
  };

  // Get current section configuration
  const config = sectionConfig[currentSection];



  // Render section-specific buttons
  //changed
  const renderSectionButtons = () => {
    if (!config?.buttons || config.buttons.every((b) => !b.label && !b.icon))
      return null;

    // On dashboard, show both invite and bell with tighter spacing
    if (currentSection === "dashboard" && user?.userRole === "super admin") {
      return (
        <div className="flex items-center gap-[1px]">
          <button
            type="button"
            onClick={onOpen}
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:shadow-md transition"
          >
            <UserPlus size={16} />
            Invite
          </button>

          <button
            onClick={() => console.log("Notification clicked")}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-gray-700" />
          </button>
        </div>
      );
    }

    // Custom button style for Events and Partners, blogs
    if (["events", "partners", "blogs", "analytics"].includes(currentSection)) {
      return (
        <div className="flex items-center gap-2">
          {config.buttons.map((button, index) => {
            const isPrimary =
              button.label?.toLowerCase().includes("create") ||
              button.label?.toLowerCase().includes("add") ||  button.label?.toLowerCase().includes("event");

            return (
              <button
                key={index}
                onClick={button.action}
                className={`flex items-center gap-2 rounded-md px-2 py-[6.3px] text-sm justify-center font-medium min-w-[100px] transition-all ${
                  isPrimary
                    ? "bg-[#2196F3] text-white hover:bg-[#1976D2]" // Blue style for "Create/Add"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100" // Secondary style for "Drafts"
                }`}
              >
                {button.icon && <button.icon size={16} />}
                {button.label}
              </button>
            );
          })}
        </div>
      );
    }

    // Default rendering for all other sections
    return (
      <div className="flex items-center gap-2">
        {config.buttons.map((button, index) => {
          if (!button.label) {
            const isWhiteIcon =
              (currentSection === "community" || "submission" || "support") &&
              button.icon === Settings;

            return (
              <button
                key={index}
                onClick={button.action}
                className="p-2 rounded-md hover:bg-gray-100 transition"
                aria-label="Icon button"
              >
                <button.icon
                  size={18}
                  className={isWhiteIcon ? "text-white" : "text-gray-700"}
                />
              </button>
            );
          }

          return (
            <Button
              key={index}
              onPress={button.action}
              startContent={<button.icon size={18} />}
              className="bg-white border border-gray-200 text-gray-800 hover:shadow-md"
            >
              {button.label}
            </Button>
          );
        })}
      </div>
    );
  };

  // Render notification bell (for non-blog sections or as fallback)
  const renderNotificationBell = () => {
    // Only show if no section-specific buttons are configured
    if (currentSection !== "dashboard") return null;

    return (
      <button
        type="button"
        className="p-2 rounded-md hover:bg-gray-100 transition"
        aria-label="Notifications"
      >
        <Bell size={18} className="text-gray-700" />
      </button>
    );
  };

  return (
    <header className="w-full border-b-[1.5px] border-b-[#DBDBDB] border-gray-200 bg-white px-6 min-h-[51px] py-[8px] flex items-center">
      {/* Left side - Title */}
      <h1 className="text-base font-bold text-black">
        {config?.title || "Dashboard"}
      </h1>

      {/* Spacer pushes buttons to the right */}
      <div className="ml-auto flex items-center gap-2">
        {/* Section-specific buttons (includes Invite on dashboard) */}
        {renderSectionButtons()}

        {/* Bell icon always rendered here to right-most */}
        {currentSection === "dashboard" && user?.userRole === "super admin"
          ? null
          : renderNotificationBell()}
      </div>

      {/* Invite Admin Modal */}
      <InviteAdminModal isOpen={isOpen} onClose={onOpenChange} />
    </header>
  );
}
