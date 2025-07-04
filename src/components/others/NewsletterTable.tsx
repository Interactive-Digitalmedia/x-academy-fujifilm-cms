import React from "react";
import { NewsletterRow } from "./NewsletterRow";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type for newsletter entries
type NewsletterEntry = {
  id: string;
  date: string;
  email: string;
  source: string;
};

// Props for the entire table
type NewsletterTableProps = {
  newsletterData: NewsletterEntry[];
};

export const NewsletterTable: React.FC<NewsletterTableProps> = ({
  newsletterData,
}) => {
  return (
    <div className="bg-white w-full -mt-6 pt-0">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TableHead className="px-3 py-0.5 font-medium">S.No.</TableHead>
            <TableHead className="px-3 py-0.5 font-medium">Date</TableHead>
            <TableHead className="px-3 py-0.5 font-medium">Email</TableHead>
            <TableHead className="px-3 py-0.5 font-medium">Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsletterData.map((entry, index) => (
            <NewsletterRow key={entry.id} entry={entry} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
