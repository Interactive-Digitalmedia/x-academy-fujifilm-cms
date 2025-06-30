import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AttendeeTable from "../concludedEventTabs/AttendeeTable";
import { Attendee } from "@/types";
interface ActivityDialogProps {
  attendees: Attendee[];
}

const ActivityDialog: React.FC<ActivityDialogProps> = ({ attendees }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full h-[32px] px-4 text-sm bg-[#2196F3] text-white hover:bg-[#1976D2]"
        >
          View All
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[60vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Attendee List</DialogTitle>
        </DialogHeader>

        <div className="py-0">
          {attendees.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No attendees found.</p>
          ) : (
            <AttendeeTable attendees={attendees} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDialog;
