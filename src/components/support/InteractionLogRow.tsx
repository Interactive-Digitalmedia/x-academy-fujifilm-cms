import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Interaction } from "./InteractionLogTable";

interface RowProps {
  interaction: Interaction;
  index: number;
}

export const InteractionLogRow: React.FC<RowProps> = ({
  interaction,
  index,
}) => {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate("/notfound")}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{interaction.date}</TableCell>
      <TableCell className="px-3 py-1">{interaction.ticketId}</TableCell>
      <TableCell className="px-3 py-1">{interaction.title}</TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              interaction.status === "Active" ? "bg-yellow-500" : "bg-green-500"
            }`}
          ></span>
          <span>{interaction.status}</span>
        </div>
      </TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
