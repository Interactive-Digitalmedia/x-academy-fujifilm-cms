import React from "react";
import { AttendeeRow } from "./AttendeeRow";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as TH,
} from "@/components/ui/table";

export interface Attendee {
  sno: number;
  name: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  seats: number;
}

interface AttendeeTableProps {
  attendees: Attendee[];
}

export const AttendeeTable: React.FC<AttendeeTableProps> = ({ attendees }) => {
  return (
    <div className="bg-white w-full">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TH className="px-3 py-2 font-medium">S.No.</TH>
            <TH className="px-3 py-2 font-medium">Name</TH>
            <TH className="px-3 py-2 font-medium">Date</TH>
            <TH className="px-3 py-2 font-medium">Status</TH>
            <TH className="px-3 py-2 font-medium">Seats</TH>
            <TH className="px-4 py-3 font-medium text-right pr-[102px]">
              Action
            </TH>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.map((att, i) => (
            <AttendeeRow key={i} data={att} index={i} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
