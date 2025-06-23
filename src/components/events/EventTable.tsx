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


export function EventTable({ demoActivities }: any) {
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
          {demoActivities.map((event:any, index:any) => (
            <TableRow
              key={event._id}
              onClick={() =>
                navigate(`/events/${event._id}`, { state: { activity: event } })
              }
              className="hover:bg-blue-500 hover:text-white cursor-pointer border-b-0"
              style={{ fontSize: "11px" }}
            >
              <td className="px-3 py-1">{index + 1}</td>
              <td className="px-3 py-1">
                {event?.startDate}
              </td>
              <td className="px-3 py-1">{event?.activityName}</td>
              <td className="px-3 py-1">{event?.activityType}</td>
              <td className="px-3 py-1 capitalize">{event.status}</td>
              <td className="px-3 py-1">{event?.ambassadorName}</td>
              <td className="px-3 py-1">{event?.location}</td>
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
