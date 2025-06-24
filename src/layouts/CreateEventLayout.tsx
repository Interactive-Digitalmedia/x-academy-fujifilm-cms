import { useEffect, useState } from "react";
import EventDetails from "@/components/createEventTabs/EventDetails";
import AboutEvent from "@/components/createEventTabs/AboutEvent";
import AdminControls from "@/components/createEventTabs/AdminControls";
import EventImage from "@/components/createEventTabs/EventImage";
import EventSchedule from "@/components/createEventTabs/EventSchedule";
import FAQs from "@/components/createEventTabs/FAQs";
import { createFaq, updateActivity, uploadActivity } from "@/api/activity";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useActivityStore } from '@/Zustang/useActivityStore'
import MainCard from "@/components/concludedEventTabs/MainCard";

const tabs = [
  "Event Details",
  "About Event",
  "Event Schedule",
  "Event Image",
  "FAQs",
  "Admin Controls",
];

export default function CreateEventLayout({ data, setData }: any) {
  const navigate=useNavigate()
  const [currentTab, setCurrentTab] = useState(0);
  const [originalData, setOriginalData] = useState<any>(null);
  const [activityId, setActivityId] = useState<string | null>(null);
    const { fetchActivitiesById } =
      useActivityStore()

      const { id } = useParams<{ id?: string }>(); 
      useEffect(() => {
        if (!id) return;
      
        (async () => {
          try {
            const res = await fetchActivitiesById(id);
            setData(res);              // for form
            setOriginalData(res);  
            console.log(res) 
            if(res)   // for comparison later
            setActivityId(res._id);    // set activityId for update
          } catch (error) {
            toast.error("Failed to fetch activity");
            console.error("Fetch error:", error);
          }
        })();
      }, [id]);

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

  // const handleNextStepOrSubmit = async () => {
  //   if (currentTab === tabs.length - 1) {
  //     try {
  //       console.log("payload :", data)
  //       const response = await uploadActivity(data);
  //       console.log("✅ Activity successfully uploaded:", response);
  //       // Optional: show toast or navigate
  //     } catch (error) {
  //       console.error("❌ Failed to upload activity:", error);
  //       // Optional: show error toast
  //     }
  //   } else {
  //     setCurrentTab((prev) => prev + 1);
  //   }
  // };


  const deepEqual = (a: any, b: any): boolean => {
    if (a === b) return true;
  
    if (typeof a !== typeof b) return false;
    if (a == null || b == null) return false;
  
    if (typeof a === "object") {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
  
      for (const key of keysA) {
        if (!deepEqual(a[key], b[key])) return false;
      }
  
      return true;
    }
  
    return false;
  };

  const handleNextStepOrSubmit = async (action?: "draft" | "published") => {
    let updatedFAQId = data.FAQ;
  
    // 1. Update FAQ if on FAQ step
    if (currentTab === 4) {
      const faqItems = Array.isArray(data.FAQ) ? data.FAQ : data.FAQ?.items || [];
      const faqPayload = {
        name: "Custom",
        items: faqItems?.map((f: any) => ({ question: f.Q, answer: f.A })),
      };
  
      try {
        const faqRes = await createFaq(faqPayload);
        updatedFAQId = faqRes?.data?._id;
        setData((prev: any) => ({ ...prev, FAQ: updatedFAQId }));
  
        if (activityId) {
          await updateActivity(activityId, { ...data, FAQ: updatedFAQId });
        }
      } catch (err) {
        toast.error("Failed to save FAQs");
        console.error("❌ Failed to save FAQ:", err);
      }
    }
  
    // 2. Prepare final payload
    const payload = {
      ...data,
      FAQ: updatedFAQId,
      ...(action && { status: action }),
    };
  
    // 3. Manual deep equality check function
    const deepEqual = (a: any, b: any): boolean => {
      if (a === b) return true;
      if (typeof a !== typeof b || a == null || b == null) return false;
  
      if (typeof a === "object") {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
  
        for (const key of keysA) {
          if (!deepEqual(a[key], b[key])) return false;
        }
  
        return true;
      }
  
      return false;
    };
  
    try {
      let response;
  
      // 4. CREATE
      if (!activityId) {
        response = await uploadActivity(payload);
        setActivityId(response?.data?._id);
        toast.success("Activity created!");
      }
      // 5. UPDATE — only if modified
      else {
        if (!originalData || !deepEqual(payload, originalData)) {
          response = await updateActivity(activityId, payload);
          toast.success("Activity updated!");
          setOriginalData(payload); // update the reference
        } else {
          toast.success("No changes to update");
        }
      }
  
      // 6. Final step navigation
      if (currentTab === tabs.length - 1) {
        if (action === "published" && response?.data?._id) {
          toast.success("Published and redirecting...");
          navigate(`/events/${response.data._id}`, {
            state: { activity: response.data },
          });
        } else {
          toast.success("Saved as draft");
        }
      } else {
        setCurrentTab((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("Failed to save activity");
      console.error("❌ Error saving activity:", error);
    }
  };

  const handleStatusUpdate = async (nextStatus: "draft" | "published") => {
    if (!activityId) {
      toast.error("Create the activity first!");
      return;
    }
    try {
      await updateActivity(activityId, { status: nextStatus });
      setData((p: any) => ({ ...p, status: nextStatus }));
      toast.success(`Status changed to ${nextStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };
  
  
  
  

  return (
    <div className=" flex flex-col">
           {id &&     <MainCard data={data} onStatusUpdate={handleStatusUpdate} />}
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

          {currentTab === tabs.length - 1 ? (
  <div className="flex gap-3">
    <button
      className="px-6 py-2 rounded-md text-sm font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
      onClick={() => handleNextStepOrSubmit("draft")}
    >
      Save as Draft
    </button>
    <button
      className="px-6 py-2 rounded-md text-sm font-semibold bg-[#1098F7] text-white hover:bg-[#0f87dc] transition"
      onClick={() => handleNextStepOrSubmit("published")}
    >
      Save & Preview
    </button>
  </div>
) : (
  <button
    className="px-6 py-2 mt-2 rounded-md text-sm font-semibold bg-[#1098F7] text-white"
    onClick={() => handleNextStepOrSubmit()}
  >
    Next Step
  </button>
)}

        </div>
      </div>
    </div>
  );
}
