import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberRow } from "./MemberRow";
import { CmsUserProfileData } from "@/types";

interface MemberTableProps {
  members: CmsUserProfileData[];
}

const MemberTable: React.FC<MemberTableProps> = ({ members }) => {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure(); // ✅ modal state

  return (
    <div className="bg-white w-full rounded-xl">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TableHead className="px-3 py-2 font-medium">S.No.</TableHead>
            <TableHead className="px-3 py-2 font-medium">Date</TableHead>
            <TableHead className="px-3 py-2 font-medium">Name</TableHead>
            <TableHead className="px-3 py-2 font-medium">Email ID</TableHead>
            <TableHead className="px-3 py-2 font-medium">Role</TableHead>
            <TableHead className="px-3 py-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <MemberRow key={member._id} member={member} index={index} />
          ))}
        </TableBody>
      </Table>

      {/* Add New Button */}
      {/* <div className="flex justify-end mt-4">
        <button
          onClick={onOpen} // ✅ opens the modal
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1"
        >
          + Add New
        </button>
      </div> */}

      {/* Invite Admin Modal */}
      {/* <InviteAdminModal isOpen={isOpen} onClose={onOpenChange} /> */}
    </div>
  );
};

export default MemberTable;
