// UserInformation.tsx
import React from "react";

interface Ticket {
  raisedBy: string;
  email: string;
  phone: string;
  state: string;
  role: string;
  timeSubmitted: string;
  type: string;
}

interface UserInformationProps {
  ticket: Ticket;
}

const UserInformation: React.FC<UserInformationProps> = ({ ticket }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <p className="text-xs mb-1 text-gray-500">Raised By</p>
        <div className="border px-3 py-2 rounded-md">{ticket.raisedBy}</div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Email</p>
        <div className="border px-3 py-2 rounded-md">{ticket.email}</div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Phone</p>
        <div className="border px-3 py-2 rounded-md">{ticket.phone}</div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">State</p>
        <div className="border px-3 py-2 rounded-md">{ticket.state}</div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Role</p>
        <div className="border px-3 py-2 rounded-md">{ticket.role}</div>
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Time Submitted</p>
        <div className="border px-3 py-2 rounded-md">
          {ticket.timeSubmitted}
        </div>
      </div>
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Ticket Type</p>
        <div className="border px-3 py-2 rounded-md">{ticket.type}</div>
      </div>
    </div>
  );
};

export default UserInformation;
