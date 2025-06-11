import * as React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyInformation from "@/components/profile/MyInformation";
import AdminControls from "@/components/profile/AdminControls";
import { MemberTable } from "@/components/profile/MemberTable";

interface ProfileProps {}

const tabs = ["My Information", "Admin Controls", "Members"];

const Profile: React.FunctionComponent<ProfileProps> = () => {
  const [activeTab, setActiveTab] = React.useState("My Information");

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-medium text-gray-600">
            H
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              Hazel Nutt
            </div>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
        </div>

        <Button variant="outline" className="text-sm flex items-center gap-2">
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
                activeTab === tab ? "btn-toggle-active" : "btn-toggle-inactive"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "My Information" && <MyInformation />}
          {activeTab === "Admin Controls" && <AdminControls />}
          {activeTab === "Members" && <MemberTable />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
