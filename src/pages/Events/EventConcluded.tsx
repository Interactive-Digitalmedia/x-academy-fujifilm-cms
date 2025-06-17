import React, { useState } from "react";
import AboutEvent from "@/concludedEventTabs/AboutEvent";
import EventDetails from "@/components/createEventTabs/EventDetails";

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
  ambassadors: [],
  pricing: "",
};

const EventConcluded: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Event Details");
  const [data, setData] = useState(initialEventData);

  const renderTabContent = () => {
    console.log("Active tab:", activeTab);
    switch (activeTab) {
      case "Event Details":
        return <EventDetails data={data} setData={setData} />;
      case "About Event":
        console.log("Rendering AboutEvent");
        return <AboutEvent />;
      case "Event Schedule":
        return (
          <div className="text-sm text-gray-700">
            This is Event Schedule content.
          </div>
        );
      case "Promotional Images":
        return (
          <div className="text-sm text-gray-700">
            This is Promotional Images content.
          </div>
        );
      case "Post-Event Images":
        return (
          <div className="text-sm text-gray-700">
            This is Post-Event Images content.
          </div>
        );
      case "FAQs":
        return (
          <div className="text-sm text-gray-700">This is FAQs content.</div>
        );
      case "Admin Controls":
        return (
          <div className="text-sm text-gray-700">
            This is Admin Controls content.
          </div>
        );
      default:
        return <div className="text-sm text-gray-600">Coming soon...</div>;
    }
  };

  return (
    <div className="w-full">
      {/* Top Placeholder Card */}
      <div className="w-full h-[322px] bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="text-gray-500 text-center text-sm h-full flex items-center justify-center">
          Placeholder Card (322px height)
        </div>
      </div>

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
