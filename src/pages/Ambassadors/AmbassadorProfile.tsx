import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Pencil, Trash2 } from "lucide-react";
import { badgeColors } from "@/assets/badgeColors";
import GalleryMasonryGrid from "@/components/partners/partnerpreview/GalleryMasonryGrid";
import GearDetailsGrid from "@/components/partners/partnerpreview/GearDetailsGrid";
import { deleteAmbassador, getAmbassadorsByUsername } from "@/api/ambassadors";
import CreatePartnerLayout from "@/layouts/CreatePartnerLayout";
import { Ambassador } from "@/types";
import toast from "react-hot-toast";
import ConfirmationModal from "@/components/ConfirmationModal";

const AmbassadorProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [ambassador, setAmbassador] = useState<Ambassador | null>(null);
  const [formData, setFormData] = useState<Partial<Ambassador>>({});
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const tabs = ["About", "Gallery", "Gear Details"];
  const [activeTab, setActiveTab] = useState("About");

  useEffect(() => {
    const fetchAmbassador = async () => {
      if (!username) return;
      setLoading(true);
      const res = await getAmbassadorsByUsername(username);
      if (res) {
        setAmbassador(res.data.ambassador);
        setFormData(res.data.ambassador); // populate form for edit
      } else {
        setAmbassador(null);
      }
      setLoading(false);
    };

    fetchAmbassador();
  }, [username]);

  const handleDelete = async () => {
    if (!formData._id) return;
    try {
      const res = await deleteAmbassador(formData._id);
      if (res.status === 200) {
        toast.success("Ambassador deleted!");
        setTimeout(() => navigate("/partners"), 1000);
      } else {
        toast.error(res.message || "Delete failed.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Something went wrong.");
    }
  };


  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Loading ambassador...</p>
      </div>
    );
  }

  if (!ambassador) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Ambassador not found.</p>
        <button
          className="mt-4 rounded bg-black px-4 py-2 text-white"
          onClick={() => navigate("/partners")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className=" pt-0 mt-0">
        {/* Banner */}
        <div className="bg-white py-5 px-5 rounded-xl w-full max-w-none mx-auto mb-6">
          <div
            className={`relative min-h-[120px] w-full overflow-hidden rounded-t-2xl bg-[#0000001A] bg-cover bg-center`}
            style={{ backgroundImage: `url(${encodeURI(ambassador?.bannerImage || '')})` }}
          />

          <div className="-mt-10 flex items-end justify-between px-3 md:px-6">
            <div className="z-30 h-20 w-20 overflow-hidden rounded-full border-4 border-background md:h-28 md:w-28">
              <img
                src={ambassador?.profileImage}
                alt={ambassador?.fullname}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex justify-end gap-3 -mr-6">
              <button
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-[6px] text-sm font-medium shadow-sm hover:bg-gray-100"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/reports/sample-ambassador-report.pdf";
                  link.download = "Ambassador_Report.pdf";
                  link.click();
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Ambassador Report
              </button>
              <div className="relative">
                <button
                  className={`inline-flex items-center rounded-md border px-3 py-[6px] text-sm font-medium shadow-sm transition ${
                    isEditMode
                      ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
                      : "bg-white border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setIsEditMode((prev) => !prev)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </button>
              </div>
              <button
                className="inline-flex items-center text-red-500 rounded-md border border-red-500 bg-white px-2 py-[6px] text-sm font-medium shadow-sm"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>

          <div className="mt-[2rem] space-y-4">
            <h2 className="text-2xl font-bold capitalize">
              {ambassador?.fullname}
            </h2>
            <p className="text-base leading-relaxed">
              <span className="font-semibold">Bio - </span>
              {ambassador?.bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {ambassador?.tags?.map((tag, index) => {
                const specificColor = badgeColors[index % badgeColors.length];
                return (
                  <span key={index} className={`tag ${specificColor}`}>
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Show Edit Form if Editing */}
        {isEditMode ? (
          <div className="bg-white py-5 px-5 rounded-xl w-full mb-6">
            <CreatePartnerLayout
              data={formData}
              setData={setFormData}
              mode="update"
              onSuccess={() => {
                setIsEditMode(false);
                window.location.reload();
              }}
            />
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="-mt-4">
              <div className="flex overflow-x-auto whitespace-nowrap text-sm font-medium scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-2 transition-all ${
                      activeTab === tab
                        ? "font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white py-5 px-5 rounded-xl w-full mt-3 max-w-none mx-auto mb-6">
              {activeTab === "Gear Details" ? (
                <GearDetailsGrid gear={ambassador?.gearDetails || []} />
              ) : activeTab === "Gallery" ? (
                <GalleryMasonryGrid images={ambassador?.gallery || []} />
              ) : (
                <div className="bg-white rounded-xl p-4 w-full text-sm">
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-400">
                      About Ambassador
                    </h4>
                    <p className="whitespace-pre-line leading-relaxed">
                      {ambassador?.about}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Ambassador"
        description="Are you sure you want to delete this ambassador? This action is permanent."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        showReasonInput={true}
      />
    </>
  );
};

export default AmbassadorProfile;
