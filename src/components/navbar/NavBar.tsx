import { Bell, CirclePlus, Trash2, Settings, SquarePen } from "lucide-react";
import InviteAdminModal from "./InviteAdminModal";
import { useDisclosure } from "@nextui-org/react";
import useGlobalStore from "@/state/GlobalState";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useGlobalStore();
  const { isOpen, onOpenChange } = useDisclosure();

  const params = useParams();
  const eventId = params.activityId || location.pathname.split("/")[2]; // fallback

  /* -------------------------------------------------- */
  /* 1. Helpers                                         */
  /* -------------------------------------------------- */
  // Which high-level section are we on?
  const getCurrentSection = () => {
    const p = location.pathname;
    if (p === "/") return "dashboard";
    if (p.startsWith("/events")) return "events";
    if (p.startsWith("/partners")) return "partners";
    if (p.startsWith("/blogs")) return "blogs";
    if (p.startsWith("/community")) return "community";
    if (p.startsWith("/submissions")) return "submissions";
    if (p.startsWith("/analytics")) return "analytics";
    if (p.startsWith("/support")) return "support";
    if (p.startsWith("/others")) return "others";
    if (p.startsWith("/profile")) return "profile";
    return "dashboard";
  };

  const currentSection = getCurrentSection();

  // Are we on an event-detail page?  /events/<24-char id>
  const isEventDetail = /^\/events\/[0-9a-fA-F]{24}$/.test(location.pathname);
  const isBlogDetail = /^\/blogs\/[0-9a-fA-F]{24}$/.test(location.pathname);

  /* -------------------------------------------------- */
  /* 2. Section-specific configs                        */
  /* -------------------------------------------------- */
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
      buttons: isEventDetail
        ? [
            {
              label: "Update",
              icon: SquarePen,
              action: () => navigate(`/events/update-events/${eventId}`),
            },
          ]
        : [
            {
              label: "Create New",
              icon: CirclePlus,
              action: () => navigate("/events/create-events"),
            },
            {
              label: "Drafts",
              icon: "",
              action: () => console.log("View drafts"),
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
        // {
        //   label: "Drafts",
        //   icon: "",
        //   action: () => console.log("Partner analytics"),
        // },
      ],
    },

    blogs: {
      title: "Blogs",
      buttons: isBlogDetail
        ? [
            {
              label: "Update",
              icon: SquarePen,
              action: () => navigate(`/blog/update-blog/${eventId}`),
            },
          ]
        : [
            {
              label: "Create New",
              icon: CirclePlus,
              action: () => navigate("/blog/createblogs"),
            }
            // {
            //   label: "Drafts",
            //   icon: "",
            //   action: () => console.log("View drafts"),
            // },
          ],
    },

    community: { title: "Community", buttons: [] },
    submissions: { title: "Submissions", buttons: [] },
    analytics: {
      title: "Analytics",
      buttons: [
        { label: "Edit Event", icon: SquarePen, action: () => {} },
        { label: "Delete", icon: Trash2, action: () => {} },
      ],
    },
    support: { title: "Support", buttons: [] },
    others: { title: "Others", buttons: [] },
    profile: {
      title: "Profile",
      buttons: [{ label: "Edit Profile", icon: Settings, action: () => {} }],
    },
  };

  const config = sectionConfig[currentSection];

  /* -------------------------------------------------- */
  /* 3. Render buttons                                  */
  /* -------------------------------------------------- */
  const renderSectionButtons = () => {
    if (!config?.buttons || config.buttons.every((b) => !b.label && !b.icon))
      return null;

    // hide create/update set on the create-form itself
    if (location.pathname === "/events/create-events") return null;

    return (
      <div className="flex items-center gap-2">
        {config.buttons.map((b, i) => {
          const isPrimary =
            b.label?.toLowerCase().includes("create") ||
            b.label?.toLowerCase().includes("update");

          return (
            <button
              key={i}
              onClick={b.action}
              className={`flex items-center gap-2 rounded-md px-2 py-[6px] text-sm min-w-[100px] font-medium transition
                ${
                  isPrimary
                    ? "bg-[#2196F3] text-white hover:bg-[#1976D2]"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
            >
              {b.icon && <b.icon size={16} />}
              {b.label}
            </button>
          );
        })}
      </div>
    );
  };

  /* -------------------------------------------------- */
  /* 4. Component JSX                                   */
  /* -------------------------------------------------- */
  return (
    <header className="w-full border-b-[1.5px] border-b-[#DBDBDB] bg-white px-6 min-h-[51px] py-2 flex items-center">
      <h1 className="text-base font-bold">{config?.title || "Dashboard"}</h1>

      <div className="ml-auto flex items-center gap-2">
        {renderSectionButtons()}
        {currentSection === "dashboard" && user?.userRole !== "super admin" && (
          <button
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-gray-700" />
          </button>
        )}
      </div>

      <InviteAdminModal isOpen={isOpen} onClose={onOpenChange} />
    </header>
  );
}
