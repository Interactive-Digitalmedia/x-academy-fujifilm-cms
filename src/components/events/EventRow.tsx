import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

// Define props type
interface EventRowProps {
  event: {
    id: number;
    date: string;
    name: string;
    status: string;
    type: string;
    organizer: string;
    location: string;
  };
  index: number;
}

export const EventRow: React.FC<EventRowProps> = ({ event, index }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate("/notfound")}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{event.date}</TableCell>
      <TableCell className="px-3 py-1">{event.name}</TableCell>
      <TableCell className="px-3 py-1">{event.type}</TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              event.status === "Active" ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span>{event.status}</span>
        </div>
      </TableCell>
      <TableCell className="px-3 py-1">{event.organizer}</TableCell>
      <TableCell className="px-3 py-1">{event.location}</TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
