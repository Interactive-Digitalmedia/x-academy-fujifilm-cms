import React from "react";
import { NewsletterTable } from "./NewsletterTable";

const dummyNewsletterData = [
  { id: "1", date: "2025-06-01", email: "john@example.com", source: "Website" },
  {
    id: "2",
    date: "2025-06-02",
    email: "jane@example.com",
    source: "Instagram",
  },
  {
    id: "3",
    date: "2025-06-03",
    email: "alice@example.com",
    source: "Referral",
  },
  { id: "4", date: "2025-06-04", email: "bob@example.com", source: "Facebook" },
  {
    id: "5",
    date: "2025-06-05",
    email: "charlie@example.com",
    source: "Website",
  },
  {
    id: "6",
    date: "2025-06-06",
    email: "david@example.com",
    source: "LinkedIn",
  },
  {
    id: "7",
    date: "2025-06-07",
    email: "emma@example.com",
    source: "Instagram",
  },
  {
    id: "8",
    date: "2025-06-08",
    email: "frank@example.com",
    source: "Referral",
  },
  {
    id: "9",
    date: "2025-06-09",
    email: "grace@example.com",
    source: "Newsletter Popup",
  },
  {
    id: "10",
    date: "2025-06-10",
    email: "hannah@example.com",
    source: "Facebook",
  },
];

const Newsletter: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Render the table */}
      <NewsletterTable newsletterData={dummyNewsletterData} />
    </div>
  );
};

export default Newsletter;
