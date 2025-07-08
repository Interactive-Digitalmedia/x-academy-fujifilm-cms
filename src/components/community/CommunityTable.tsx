import { AskToExperts } from "@/types";
import { CommunityRow } from "./CommunityRow";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as TH,
} from "@/components/ui/table";


type CommunityTableProps = {
  data: AskToExperts[];
};

export function CommunityTable({ data }: CommunityTableProps) {
  return (
    <div className="bg-white w-full">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TH className="px-3 py-2 font-medium">S.No.</TH>
            <TH className="px-3 py-2 font-medium">Date</TH>
            <TH className="px-3 py-2 font-medium">Raised By</TH>
            <TH className="px-3 py-2 font-medium">Question</TH>
            <TH className="px-3 py-2 font-medium">Status</TH>
            <TH className="px-3 py-2 font-medium">Assign</TH>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <CommunityRow key={item._id} community={item} index={idx} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
