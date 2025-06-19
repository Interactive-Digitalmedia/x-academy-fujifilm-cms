type Status = "Pending" | "Approved" | "Rejected";

export const dummySubmissions: {
  sno: number;
  name: string;
  link: string;
  status: Status;
  uploadDate: string;
}[] = [
  {
    sno: 1,
    name: "Alice Johnson",
    link: "www.aliceportfolio.com",
    status: "Approved",
    uploadDate: "27/05/2025",
  },
  {
    sno: 2,
    name: "Bob Smith",
    link: "www.bobmediahub.com",
    status: "Rejected",
    uploadDate: "27/05/2025",
  },
  {
    sno: 3,
    name: "Carlos Reyes",
    link: "www.carlosprojects.net",
    status: "Pending",
    uploadDate: "27/05/2025",
  },
  {
    sno: 4,
    name: "Diana Patel",
    link: "www.dianapatel.org",
    status: "Approved",
    uploadDate: "27/05/2025",
  },
  {
    sno: 5,
    name: "Edward Kim",
    link: "www.edwardkim.io",
    status: "Approved",
    uploadDate: "27/05/2025",
  },
  {
    sno: 6,
    name: "Fatima Ahmed",
    link: "www.fatima-creates.com",
    status: "Approved",
    uploadDate: "27/05/2025",
  },
  {
    sno: 7,
    name: "George Liu",
    link: "www.georgeliu.co",
    status: "Approved",
    uploadDate: "27/05/2025",
  },
  {
    sno: 8,
    name: "Hannah Wong",
    link: "www.hannah.design",
    status: "Pending",
    uploadDate: "27/05/2025",
  },
  {
    sno: 9,
    name: "Isaac Brown",
    link: "www.isaacmakes.com",
    status: "Pending",
    uploadDate: "27/05/2025",
  },
  {
    sno: 10,
    name: "Jasmine Singh",
    link: "www.jasminesingh.art",
    status: "Pending",
    uploadDate: "27/05/2025",
  },
];
