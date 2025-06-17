import React, { useState } from "react";
import MainCard from "@/components/concludedEventTabs/MainCard";
import EventDetails from "@/components/concludedEventTabs/EventDetails";
import AboutEvent from "@/components/concludedEventTabs/AboutEvent";
import EventSchedule from "@/components/concludedEventTabs/EventSchedule";
import PromotionalImages from "@/components/concludedEventTabs/PromotionalImages";
import PostEventImages from "@/components/concludedEventTabs/PostEventImages";
import FAQs from "@/components/concludedEventTabs/FAQs";
import AdminControls from "@/components/concludedEventTabs/AdminControls";

const TABS = [
  "Event Details",
  "About Event",
  "Event Schedule",
  "Promotional Images",
  "Post-Event Images",
  "FAQs",
  "Admin Controls",
];

const initialEventData = {
  title: "Sample",
  tags: ["Event"],
  type: "",
  category: "",
  startDateTime: "",
  endDateTime: "",
  location: "",
  language: "",
  ambassadors: [], // <-- only store names like "Ritika", "Tarun Khiwal"
  ambassadorGallery: [
    "/banner/blog1.png",
    "/banner/blog2.png",
    "/banner/event1.png",
    "/banner/blog4.png",
    "/banner/blog5.png",
    "/banner/blog6.png",
  ],
  pricing: "",
};

const EventConcluded: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Event Details");
  const [data, setData] = useState(initialEventData);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Event Details":
        return <EventDetails data={data} setData={setData} />;
      case "About Event":
        return <AboutEvent />;
      case "Event Schedule":
        return <EventSchedule />;
      case "Promotional Images":
        return (
          <div className="px-1 pt-2">
            <PromotionalImages images={data.ambassadorGallery || []} />
          </div>
        );
      case "Post-Event Images":
        return <PostEventImages data={data} setData={setData} />;
      case "FAQs":
        return <FAQs />;
      case "Admin Controls":
        return <AdminControls data={data} setData={setData} />;
      default:
        return <div className="text-sm text-gray-600">Coming soon...</div>;
    }
  };

  return (
    <div className="w-full">
      {/* Top Placeholder Card */}
      <MainCard />

      {/* Tabs + Content Block */}
      <div className="w-full bg-white rounded-xl shadow-md p-4">
        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-3 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`btn-toggle ${
                activeTab === tab ? "btn-toggle-active" : "btn-toggle-inactive"
              }`}
              style={{
                display: "flex",
                padding: "6px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EventConcluded;
