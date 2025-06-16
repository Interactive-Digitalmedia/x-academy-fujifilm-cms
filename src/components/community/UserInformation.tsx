import React from "react";

interface CommunityTicket {
  raisedBy: string;
  email: string;
  phone: string;
  state: string;
  role: string;
  date: string;
  question: string;
  status: string;
  timeSubmitted: string;
  ticketType: string;
}

interface UserInformationProps {
  ticket: CommunityTicket;
  onChange: (field: keyof CommunityTicket, value: string) => void;
}

const UserInformation: React.FC<UserInformationProps> = ({
  ticket,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <p className="text-xs mb-1 text-gray-500">Raised By</p>
        <input
          type="text"
          value={ticket.raisedBy}
          onChange={(e) => onChange("raisedBy", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Email</p>
        <input
          type="email"
          value={ticket.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Phone</p>
        <input
          type="text"
          value={ticket.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">State</p>
        <input
          type="text"
          value={ticket.state}
          onChange={(e) => onChange("state", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Role</p>
        <input
          type="text"
          value={ticket.role}
          onChange={(e) => onChange("role", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Date</p>
        <input
          type="text"
          value={ticket.date}
          onChange={(e) => onChange("date", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Time Submitted</p>
        <input
          type="text"
          value={ticket.timeSubmitted}
          onChange={(e) => onChange("timeSubmitted", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div>
        <p className="text-xs mb-1 text-gray-500">Ticket Type</p>
        <input
          type="text"
          value={ticket.ticketType}
          onChange={(e) => onChange("ticketType", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Question</p>
        <textarea
          value={ticket.question}
          onChange={(e) => onChange("question", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Status</p>
        <input
          type="text"
          value={ticket.status}
          onChange={(e) => onChange("status", e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default UserInformation;
