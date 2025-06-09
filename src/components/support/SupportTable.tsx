import { SupportRow } from "./SupportRow";
import { dummySupport } from "@/assets/dummySupport";

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as TH,
} from "@/components/ui/table";

type SupportTableProps = {
  filteredSupports: typeof dummySupport; // or your SupportType[]
};

export function SupportTable({ filteredSupports }: SupportTableProps) {
  return (
    <div className="bg-white w-full">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TH className="px-3 py-2 font-medium">S.No.</TH>
            <TH className="px-3 py-2 font-medium">Date</TH>
            <TH className="px-3 py-2 font-medium">Raised By</TH>
            <TH className="px-3 py-2 font-medium">Title</TH>
            <TH className="px-3 py-2 font-medium">Type</TH>
            <TH className="px-3 py-2 font-medium">Status</TH>
            <TH className="px-3 py-2 font-medium">Assign</TH>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSupports.map((support, index) => (
            <SupportRow key={support.id} support={support} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
