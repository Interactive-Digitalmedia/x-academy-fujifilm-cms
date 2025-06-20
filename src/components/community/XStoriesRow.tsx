import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { XStory } from "./XStoriesTable";

interface XStoryRowProps {
  data: XStory;
  index: number;
}

export const XStoryRow: React.FC<XStoryRowProps> = ({ data, index }) => {
  return (
    <TableRow
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1 text-center">{index + 1}</TableCell>
      <TableCell className="px-3 py-1 truncate max-w-[160px]">{data.title}</TableCell>
      <TableCell className="px-3 py-1 text-blue-600 underline truncate max-w-[160px]">
        {data.videoLink}
      </TableCell>
      <TableCell className="px-3 py-1">{data.dateUploaded}</TableCell>
      <TableCell className="px-3 py-1">{data.uploadedBy}</TableCell>
      <TableCell className="px-3 py-1 text-right">
        <div className="flex items-center justify-end gap-2">
          
            {data.isCoverImage ? "YES" : "NO"}
          
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </TableCell>
    </TableRow>
  );
};

// TableCell className="px-4 py-3 text-right">
//         {data.isCoverImage ? "YES" : "NO"}
//         <ChevronRight className="inline-block ml-2 w-4 h-4 text-gray-400" />
//       </TableCell>