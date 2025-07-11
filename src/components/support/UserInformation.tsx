import React from "react";
import { SupportTicket } from "@/types";

interface UserInformationProps {
  support: SupportTicket;
}

const UserInformation: React.FC<UserInformationProps> = ({ support }) => {
  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <p className="text-xs mb-1 text-gray-500">Raised By</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          {support.userId?.name || "—"}
        </div>
      </div>

      <div>
        <p className="text-xs mb-1 text-gray-500">Email</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          {support.userId?.email || "—"}
        </div>
      </div>

      <div>
        <p className="text-xs mb-1 text-gray-500">Workshop Attended</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          {support.attendedWorkshop ? "Yes" : "No"}
        </div>
      </div>

      <div>
        <p className="text-xs mb-1 text-gray-500">Ticket Status</p>
        <div className="border px-3 py-2 rounded-md min-h-10 capitalize">
          {support.status || "—"}
        </div>
      </div>

      <div>
        <p className="text-xs mb-1 text-gray-500">Time Submitted</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          {formatTime(support.createdAt)}
        </div>
      </div>

      <div>
        <p className="text-xs mb-1 text-gray-500">Ticket Type</p>
        <div className="border px-3 py-2 rounded-md min-h-10 capitalize">
          {typeof support.type === "object" && "type" in support.type
            ? support.type.type
            : support.type || "—"}
        </div>
      </div>

      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Subject</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          {support.subject || "—"}
        </div>
      </div>

      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Message</p>
        <div className="border px-3 py-2 rounded-md min-h-10 whitespace-pre-line">
          {support.message || "—"}
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
