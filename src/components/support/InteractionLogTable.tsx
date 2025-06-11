import React from "react";
import { InteractionLogRow } from "./InteractionLogRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the interaction type
export type Interaction = {
  id: number;
  date: string;
  ticketId: string;
  title: string;
  status: "Active" | "Closed";
};

interface InteractionLogTableProps {
  data: readonly Interaction[]; // Accepts readonly array
}

export const InteractionLogTable: React.FC<InteractionLogTableProps> = ({
  data,
}) => {
  return (
    <div className="bg-white w-full">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TableHead className="px-3 py-2 font-medium">S.No.</TableHead>
            <TableHead className="px-3 py-2 font-medium">Date</TableHead>
            <TableHead className="px-3 py-2 font-medium">Ticket ID</TableHead>
            <TableHead className="px-3 py-2 font-medium">Title</TableHead>
            <TableHead className="px-3 py-2 font-medium">Status</TableHead>
            <TableHead className="px-3 py-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((log, index) => (
            <InteractionLogRow key={log.id} interaction={log} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
