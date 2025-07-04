// NewsletterRow.tsx
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

type NewsletterRowProps = {
  entry: {
    id: string;
    date: string;
    email: string;
    source: string;
  };
  index: number;
};

export const NewsletterRow: React.FC<NewsletterRowProps> = ({
  entry,
  index,
}) => {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => navigate("/notfound")}
      className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
      style={{ fontSize: "11px" }}
    >
      <TableCell className="px-3 py-1">{index + 1}</TableCell>
      <TableCell className="px-3 py-1">{entry.date}</TableCell>
      <TableCell className="px-3 py-1">{entry.email}</TableCell>
      <TableCell className="px-3 py-1">{entry.source}</TableCell>
    </TableRow>
  );
};
