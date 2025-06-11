import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { dummySupport } from "@/assets/dummySupport";

import { Badge } from "@/components/ui/badge";
import UserInformation from "@/components/support/UserInformation";
import TicketDetails from "@/components/support/TicketDetails";
import AdminActions from "@/components/support/AdminActions";
import InteractionLog from "@/components/support/InteractionLog";

const TABS = [
  "User Information",
  "Ticket Details",
  "Admin Actions",
  "Interaction Log",
];

const SupportDetails = () => {
  const { id } = useParams(); // ✅ Get ticket ID from URL
  const [activeTab, setActiveTab] = useState("User Information");

  const ticket = dummySupport.find((t) => t._id === id); // ✅ Get real ticket

  if (!ticket) {
    return <div className="text-red-500">Ticket not found</div>; // ✅ Error case
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "User Information":
        return <UserInformation ticket={ticket} />;

      case "Ticket Details":
        return (
          <TicketDetails
            ticket={{
              id: ticket._id,
              subject: "Sample Subject",
              message: "This is a sample ticket message.",
              attachments: ["Doc1", "File2"],
            }}
          />
        );

      case "Admin Actions":
        return (
          <AdminActions
            ticket={{
              id: ticket._id,
              subject: "Ticket Subject",
              message:
                "Hey User, we are connecting you to the technical team for faster resolution",
              assignedTo: "Sample Name",
              teamMembers: ["Sample Name", "John Smith", "Jane Doe"],
              lastInteractions: [
                {
                  sender: "user",
                  message:
                    "Hey, I booked an event but didn’t receive my ticket email.",
                  date: "12/08/2025",
                },
                {
                  sender: "admin",
                  message:
                    "Hey, I booked an event but didn’t receive my ticket email.",
                  date: "12/08/2025",
                },
              ],
            }}
          />
        );

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
          ● {ticket.status}
        </Badge>
        <h2 className="text-2xl font-bold">#{ticket._id}</h2>
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
                width: "135px",
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
