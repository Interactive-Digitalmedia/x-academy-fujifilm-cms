import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as TH,
} from "@/components/ui/table";
import { XStoryRow } from "./XStoriesRow";
import { XStory } from "./CommunityOptions"; // Import from the central definition

interface XStoriesTableProps {
  stories: XStory[];
  onRowClick: (story: XStory) => void;
}

export const XStoriesTable: React.FC<XStoriesTableProps> = ({
  stories,
  onRowClick,
}) => {
  return (
    <div className="bg-white w-full">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TH className="px-4 py-3 font-medium text-center">S.No.</TH>
            <TH className="px-4 py-3 font-medium">Title</TH>
            <TH className="px-4 py-3 font-medium">Video Link</TH>
            <TH className="px-4 py-3 font-medium">Date Uploaded</TH>
            <TH className="px-4 py-3 font-medium">Uploaded By</TH>
            <TH className="px-4 py-3 font-medium text-right">Cover Image</TH>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stories.map((story, i) => (
            <XStoryRow
              key={story._id}
              data={story}
              index={i}
              onClick={() => onRowClick(story)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
