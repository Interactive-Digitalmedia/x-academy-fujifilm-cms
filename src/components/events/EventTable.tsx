import { EventRow } from "./EventRow";
import { dummyEvents } from "@/assets/dummyEvents";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// props from ListView
export function EventTable({ selectedType }: { selectedType: string }) {
  // Filter events based on selected type
  const filteredEvents =
    selectedType === "All"
      ? dummyEvents
      : dummyEvents.filter(
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
