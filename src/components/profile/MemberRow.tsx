import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Member {
  id: number;
  date: string;
  name: string;
  email: string;
  role: string;
}

interface MemberRowProps {
  member: Member;
  index: number;
}

export const MemberRow: React.FC<MemberRowProps> = ({ member, index }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate("/notfound")}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0 text-sm"
    >
      <TableCell className="px-3 py-2">{index + 1}</TableCell>
      <TableCell className="px-3 py-2">{member.date}</TableCell>
      <TableCell className="px-3 py-2">{member.name}</TableCell>
      <TableCell className="px-3 py-2">{member.email}</TableCell>
      <TableCell className="px-3 py-2">{member.role}</TableCell>
      <TableCell className="px-3 py-2 text-right">
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
