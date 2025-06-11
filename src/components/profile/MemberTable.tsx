import React from "react";
import InviteAdminModal from "../navbar/InviteAdminModal";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberRow } from "./MemberRow";
import { useDisclosure } from "@nextui-org/react"; // ✅ import this

const dummyMembers = [
  {
    id: 1,
    date: "12-06-2022",
    name: "XYZABC",
    email: "johndoe@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    date: "12-06-2022",
    name: "XYZABC",
    email: "johndoe@gmail.com",
    role: "Admin",
  },
  {
    id: 3,
    date: "12-06-2022",
    name: "XYZABC",
    email: "johndoe@gmail.com",
    role: "Admin",
  },
  {
    id: 4,
    date: "12-06-2022",
    name: "XYZABC",
    email: "johndoe@gmail.com",
    role: "Content Manager",
  },
  {
    id: 5,
    date: "12-06-2022",
    name: "XYZABC",
    email: "johndoe@gmail.com",
    role: "Event Manager",
  },
];

export const MemberTable: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // ✅ modal state

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
          {dummyMembers.map((member, index) => (
            <MemberRow key={member.id} member={member} index={index} />
          ))}
        </TableBody>
      </Table>

      {/* Add New Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onOpen} // ✅ opens the modal
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1"
        >
          + Add New
        </button>
      </div>

      {/* Invite Admin Modal */}
      <InviteAdminModal isOpen={isOpen} onClose={onOpenChange} />
    </div>
  );
};