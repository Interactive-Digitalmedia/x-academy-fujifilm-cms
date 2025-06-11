import {
  Bell,
  Plus,
  UserPlus,
  Calendar,
  Users,
  BookOpen,
  BarChart,
  HelpCircle,
  Settings,
  CircleEllipsis,
  LayoutDashboard,
  UserRoundPlus,
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
          label: "Invite",
          icon: UserRoundPlus,
          action: () => console.log("Dashboard action"),
        },
      ],
    },
    events: {
      title: "Events",
      buttons: [
        {
          label: "Create Event",
          icon: Plus,
          action: () => navigate("/events/create-events"),
        },
        {
          label: "Drafts",
          icon: Settings,
          action: () => console.log("Event settings"),
        },
      ],
    },
    partners: {
      title: "Partners",
      buttons: [
        {
          label: "Add Partner",
          icon: UserPlus,
          action: () => navigate("/partners/create-partner"),
        },
        {
          label: "Drafts",
          icon: BarChart,
          action: () => console.log("Partner analytics"),
        },
      ],
    },
    blogs: {
      title: "Blogs",
      buttons: [
        {
          label: "Create new",
          icon: Plus,
          action: () => navigate("/blogs/createblogs"),
        },
        {
          label: "Drafts",
          icon: BookOpen,
          action: () => console.log("View drafts"),
        },
      ],
    },
    community: {
      title: "Community",
      buttons: [
        {
          label: "Community Action",
          icon: Users,
          action: () => console.log("Community action"),
        },
        {
          label: "Moderation",
          icon: Settings,
          action: () => console.log("Moderation"),
        },
      ],
    },
    submissions: {
      title: "Submissions",
      buttons: [
        {
          label: "Review Submissions",
          icon: BookOpen,
          action: () => console.log("Review submissions"),
        },
        {
          label: "Export Data",
          icon: BarChart,
          action: () => console.log("Export data"),
        },
      ],
    },
    analytics: {
      title: "Analytics",
      buttons: [
        {
          label: "Generate Report",
          icon: BarChart,
          action: () => console.log("Generate report"),
        },
        {
          label: "Export Analytics",
          icon: Plus,
          action: () => console.log("Export analytics"),
        },
      ],
    },
    support: {
      title: "Support",
      buttons: [
        {
          label: "New Ticket",
          icon: Plus,
          action: () => console.log("New ticket"),
        },
        {
          label: "Support Settings",
          icon: Settings,
          action: () => console.log("Support settings"),
        },
      ],
    },
    others: {
      title: "Others",
      buttons: [
        {
          label: "Other Action",
          icon: CircleEllipsis,
          action: () => console.log("Other action"),
        },
        {
          label: "Configuration",
          icon: Settings,
          action: () => console.log("Configuration"),
        },
      ],
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

  // Render invite button for super admin
  const renderInviteButton = () => {
    if (user?.userRole !== "super admin") return null;

    return (
      <button
        type="button"
        onClick={onOpen}
        className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:shadow-md transition"
      >
        <UserPlus size={16} />
        Invite
      </button>
    );
  };

  // Render section-specific buttons
  const renderSectionButtons = () => {
    if (!config?.buttons) return null;

    return (
      <div className="flex items-center gap-2">
        {config.buttons.map((button, index) => (
          <Button
            key={index}
            onPress={button.action}
            startContent={<button.icon size={18} />}
            className="bg-white border border-gray-200 text-gray-800 hover:shadow-md"
          >
            {button.label}
          </Button>
        ))}
      </div>
    );
  };

  // Render notification bell (for non-blog sections or as fallback)
  const renderNotificationBell = () => {
    // Only show if no section-specific buttons are configured
    if (config?.buttons && config.buttons.length > 0) return null;

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
    <header className="w-full border-b border-gray-200 bg-white px-6 py-2 flex items-center justify-between">
      {/* Left side - Title */}
      <h1 className="text-base font-semibold text-black">
        {config?.title || "Dashboard"}
      </h1>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Super Admin Invite Button */}
        {renderInviteButton()}

        {/* Section-specific buttons */}
        {renderSectionButtons()}

        {/* Notification bell (fallback) */}
        {renderNotificationBell()}
      </div>

      {/* Invite Admin Modal */}
      <InviteAdminModal isOpen={isOpen} onClose={onOpenChange} />
    </header>
  );
}
