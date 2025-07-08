import React from "react";
import { SubmissionRow } from "./submissionrow";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as TH,
} from "@/components/ui/table";
import { Submission } from "@/types";

interface SubmissionTableProps {
  submissions: Submission[];
}

export const SubmissionTable: React.FC<SubmissionTableProps> = ({
  submissions,
}) => {
  console.log(submissions);  
  return (
    <div className="bg-white w-full ">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TH className="px-3 py-2 font-medium">S.No.</TH>
            <TH className="px-3 py-2 font-medium">Name</TH>
            <TH className="px-3 py-2 font-medium">Link</TH>
            <TH className="px-3 py-2 font-medium">Status</TH>
            <TH className="px-3 py-2 font-medium">Upload Date</TH>
            <TH className="px-3 py-2 font-medium">Action</TH>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions?.map((sub, i) => (
            <SubmissionRow key={i} data={sub} index={i} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
