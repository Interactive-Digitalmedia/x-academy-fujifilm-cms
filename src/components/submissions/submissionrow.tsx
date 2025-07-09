import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Submission } from "@/types";

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
      case "approved":
        return "bg-green-500";
      case "denied":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-400";
    }
  };

  const navigate = useNavigate();
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleNavigate = () => {
    navigate(`/submissions/${data?._id}`, { state: { submission: data } });
  };

  return (
    <TableRow
      onClick={() => handleNavigate()}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0 leading-tight"
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1 capitalize">
        {" "}
        {data.userId &&
        typeof data.userId === "object" &&
        "fullname" in data.userId
          ? data.userId.fullname
          : "—"}
      </TableCell>
      <TableCell className="px-3 py-1">{data?.googleDriveLink}</TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${getStatusDotColor()}`} />
          {data?.status}
        </div>
      </TableCell>
      <TableCell className="px-3 py-1">{formatDate(data?.createdAt)}</TableCell>
      <TableCell className="px-3 py-1">
        {data?.status === "pending" ? (
          <div className="flex gap-2">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 h-6 text-xs rounded"
              disabled
            >
              Approve
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 h-6 text-xs rounded"
              disabled
            >
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
