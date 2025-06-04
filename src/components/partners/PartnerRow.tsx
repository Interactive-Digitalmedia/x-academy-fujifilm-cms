import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Props definition
interface Partner {
  sno: number;
  name: string;
  role: string;
  city: string;
  countryEmoji: string;
  upcomingEvents: number;
  totalEvents: number;
  fujigearOwned: number;
  imageUrl: string;
}

interface PartnerRowProps {
  partner: Partner;
  index: number;
}

const PartnerRow: React.FC<PartnerRowProps> = ({ partner, index }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate(`/partner/${partner.sno}`)}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{partner.name}</TableCell>
      <TableCell className="px-3 py-1 capitalize">{partner.role}</TableCell>
      <TableCell className="px-3 py-1 text-center align-middle">
        {partner.upcomingEvents}
      </TableCell>
      <TableCell className="px-3 py-1 text-center align-middle">
        {partner.totalEvents}
      </TableCell>
      <TableCell className="px-3 py-1 text-center align-middle">
        {partner.fujigearOwned}
      </TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};

export default PartnerRow;
