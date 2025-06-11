import { useState } from "react";
import PublicProfile from "@/components/createPartnerTabs/PublicProfile";
import Gallery from "@/components/createPartnerTabs/Gallery";
import Gears from "@/components/createPartnerTabs/Gears";
import ContactDetails from "@/components/createPartnerTabs/ContactDetails";

const tabs = [
  "Public Profile",
  "Gallery",
  "Gears",
  "Contact Details - Internal",
];

export default function CreatePartnerLayout({ data, setData }: any) {
  const [currentTab, setCurrentTab] = useState(0);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 0:
        return <PublicProfile data={data} setData={setData} />;
      case 1:
        return <Gallery data={data} setData={setData} />;
      case 2:
        return <Gears data={data} setData={setData} />;
      case 3:
        return <ContactDetails data={data} setData={setData} />;
      default:
        return null;
    }
  };

  const handleNextStepOrSubmit = async () => {
    if (currentTab === tabs.length - 1) {
      try {
        // Replace this with your own submit logic
        console.log("✅ Partner profile submitted:", data);
      } catch (error) {
        console.error("❌ Submission failed:", error);
      }
    } else {
      setCurrentTab((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bgCard h-[83vh] flex flex-col">
        {/* Tab Navigation */}
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
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="whitespace-nowrap">{tab}</span>
              </button>

              {index < tabs.length - 1 && (
                <div className="w-8 h-px bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pt-2 px-6 pb-6 ">
          {renderCurrentTab()}
        </div>

        {/* Footer Buttons */}
        <div className="mt-auto -mb-2 flex justify-between items-center pt-2.5 border-t border-gray-200 px-6 -py-1 bg-white">
          <button
            onClick={() => setCurrentTab((prev) => prev - 1)}
            disabled={currentTab === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentTab === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNextStepOrSubmit}
            className="bg-[#1098F7] text-white hover:bg-blue-600 px-6 py-2 rounded-lg font-medium"
          >
            {currentTab === tabs.length - 1 ? "Submit" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
}
