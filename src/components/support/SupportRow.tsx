import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SupportRowProps {
  support: {
    sno: number;
    _id: string;
    date: string;
    raisedBy: string;
    title: string;
    type: string;
    status: string;
    assign: string;
  };
  index: number;
}

export const SupportRow: React.FC<SupportRowProps> = ({ support, index }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() =>
        navigate(
          support.type.toLowerCase() === "refund"
            ? `/support/refund/${support._id}`
            : `/support/${support._id}`
        )
      }
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell> 
      <TableCell className="px-3 py-1">{support.date}</TableCell>
      <TableCell className="px-3 py-1">{support.raisedBy}</TableCell>
      <TableCell className="px-3 py-1">{support.title}</TableCell>
      <TableCell className="px-3 py-1">{support.type}</TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              support.status.toLowerCase() === "open"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          ></span>
          <span>{support.status}</span>
        </div>
      </TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          <span>{support.assign}</span>
          <Button
            size="icon"
            variant="outline"
            className="h-5 w-5 rounded-full border border-gray-300 text-gray-500 p-0"
            onClick={(e) => {
              e.stopPropagation(); // prevent row navigation
              console.log("Plus button clicked for ID:", support._id);
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
