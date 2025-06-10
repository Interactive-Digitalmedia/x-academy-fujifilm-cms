import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { dummySupport } from "@/assets/dummySupport";

import { Badge } from "@/components/ui/badge";
import UserInformation from "@/components/support/UserInformation";
import TicketDetails from "@/components/support/refund/TicketDetails";
import AdminActions from "@/components/support/refund/AdminActions";
import InteractionLog from "@/components/support/InteractionLog";

const TABS = [
  "User Information",
  "Ticket Details",
  "Admin Actions",
  "Interaction Log",
];

const RefundSupportDetails = () => {
  const { id } = useParams(); // ✅ Get ticket ID from URL
  const [activeTab, setActiveTab] = useState("User Information");

  const ticket = dummySupport.find((t) => t._id === id); // ✅ Get real ticket

  if (!ticket) {
    return <div className="text-red-500">Refund ticket not found</div>;
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
              subject: "Refund Request - Urgent",
              message:
                "This ticket is regarding a refund request. Please review the attached documents.",
              attachments: ["RefundProof.pdf", "BookingInvoice.png"],
            }}
          />
        );

      case "Admin Actions":
        return (
          <AdminActions
            ticket={{
              id: ticket._id,
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
        <Badge variant="outline" className="bg-red-100 text-red-600 mb-2">
          ● {ticket.status}
        </Badge>
        <h2 className="text-2xl font-bold text-black-700">#{ticket._id}</h2>
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

export default RefundSupportDetails;
