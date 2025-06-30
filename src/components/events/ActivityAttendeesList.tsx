import { useEffect, useState } from "react";
import TypeIcon from "../Activity/TypeIcon";
import ActivityDialog from "./ActivityDialog";
import { getAttendeesByActivity } from "@/api/activity";
import { useParams } from "react-router-dom";

const ActivityAttendeesList = () => {
  const [participantCount, setParticipantCount] = useState(0);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { activityId } = useParams();

  useEffect(() => {
    if (!activityId) return;
    async function fetchAttendees() {
      try {
        const { totalAttendees, users } =
          await getAttendeesByActivity(activityId!);
        setParticipantCount(totalAttendees);
        setAttendees(users);
      } catch (err) {
        console.error("Failed to load attendees:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAttendees();
  }, [activityId]);

  return (
    <div className="card space-y-4 p-4">
      <h3 className="text-lg font-semibold">Booking Details</h3>
      <div className="space-y-4 text-sm">
        {/* Type */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <TypeIcon />
          </div>
          <div>
            <p className="text-xs text-gray-500">Number of Participants</p>
            <p>{loading ? "Loading..." : participantCount}</p>
          </div>
        </div>
        <div className="flex items-center pt-2">
          <div className="w-full">
            <ActivityDialog attendees={attendees} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAttendeesList;
