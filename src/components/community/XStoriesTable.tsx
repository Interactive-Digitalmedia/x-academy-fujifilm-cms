import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as TH,
} from "@/components/ui/table";
import { XStoryRow } from "./XStoriesRow";

export interface XStory {
  sno: number;
  title: string;
  videoLink: string;
  dateUploaded: string;
  uploadedBy: string;
  isCoverImage: boolean;
}

interface XStoriesTableProps {
  stories: XStory[];
}

export const XStoriesTable: React.FC<XStoriesTableProps> = ({ stories }) => {
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
            <XStoryRow key={i} data={story} index={i} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
