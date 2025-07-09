import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Ambassador } from "@/types";

// Props definition

interface PartnerRowProps {
  partner: Ambassador;
  index: number;
}

const PartnerRow: React.FC<PartnerRowProps> = ({ partner, index }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate(`/partners/${partner?.userName}`)}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{partner.fullname}</TableCell>
      <TableCell className="px-3 py-1 capitalize">{partner.type}</TableCell>
      <TableCell className="px-3 py-1 text-center align-middle">
        {partner?.upcomingEvents?.length}
      </TableCell>
      <TableCell className="px-3 py-1 text-center align-middle">
        {partner?.totalEvents}
      </TableCell>
      <TableCell className="px-3 py-1 text-center align-middle">
        {partner?.gearDetails?.length}
      </TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};

export default PartnerRow;
