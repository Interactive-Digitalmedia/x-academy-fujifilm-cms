import React, { useState } from "react";

interface AdminActionsProps {
  ticket: {
    id: string;
    subject: string;
    message: string;
    lastInteractions: {
      message: string;
      date: string;
      sender: "user" | "admin";
    }[];
    assignedTo: string;
    teamMembers: string[]; // Add this field for dropdown options
  };
}

const AdminActions: React.FC<AdminActionsProps> = ({ ticket }) => {
  const [assignee, setAssignee] = useState(ticket.assignedTo);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {/* Ticket ID */}
      <div>
        <p className="text-xs mb-1 text-gray-500">Ticket ID</p>
        <div className="border px-3 py-2 rounded-md bg-white shadow-sm text-sm text-gray-800">
          #{ticket.id}
        </div>
      </div>

      {/* Assign To Dropdown */}
      <div>
        <p className="text-xs mb-1 text-gray-500">Assign To</p>
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="w-full border px-3 py-2 rounded-md bg-white shadow-sm text-sm text-gray-800"
        >
          {ticket.teamMembers.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Last Interaction */}
      <div className="col-span-2">
        <p className="text-xs mb-2 text-gray-500">Last Interaction</p>
        <div className="border rounded-lg bg-white p-4 space-y-3 max-h-96 overflow-y-auto">
          {ticket.lastInteractions.map((interaction, idx) => {
            const isUser = interaction.sender === "user";
            return (
              <div
                key={idx}
                className={`flex flex-col ${
                  isUser ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    isUser
                      ? "bg-blue-500 text-white rounded-bl-none"
                      : "bg-gray-200 text-gray-800 rounded-br-none"
                  }`}
                >
                  <p className="text-xs font-semibold mb-1">
                    {isUser ? "User" : "Admin"}
                  </p>
                  <p className="whitespace-pre-wrap">{interaction.message}</p>
                  <p className="text-[10px] text-right mt-1 opacity-80">
                    {interaction.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject */}
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Subject</p>
        <div className="border px-3 py-2 rounded-md bg-white shadow-sm text-sm text-gray-800">
          #{ticket.subject}
        </div>
      </div>

      {/* Message */}
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Message</p>
        <div className="border px-3 py-2 rounded-md bg-white shadow-sm text-sm text-gray-800 min-h-[120px]">
          {ticket.message}
        </div>
      </div>
    </div>
  );
};

export default AdminActions;
