import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";

interface AnalyticsEventRowProps {
  event: {
    name: string;
    ticketsSold: number;
    revenue: string;
    location: string;
  };
  index: number;
}

export const AnalyticsEventRow: React.FC<AnalyticsEventRowProps> = ({
  event,
  index,
}) => {
  return (
    <TableRow
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{event.name}</TableCell>
      <TableCell className="px-3 py-1">{event.ticketsSold}</TableCell>
      <TableCell className="px-3 py-1">{event.revenue}</TableCell>
      <TableCell className="px-3 py-1">{event.location}</TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
