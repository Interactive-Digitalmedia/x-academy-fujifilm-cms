import { useState } from "react";
import PublicProfile from "@/components/createPartnerTabs/PublicProfile";
import Gallery from "@/components/createPartnerTabs/Gallery";
import Gears from "@/components/createPartnerTabs/Gears";
import ContactDetails from "@/components/createPartnerTabs/ContactDetails";
import { Ambassador } from "@/types";
import toast from "react-hot-toast";
import { createAmbassadors, updateAmbassador } from "@/api/ambassadors";
import { useNavigate } from "react-router-dom";

const tabs = [
  "Public Profile",
  "Gallery",
  "Gears",
  "Contact Details - Internal",
];

interface CreatePartnerLayoutProps {
  data?: Partial<Ambassador>;
  setData?: React.Dispatch<React.SetStateAction<Partial<Ambassador>>>;
  mode?: "create" | "update";
  onSuccess?: () => void;
}

export default function CreatePartnerLayout({
  data,
  mode = "create",
  onSuccess,
}: CreatePartnerLayoutProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Ambassador>>(data || {});
  const [initialData] = useState<Partial<Ambassador>>(data || {});
  const isDataChanged =
    JSON.stringify(formData) !== JSON.stringify(initialData);
  const renderCurrentTab = () => {
    switch (currentTab) {
      case 0:
        return <PublicProfile data={formData} setData={setFormData} />;
      case 1:
        return <Gallery data={formData} setData={setFormData} />;
      case 2:
        return <Gears data={formData} setData={setFormData} />;
      case 3:
        return <ContactDetails data={formData} setData={setFormData} />;
      default:
        return null;
    }
  };

  const validateStep = (step: number, formData: Partial<Ambassador>) => {
    switch (step) {
      case 0: // Public Profile
        // if (!formData.userName?.trim()) return "Username is required";
        if (!formData.fullname?.trim()) return "Name is required";
        if (!formData.type?.trim()) return "Type is required";
        // if (!formData.bio?.trim()) return "Bio is required";
        // if (!formData.location?.trim()) return "Location is required";
        // if (!formData.joinedDate?.trim()) return "Joined date is required";
        // if (!formData.profileImage?.trim()) return "Profile image is required";
        // if (!formData.bannerImage?.trim()) return "Banner image is required";
        return null;

      // case 1: // Gallery
      //   if (!formData.gallery || formData.gallery.length === 0)
      //     return "At least one gallery image is required";
      //   return null;

      // case 2: // Gears
      //   if (!formData.gearDetails || formData.gearDetails.length === 0)
      //     return "At least one gear item is required";
      //   const invalidGear = formData.gearDetails.find(
      //     (gear) => !gear.productImage || !gear.productName || !gear.productLink
      //   );
      //   if (invalidGear) return "All gear items must have image, name and link";
      //   return null;

      case 3: // Contact Details
        if (!formData?.email?.trim()) return "Email is required";
        // if (!formData?.contactNumber?.trim())
        //   return "Contact number is required";
        return null;

      default:
        return null;
    }
  };

  // const handleNextStepOrSubmit = async () => {
  //   const validationError = validateStep(currentTab, formData);
  //   if (validationError) {
  //     toast.error(validationError);
  //     return;
  //   }
  //   console.log(currentTab, tabs.length);

  //   if (currentTab === tabs.length - 1) {
  //     try {
  //       const res = await createAmbassadors(formData);
  //       if (res.status === 201) {
  //         toast.success("Ambassador profile created!");
  //         setTimeout(() => navigate("/partners"), 1500);
  //       } else {
  //         toast.error(res.message);
  //       }
  //     } catch (error) {
  //       console.error("❌ Submission failed:", error);
  //     }
  //   } else {
  //     setCurrentTab((prev) => prev + 1);
  //   }
  // };

  const handleNextStepOrSubmit = async () => {
    const validationError = validateStep(currentTab, formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    try {
      if (currentTab === 0 && !formData._id) {
        const res = await createAmbassadors(formData);
        if (res.status === 201) {
          toast.success("Ambassador created!");
          setFormData((prev) => ({
            ...prev,
            _id: res.data._id,
          }));
          setCurrentTab((prev) => prev + 1);
        } else {
          toast.error(res.message);
        }
      } else if (formData._id) {
        const res = await updateAmbassador(formData._id, formData);
        if (res.status === 200) {
          toast.success("Changes saved!");
          if (currentTab === tabs.length - 1) {
            setTimeout(() => navigate("/partners"), 1500);
          } else {
            setCurrentTab((prev) => prev + 1);
          }
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.error("❌ Error during submission:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateSubmit = async () => {
    const validationError = validateStep(currentTab, formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    if (!formData._id) return;
    try {
      const res = await updateAmbassador(formData?._id, formData);
      if (res.status === 200) {
        toast.success("Ambassador updated!");
        onSuccess?.(); // Notify parent
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bgCard h-[89vh] flex flex-col">
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
                      ? " text-white bg-[#1098F7]"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="whitespace-nowrap">{tab}</span>
              </button>

              {index < tabs.length - 1 && (
                <div className="w-[110px] h-px bg-gray-300"></div>
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
          <div className="flex gap-4">
            {mode === "update" && (
              <button
                onClick={handleUpdateSubmit}
                disabled={!isDataChanged}
                className={`px-6 py-2 rounded-lg font-medium ${
                  isDataChanged
                    ? "bg-[#1098F7] text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            )}
            <button
              onClick={handleNextStepOrSubmit}
              className="bg-[#1098F7] text-white  px-6 py-2 rounded-lg font-medium"
            >
              {currentTab === tabs.length - 1 ? "Submit" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
