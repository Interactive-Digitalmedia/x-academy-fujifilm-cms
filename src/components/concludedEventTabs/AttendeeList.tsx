import * as React from "react";
import { AttendeeTable } from "./AttendeeTable";
import { dummyAttendees } from "@/assets/dummyAttendee";

export default function AttendeeList() {
  return (
    <div>
      <AttendeeTable attendees={dummyAttendees} />
    </div>
  );
}
