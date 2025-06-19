import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnalyticsEventRow } from "./AnalyticsEventRow";

interface AnalyticsEvent {
  name: string;
  ticketsSold: number;
  revenue: string;
  location: string;
}

interface AnalyticsEventTableProps {
  events: AnalyticsEvent[];
}

export const AnalyticsEventTable: React.FC<AnalyticsEventTableProps> = ({
  events,
}) => {
  return (
    <div className="bg-white w-full">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TableHead className="px-3 py-2 font-medium">S.No.</TableHead>
            <TableHead className="px-3 py-2 font-medium">Name</TableHead>
            <TableHead className="px-3 py-2 font-medium">
              Tickets Sold
            </TableHead>
            <TableHead className="px-3 py-2 font-medium">
              Revenue Generated
            </TableHead>
            <TableHead className="px-3 py-2 font-medium">Location</TableHead>
            <TableHead className="px-3 py-2" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => (
            <AnalyticsEventRow key={index} event={event} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
