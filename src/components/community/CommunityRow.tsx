import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CommunityRowProps {
  community: {
    sno: number;
    _id: string;
    date: string;
    raisedBy: string;
    question: string;
    status: string;
    assign?: string;
  };
  index: number;
}

export const CommunityRow: React.FC<CommunityRowProps> = ({
  community,
  index,
}) => {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate(`/community/${community._id}`)}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{community.date}</TableCell>
      <TableCell className="px-3 py-1">{community.raisedBy}</TableCell>
      <TableCell className="px-3 py-1">{community.question}</TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              community.status.toLowerCase() === "active"
                ? "bg-yellow-500"
                : "bg-gray-400"
            }`}
          ></span>
          <span>{community.status}</span>
        </div>
      </TableCell>
      <TableCell className="px-3 py-1">
        <div className="flex items-center gap-2">
          {community.assign ? (
            <span className="flex items-center gap-1">
              <span className="w-5 h-5 bg-gray-200 rounded-full text-center text-xs font-medium flex items-center justify-center">
                {community.assign.charAt(0).toUpperCase()}
              </span>
              {community.assign}
            </span>
          ) : (
            <Button
              size="icon"
              variant="outline"
              className="h-5 w-5 rounded-full border border-gray-300 text-gray-500 p-0"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Assign clicked for ID:", community._id);
              }}
            >
              <Plus className="h-3 w-3" />
            </Button>
          )}
        </div>
      </TableCell>
      <TableCell className="px-3 py-1 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </TableCell>
    </TableRow>
  );
};
