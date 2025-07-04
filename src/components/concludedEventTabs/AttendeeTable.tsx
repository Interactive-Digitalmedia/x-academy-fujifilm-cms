import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead as TH,
} from "@/components/ui/table";
import { Attendee } from "@/types";
import { ChevronRight } from "lucide-react";

interface Props {
  attendees?: Attendee[];
}

const AttendeeTable: React.FC<Props> = ({ attendees }) => {
  const getStatusDotColor = (status: Attendee["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      case "Pending":
      default:
        return "bg-yellow-400";
    }
  };
  function formatDate(dateString: string) {
    return new Date(dateString).toISOString().slice(0, 10);
  }

  return (
    <div className="bg-white w-full text-sm">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TH className="px-3 py-2 font-medium">S.No.</TH>
            <TH className="px-3 py-2 font-medium">Name</TH>
            <TH className="px-3 py-2 font-medium">Date</TH>
            <TH className="px-3 py-2 font-medium">Status</TH>
            <TH className="px-3 py-2 font-medium">Seats</TH>
            <TH className="px-4 py-3 font-medium text-right pr-[102px]">
              Action
            </TH>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees &&
            attendees?.map((att, index) => (
              <TableRow
                key={index}
                className="hover:bg-[#1098F7] hover:text-white cursor-pointer border-b-0 leading-tight"
              >
                <TableCell className="px-4 py-1 text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="px-3 py-1">
                  {att?.userId?.fullname}
                </TableCell>
                <TableCell className="px-4 py-1">
                  {formatDate(att?.bookingDate)}
                </TableCell>
                <TableCell className="px-4 py-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${getStatusDotColor(att.status)}`}
                    />
                    {att.status}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-1 text-center">
                  {att?.numberOfSeats}
                </TableCell>
                <TableCell className="px-4 py-1">
                  <div className="flex justify-end items-center gap-2">
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 h-6 text-xs rounded">
                      Approve
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 h-6 text-xs rounded">
                      Deny
                    </Button>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendeeTable;
