import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Accept the rich demoActivities instead
type EventTableProps = {
  demoActivities: {
    id: string;
    title: string;
    type: string;
    status: string;
    ambassadorName: string;
    location: string;
    startDateTime: string;
  }[];
};

export function EventTable({ demoActivities }: EventTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b border-gray-300 text-gray-500 text-xs uppercase">
            <TableHead className="px-3 py-2 font-medium">S.No.</TableHead>
            <TableHead className="px-3 py-2 font-medium">Date</TableHead>
            <TableHead className="px-3 py-2 font-medium">Name</TableHead>
            <TableHead className="px-3 py-2 font-medium">Type</TableHead>
            <TableHead className="px-3 py-2 font-medium">Status</TableHead>
            <TableHead className="px-3 py-2 font-medium">Organizer</TableHead>
            <TableHead className="px-3 py-2 font-medium">Location</TableHead>
            <TableHead className="px-3 py-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoActivities.map((event, index) => (
            <TableRow
              key={event.id}
              onClick={() =>
                navigate(`/events/${event.id}`, { state: { activity: event } })
              }
              className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
              style={{ fontSize: "11px" }}
            >
              <td className="px-3 py-1">{index + 1}</td>
              <td className="px-3 py-1">
                {new Date(event.startDateTime).toLocaleDateString()}
              </td>
              <td className="px-3 py-1">{event.title}</td>
              <td className="px-3 py-1">{event.type}</td>
              <td className="px-3 py-1 capitalize">{event.status}</td>
              <td className="px-3 py-1">{event.ambassadorName}</td>
              <td className="px-3 py-1">{event.location}</td>
              <td className="px-3 py-1 text-right">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
