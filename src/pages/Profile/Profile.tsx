import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyInformation from "@/components/profile/MyInformation";
import AdminControls from "@/components/profile/AdminControls";
import { useNavigate } from "react-router-dom";
import { CmsUserProfileData } from "@/types";
import { useEffect, useState } from "react";
import { getAdminProfileData, getAllAdminsData } from "@/api/user";
import MemberTable from "@/components/profile/MemberTable";

interface ProfileProps {}

const tabs = ["My Information", "Admin Controls", "Members"];

const Profile: React.FunctionComponent<ProfileProps> = () => {
  const [activeTab, setActiveTab] = useState("My Information");
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<CmsUserProfileData | null>(null);
  const [allAdminData, setAllAdminData] = useState<CmsUserProfileData[] | []>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const response = await getAdminProfileData();
      if (response?.status === 200) {
        setAdminData(response.data);
      } else {
        console.error("Failed to fetch admin profile:", response.message);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await getAllAdminsData();
      console.log(response);

      if (response?.status === 200) {
        setAllAdminData(response.data);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full max-w-5xl mx-auto py-20 text-center text-gray-500 text-lg">
          Loading profile...
        </div>
      ) : (
        <div className="w-full max-w-5xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-medium text-gray-600">
                {adminData?.fullname?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 capitalize">
                  {adminData?.fullname || "Super Admin"}
                </div>
                <div className="text-sm text-gray-500">
                  {" "}
                  {adminData?.email || "Admin"}
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="text-sm flex items-center gap-2"
              onClick={() => navigate("/logout")}
            >
              <LogOut className="w-4 h-4" />
              Log out
            </Button>
          </div>

          {/* Tabs in White Box */}
          <div className="bg-white rounded-lg shadow px-6 py-4">
            {/* Toggle Buttons */}
            <div className="mb-6 flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`btn-toggle capitalize ${
                    activeTab === tab
                      ? "btn-toggle-active"
                      : "btn-toggle-inactive"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "My Information" && adminData && (
                <MyInformation adminData={adminData} />
              )}
              {activeTab === "Admin Controls" && <AdminControls />}
              {activeTab === "Members" && allAdminData && (
                <MemberTable members={allAdminData} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
