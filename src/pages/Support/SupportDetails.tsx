//support details
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import UserInformation from "@/components/support/UserInformation";
import TicketDetails from "@/components/support/TicketDetails";
import AdminActions from "@/components/support/AdminActions";
import InteractionLog from "@/components/support/InteractionLog";

import { getSupportTicketById } from "@/api/supportTickets";
import { SupportTicket } from "@/types";

const TABS = [
  "User Information",
  "Ticket Details",
  "Admin Actions",
  "Interaction Log",
];

const SupportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("User Information");
  const [support, setSupport] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    console.log("calling fetch ticket");
    const fetchTicket = async () => {
      
      if (!id){
        console.log("id not found");
        return;
      } 
      setLoading(true);
      const response = await getSupportTicketById(id);
      console.log(response);
      if (!response || response.status !== 200) {
        setError(response?.message || "Unable to fetch support ticket.");
        setSupport(null);
        console.log("updated support as null");
      } else {
        console.log("running else statement")
        setSupport(response.data);
        console.log("SUPPORT: ", support);
        setError(null);
      }

      setLoading(false);
    };

    fetchTicket();
  }, [id]);

  if (loading) return <div className="text-gray-500 p-6">Loading support ticket...</div>;
  if (error || !support)
    return <div className="text-red-500 p-6">{error || "Support ticket not found"}</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "User Information":
        return <UserInformation support={support} />;

      case "Ticket Details":
        return <TicketDetails support={support} />;

      case "Admin Actions":
        return <AdminActions support={support} />;

      case "Interaction Log":
        return <InteractionLog />;

      default:
        return <div className="mt-4 text-sm text-gray-600">Coming soon...</div>;
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white border rounded-xl p-4 -mt-6 mb-6 shadow-sm">
        <Badge variant="outline" className="bg-orange-100 text-orange-600 mb-2">
          ● {support.status}
        </Badge>
        <h2 className="text-2xl font-bold">#{support._id}</h2>
      </div>

      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="flex gap-3 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`btn-toggle ${
                activeTab === tab ? "btn-toggle-active" : "btn-toggle-inactive"
              }`}
              style={{
                display: "flex",
                width: "145px",
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

        {renderTabContent()}
      </div>
    </div>
  );
};

export default SupportDetails;
