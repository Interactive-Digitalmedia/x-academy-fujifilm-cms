//admin actions
import React, { useState } from "react";
import { SupportTicket } from "@/types";

interface AdminActionsProps {
  support: SupportTicket;
}

const AdminActions: React.FC<AdminActionsProps> = ({ support }) => {
  const [assignee, setAssignee] = useState(support.assignTo?.name || "");

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {/* Status */}
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Current Status</p>
        <div className="border px-3 py-2 rounded-md bg-white shadow-sm text-sm text-gray-800 capitalize">
          {support.status}
        </div>
      </div>

      {/* Ticket ID */}
      <div>
        <p className="text-xs mb-1 text-gray-500">Ticket ID</p>
        <div className="border px-3 py-2 rounded-md bg-white shadow-sm text-sm text-gray-800">
          #{support._id}
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
          {["Sample Name", "John Smith", "Jane Doe"].map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Last Interaction */}
      {/* <div className="col-span-2">
        <p className="text-xs mb-2 text-gray-500">Last Interaction</p>
        <div className="border rounded-lg bg-white p-4 space-y-3 max-h-96 overflow-y-auto">
          {[
            {
              sender: "user",
              message: support.message || "",
              date: support.createdAt,
            },
            {
              sender: "admin",
              message: support.adminMessage || "",
              date: support.updatedAt,
            },
          ].map((interaction, idx) => {
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
                    {new Date(interaction.date).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* Admin Subject */}
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Subject</p>
        <div className="border px-3 py-2 rounded-md bg-white shadow-sm text-sm text-gray-800">
          {support.adminSubject || "—"}
        </div>
      </div>

      {/* Admin Message */}
      <div className="col-span-2">
        <p className="text-xs mb-1 text-gray-500">Message</p>
        <div className="border px-3 py-2 rounded-md bg-white shadow-sm text-sm text-gray-800 min-h-[120px] whitespace-pre-wrap">
          {support.adminMessage || "—"}
        </div>
      </div>
    </div>
  );
};

export default AdminActions;
