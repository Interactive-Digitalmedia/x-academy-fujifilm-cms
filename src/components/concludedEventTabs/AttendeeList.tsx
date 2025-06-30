import React, { useEffect, useState } from "react";
import { AttendeeTable, Attendee } from "./AttendeeTable";

export default function AttendeeList() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/activity-booking/getAttendees/684ff27da735f2c7cf7c501e"
        );

        const data = await res.json();

        // ✅ check if backend returned a valid array
        if (!res.ok || !Array.isArray(data)) {
          throw new Error(data.message || "Invalid response from server");
        }

        const formatted: Attendee[] = data.map((item: any, index: number) => ({
          sno: index + 1,
          name: item.userId?.fullName || "Unknown",
          date: new Date(item.bookingDate).toLocaleDateString(),
          status: formatStatus(item.paymentStatus),
          seats: item.numberOfSeats || 1,
        }));

        setAttendees(formatted);
      } catch (err: any) {
        console.error("Failed to fetch attendees:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  const formatStatus = (status: string): Attendee["status"] => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
      default:
        return "Pending";
    }
  };

  if (loading) return <div className="p-4">Loading attendees...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <AttendeeTable attendees={attendees} />
    </div>
  );
}
