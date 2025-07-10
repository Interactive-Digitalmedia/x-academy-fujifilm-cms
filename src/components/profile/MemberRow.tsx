import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { CmsUserProfileData } from "@/types";

interface MemberRowProps {
  member: CmsUserProfileData;
  index: number;
}

export const MemberRow: React.FC<MemberRowProps> = ({ member, index }) => {
  // const navigate = useNavigate();

  const formatDate = (isoDate: string) => {
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <TableRow
      // onClick={() => navigate("/notfound")}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0 text-sm"
    >
      <TableCell className="px-3 py-2">{index + 1}</TableCell>
      <TableCell className="px-3 py-2">
        {formatDate(member?.createdAt)}
      </TableCell>
      <TableCell className="px-3 py-2">{member?.fullname ? member?.fullname : "-"}</TableCell>
      <TableCell className="px-3 py-2">{member?.email}</TableCell>
      <TableCell className="px-3 py-2">{member?.userRole}</TableCell>
      <TableCell className="px-3 py-2 text-right">
        <MoreVertical className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
