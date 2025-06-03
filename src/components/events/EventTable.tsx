import { EventRow } from "./EventRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const events = [
  {
    id: 1,
    date: "26-05-2025",
    name: "Kanishka Event",
    status: "Active",
    type: "Workshop",
    organizer: "Manas Sharma",
    location: "Delhi, India",
  },
  {
    id: 2,
    date: "28-05-2025",
    name: "Ajay Kulhari Event",
    type: "Event",
    status: "Concluded",
    organizer: "Manas Sharma",
    location: "Bihar, India",
  },
  {
    id: 3,
    date: "28-05-2025",
    name: "Ajay Kulhari Event",
    type: "Event",
    status: "Active",
    organizer: "Manas Sharma",
    location: "Bihar, India",
  },

  {
    id: 4,
    date: "30-05-2025",
    name: "Ritika Event",
    type: "Exhibition",
    status: "Active",
    organizer: "Manas Sharma",
    location: "Lucknow, India",
  },
  {
    id: 5,
    date: "01-06-2025",
    name: "Anita Seminar",
    status: "Active",
    type: "Workshop",
    organizer: "Rohan Verma",
    location: "Mumbai, India",
  },
  {
    id: 6,
    date: "03-06-2025",
    name: "Tech Expo 2025",
    type: "Exhibition",
    status: "Concluded",
    organizer: "Deepak Singh",
    location: "Bangalore, India",
  },
  {
    id: 7,
    date: "05-06-2025",
    name: "Career Fair",
    type: "Event",
    status: "Active",
    organizer: "Neha Gupta",
    location: "Chennai, India",
  },
  {
    id: 8,
    date: "07-06-2025",
    name: "Design Thinking Workshop",
    status: "Active",
    type: "Workshop",
    organizer: "Manas Sharma",
    location: "Pune, India",
  },
  // more rows...
];

// props from ListView
export function EventTable({ selectedType }: { selectedType: string }) {
  // Filter events based on selected type
  const filteredEvents =
    selectedType === "All"
      ? events
      : events.filter(
          (event) => event.type.toLowerCase() === selectedType.toLowerCase()
        );
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
          {filteredEvents.map((event, index) => (
            <EventRow key={event.id} event={event} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
