// components/dialogs/ActivityDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import AttendeeList from "../concludedEventTabs/AttendeeList";
import { Button } from "@/components/ui/button";

const ActivityDialog = () => {
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
      <DialogContent className=" max-w-[60vw] max-h-[80vh] ">

         <DialogHeader className=" top-0 ">
          <DialogTitle >Attendee List</DialogTitle>
        </DialogHeader>

        <div className="py-0 ">
          <AttendeeList />
        </div>

        <DialogFooter>
          {/* <Button variant="secondary">Close</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDialog;
