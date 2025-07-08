import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { XStoryType } from "@/types";

interface XStoryRowProps {
  data: XStoryType;
  index: number;
  onClick: () => void;
}

export const XStoryRow: React.FC<XStoryRowProps> = ({
  data,
  index,
  onClick,
}) => {  
  return (
    <TableRow
      onClick={onClick}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1 text-center">{index + 1}</TableCell>
      <TableCell className="px-3 py-1 truncate max-w-[160px]">
        {data?.name}
      </TableCell>
      <TableCell className="px-3 py-1 text-blue-600 underline truncate max-w-[160px]">
        {data?.link}
      </TableCell>
      <TableCell className="px-3 py-1">{data?.createdAt}</TableCell>
      <TableCell className="px-3 py-1">Admin</TableCell>
      <TableCell className="px-3 py-1 text-right">
        <div className="flex items-center justify-end gap-2">
          {data.coverImage ? "YES" : "NO"}
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </TableCell>
    </TableRow>
  );
};

XStoryRow;
