import React from "react";
import { InteractionLogTable } from "./InteractionLogTable";

// Dummy interaction log data
const interactionLogs = [
  {
    id: 1,
    date: "12-06-2022",
    ticketId: "XYZABC",
    title: "Regarding Payments",
    status: "Closed",
  },
  {
    id: 2,
    date: "12-06-2022",
    ticketId: "XYZABC",
    title: "Ticket not received",
    status: "Active",
  },
  {
    id: 3,
    date: "12-06-2022",
    ticketId: "XYZABC",
    title: "Regarding Payments",
    status: "Closed",
  },
  {
    id: 4,
    date: "12-06-2022",
    ticketId: "XYZABC",
    title: "Ticket not received",
    status: "Active",
  },
  {
    id: 5,
    date: "12-06-2022",
    ticketId: "XYZABC",
    title: "Regarding Payments",
    status: "Active",
  },
] as const;

const InteractionLog: React.FC = () => {
  return (
    <div className="bg-white w-full mt-4 p-4 rounded-lg shadow-sm">
      <InteractionLogTable data={interactionLogs} />
    </div>
  );
};

export default InteractionLog;
