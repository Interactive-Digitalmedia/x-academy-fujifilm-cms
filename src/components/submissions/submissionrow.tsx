import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Submission {
  sno: number;
  name: string;
  link: string;
  status: "Approved" | "Rejected" | "Pending";
  uploadDate: string;
}

interface SubmissionRowProps {
  data: Submission;
  index: number;
}

export const SubmissionRow: React.FC<SubmissionRowProps> = ({
  data,
  index,
}) => {
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
  
const navigate = useNavigate();

  return (
    <TableRow  onClick={() => navigate(`/submissions/${data.sno}`)} className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0 leading-tight">
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{data.name}</TableCell>
      <TableCell className="text-blue-600 underline">{data.link}</TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${getStatusDotColor()}`} />
          {data.status}
        </div>
      </TableCell>
      <TableCell className="px-3 py-1">{data.uploadDate}</TableCell>
      <TableCell className="px-3 py-1">
        {data.status === "Pending" ? (
          <div className="flex gap-2">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 h-6 text-xs rounded">
              Approve
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 h-6 text-xs rounded">
              Deny
            </Button>
          </div>
        ) : (
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 h-6 text-xs rounded">
            Update
          </Button>
        )}
      </TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
