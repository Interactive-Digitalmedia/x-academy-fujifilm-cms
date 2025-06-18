import { useState } from "react";
import EventDetails from "@/components/createEventTabs/EventDetails";
import AboutEvent from "@/components/createEventTabs/AboutEvent";
import AdminControls from "@/components/createEventTabs/AdminControls";
import EventImage from "@/components/createEventTabs/EventImage";
import EventSchedule from "@/components/createEventTabs/EventSchedule";
import FAQs from "@/components/createEventTabs/FAQs";
import { uploadActivity } from "@/api/activity";

const tabs = [
  "Event Details",
  "About Event",
  "Event Schedule",
  "Event Image",
  "FAQs",
  "Admin Controls",
];

export default function CreateEventLayout({ data, setData }: any) {
  const [currentTab, setCurrentTab] = useState(0);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 0:
        return <EventDetails data={data} setData={setData} />;
      case 1:
        return <AboutEvent data={data} setData={setData} />;
      case 2:
        return <EventSchedule data={data} setData={setData} />;
      case 3:
        return <EventImage data={data} setData={setData} />;
      case 4:
        return <FAQs data={data} setData={setData} />;
      case 5:
        return <AdminControls data={data} setData={setData} />;
      default:
        return null;
    }
  };

  const handleNextStepOrSubmit = async () => {
    if (currentTab === tabs.length - 1) {
      try {
        const response = await uploadActivity(data);
        console.log("✅ Activity successfully uploaded:", response);
        // Optional: show toast or navigate
      } catch (error) {
        console.error("❌ Failed to upload activity:", error);
        // Optional: show error toast
      }
    } else {
      setCurrentTab((prev) => prev + 1);
    }
  };

  return (
    <div className=" flex flex-col">
      {/* Card wrapper */}
      <div className="bgCard h-[83vh]">
        {/* Tab Navigation (inside card) */}
        <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-4">
          {tabs.map((tab, index) => (
            <div key={index} className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTab(index)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition 
                  ${
                    currentTab === index
                      ? "text-black font-semibold"
                      : "text-gray-400 hover:bg-gray-100"
                  }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full border ${
                    currentTab === index
                      ? " text-white bg-[#1098F7]"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="whitespace-nowrap">{tab}</span>
              </button>

              {/* Connecting line between steps */}
              {index < tabs.length - 1 && (
                <div className="w-8 h-px bg-gray-300 -ml-3 -mr-3"></div>
              )}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[58vh]">
          {renderCurrentTab()}
        </div>

        {/* Footer Buttons */}
        <div className="mt-2 flex justify-between">
          <button
            className=" px-5 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-600 disabled:opacity-50"
            disabled={currentTab === 0}
            onClick={() => setCurrentTab((prev) => prev - 1)}
          >
            Previous
          </button>

          <button
            className="px-6 py-2 mt-2 rounded-md text-sm font-semibold bg-[#1098F7] text-white"
            onClick={handleNextStepOrSubmit}
          >
            {currentTab === tabs.length - 1 ? "Submit" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
}
