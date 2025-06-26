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
import { useActivityStore } from "@/Zustang/useActivityStore";
import MainCard from "@/components/concludedEventTabs/MainCard";
import { Activity } from "@/types";

const tabs = [
  "Event Details",
  "About Event",
  "Event Schedule",
  "Event Image",
  "FAQs",
  "Admin Controls",
];

export default function CreateEventLayout() {
  const [formData, setFormData] = useState<Activity>({} as Activity);
  const [originalData, setOriginalData] = useState<Activity | null>(null);
  const [activityId, setActivityId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { fetchActivitiesById } = useActivityStore();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetchActivitiesById(id);
        if (res) {
          setOriginalData(res);
          setFormData(res);
          console.log(res);
          setActivityId(res._id);
        }
      } catch (error) {
        toast.error("Failed to fetch activity");
        console.error("Fetch error:", error);
      }
    })();
  }, [id]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 0:
        return <EventDetails data={formData} setData={setFormData} />;
      case 1:
        return <AboutEvent data={formData} setData={setFormData} />;
      case 2:
        return <EventSchedule data={formData} setData={setFormData} />;
      case 3:
        return <EventImage data={formData} setData={setFormData} />;
      case 4:
        return <FAQs data={formData} setData={setFormData} />;
      case 5:
        return <AdminControls data={formData} setData={setFormData} />;
      default:
        return null;
    }
  };

  const validateActivityStep = (
    step: number,
    data: Partial<Activity>
  ): string | null => {
    switch (step) {
      case 0: // Event Details
        if (!data.activityName?.trim()) return "Event name is required.";
        if (!data.activityType?.trim()) return "Event type is required.";
        if (!data.activityCategory?.trim())
          return "Event category is required.";
        if (!data.startDate?.trim()) return "Start date is required.";
        if (!data.endDate?.trim()) return "End date is required.";
        if (new Date(data.endDate) < new Date(data.startDate))
          return "End date cannot be before start date.";
        if (!data.location?.trim()) return "Location is required.";
        // if (!data.ambassadorId || data.ambassadorId.length === 0)
        //   return "At least one host is required.";
        if (!data.pricing) return "Pricing is required.";
        if (data.pricing === "paid" && (!data.amount || data.amount <= 0))
          return "Valid amount is required for paid events.";
        return null;

      case 1: // About Event
        if (!data.about?.about?.trim())
          return "Event about section is required.";
        // if (!data.about?.whyShouldYouAttend?.trim())
        //   return "Why should you attend is required.";
        // if (!data.about?.whatsIncluded || data.about.whatsIncluded.length === 0)
        //   return "At least one 'What's Included' item is required.";
        return null;

      case 2: // Schedule
        if (!data.schedule || data.schedule.length === 0)
          return "At least one schedule day is required.";
        for (const day of data.schedule) {
          if (!day.sessions || day.sessions.length === 0)
            return "Each day should have at least one session.";
          for (const session of day.sessions) {
            if (
              !session.title?.trim() ||
              !session.startTime?.trim() ||
              !session.endTime?.trim()
            ) {
              return "Each session must have title, start and end time.";
            }
          }
        }
        return null;

      case 3: // Images
        if (!data.heroImage) return "Hero image is required.";
        return null;

      default:
        return null;
    }
  };

  // const handleNextStepOrSubmit = async () => {
  //   const validationError = validateActivityStep(currentTab, formData);
  //   if (validationError) {
  //     toast.error(validationError);
  //     return;
  //   }
  //   try {
  //     if (currentTab === 0 && !formData._id) {
  //       const res = await uploadActivity(formData);
  //       if (res.status === 201) {
  //         toast.success("Activity created!");
  //         setFormData((prev) => ({
  //           ...prev,
  //           _id: res.data._id,
  //         }));
  //         setCurrentTab((prev) => prev + 1);
  //       } else {
  //         toast.error(res.message);
  //       }
  //     } else if (formData._id) {
  //       const res = await updateActivity(formData._id, formData);
  //       if (res.status === 200 || res.success) {
  //         toast.success("Changes saved!");
  //         if (currentTab === tabs.length - 1) {
  //           setTimeout(() => navigate("/partners"), 1500);
  //         } else {
  //           setCurrentTab((prev) => prev + 1);
  //         }
  //       } else {
  //         toast.error(res.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("❌ Error during submission:", error);
  //     toast.error("Something went wrong!");
  //   }
  // };

  // const handleUpdateSubmit = async () => {
  //   const validationError = validateActivityStep(currentTab, formData);
  //   if (validationError) {
  //     toast.error(validationError);
  //     return;
  //   }
  //   if (!formData._id) return;
  //   try {
  //     const res = await updateActivity(formData?._id, formData);
  //     if (res.status === 200) {
  //       toast.success("Ambassador updated!");
  //       // onSuccess?.();
  //     } else {
  //       toast.error(res.message);
  //     }
  //   } catch (error) {
  //     console.error("Update failed", error);
  //     toast.error("Something went wrong!");
  //   }
  // };

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
    const validationError = validateActivityStep(currentTab, formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    let updatedFAQId = formData?.FAQ;
    // 1. Update FAQ if on FAQ step
    if (currentTab === 4) {
      const faqItems = formData.FAQ || [];
      if (Array.isArray(faqItems) && faqItems.length > 0) {
        const faqPayload = {
          name: "Custom",
          items: faqItems.map((f: any) => ({
            title: f?.Q ?? "",
            description: f?.A ?? "",
          })),
        };

        try {
          const faqRes = await createFaq(faqPayload);
          const updatedFAQId = faqRes?.data?._id;

          setFormData((prev: any) => ({
            ...prev,
            FAQ: updatedFAQId,
          }));

          if (activityId) {
            await updateActivity(activityId, {
              ...formData,
              FAQ: updatedFAQId,
            });
          }
        } catch (err) {
          toast.error("Failed to save FAQs");
          console.error("❌ Failed to save FAQ:", err);
        }
      }
    }

    // 2. Prepare final payload
    const payload = {
      ...formData,
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

  return (
    <div className=" flex flex-col">
      {id && <MainCard data={formData} />}
      {/* Card wrapper */}
      <div className="bgCard pb-0 h-[87vh]">
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
        <div className="flex-1 overflow-y-auto p-6  max-h-[58vh]">
          {renderCurrentTab()}
        </div>

        {/* Footer Buttons */}
        <div className="mt-8  flex justify-between h-[40px]">
          <button
            className=" px-6 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-600 disabled:opacity-50"
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
              className="px-6 py-2  rounded-md text-sm font-semibold bg-[#1098F7] text-white"
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
