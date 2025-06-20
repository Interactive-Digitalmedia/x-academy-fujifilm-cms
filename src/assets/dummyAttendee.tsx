type Status = "Pending" | "Approved" | "Rejected";

export const dummyAttendees: {
  sno: number;
  name: string;
  date: string;
  status: Status;
  seats: number;
}[] = [
  {
    sno: 1,
    name: "Alice Johnson",
    date: "27/05/2025",
    status: "Approved",
    seats: 2,
  },
  {
    sno: 2,
    name: "Bob Smith",
    date: "27/05/2025",
    status: "Rejected",
    seats: 1,
  },
  {
    sno: 3,
    name: "Carlos Reyes",
    date: "27/05/2025",
    status: "Pending",
    seats: 3,
  },
  {
    sno: 4,
    name: "Diana Patel",
    date: "27/05/2025",
    status: "Approved",
    seats: 2,
  },
  {
    sno: 5,
    name: "Edward Kim",
    date: "27/05/2025",
    status: "Approved",
    seats: 1,
  },
  {
    sno: 6,
    name: "Fatima Ahmed",
    date: "27/05/2025",
    status: "Approved",
    seats: 4,
  },
  {
    sno: 7,
    name: "George Liu",
    date: "27/05/2025",
    status: "Rejected",
    seats: 1,
  },
  {
    sno: 8,
    name: "Hannah Wong",
    date: "27/05/2025",
    status: "Pending",
    seats: 2,
  },
  {
    sno: 9,
    name: "Isaac Brown",
    date: "27/05/2025",
    status: "Pending",
    seats: 1,
  },
  {
    sno: 10,
    name: "Jasmine Singh",
    date: "27/05/2025",
    status: "Pending",
    seats: 3,
  },
];
