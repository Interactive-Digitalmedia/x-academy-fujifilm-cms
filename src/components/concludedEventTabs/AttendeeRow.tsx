import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Attendee } from "./AttendeeTable";

interface AttendeeRowProps {
  data: Attendee;
  index: number;
}

export const AttendeeRow: React.FC<AttendeeRowProps> = ({ data, index }) => {
  const getStatusDotColor = () => {
    switch (data.status) {
      case "Approved":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "Pending":
        return "bg-yellow-400";
    }
  };

  return (
    <TableRow className="hover:bg-[#1098F7] hover:text-white cursor-pointer border-b-0 leading-tight">
      <TableCell className="px-4 py-1  text-center">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{data.name}</TableCell>
      <TableCell className="px-4 py-1 ">{data.date}</TableCell>
      <TableCell className="px-4 py-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${getStatusDotColor()}`} />
          {data.status}
        </div>
      </TableCell>
      <TableCell className="px-4 py-1 text-center">{data.seats}</TableCell>
      <TableCell className="px-4 py-1">
        <div className="flex justify-end items-center gap-2">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 h-6 text-xs rounded">
            Approve
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 h-6 text-xs rounded">
            Deny
          </Button>
        </div>
      </TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
