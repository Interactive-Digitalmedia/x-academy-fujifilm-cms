// UserInformation.tsx
import { AskToExperts } from "@/types";
import React from "react";

interface UserInformationProps {
  ticket: AskToExperts;
}

const UserInformation: React.FC<UserInformationProps> = ({ ticket }) => {
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
          {ticket?.userId?.fullname}
        </div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Email</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          {ticket?.userId?.email}
        </div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Phone</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          {ticket?.userId?.contactNumber}
        </div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">State</p>
        <div className="border px-3 py-2 rounded-md min-h-10">{ticket.state}</div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Role</p>
        <div className="border px-3 py-2 rounded-md min-h-10">{ticket.role}</div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Time Submitted</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          {formatTime(ticket?.createdAt)}
        </div>
      </div>
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Ticket Type</p>
        <div className="border px-3 py-2 rounded-md min-h-10">
          Ask To Experts
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
