import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "@/types";
import { badgeColors } from "@/assets/badgeColors";
import { EllipsisVertical } from "lucide-react";

function getColorForString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % badgeColors.length;
  return badgeColors[index];
}

type Props = {
  demoActivities: Activity[];
  activeTab?: "week" | "month";
};
const ActivityGrid: React.FC<Props> = ({ demoActivities, activeTab }) => {
  const navigate = useNavigate();

  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const filtered = demoActivities.filter((activity) => {
      const activityDate = new Date(activity.startDateTime);

      if (!activeTab) return true; // ✅ Show all if no tab selected

      if (activeTab === "week") {
        return activityDate >= startOfWeek && activityDate <= endOfWeek;
      }

      if (activeTab === "month") {
        return (
          activityDate.getMonth() === currentMonth &&
          activityDate.getFullYear() === currentYear
        );
      }

      return false;
    });

    setFilteredActivities(filtered.slice(0, 15));
  }, [activeTab, demoActivities]);

  function formatToShortDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const handleActivityClick = (activity: Activity) => {
    const slug = slugify(activity.title);
    navigate(`/events/${slug}`, { state: { activity } });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.map((activity, i) => {
          const badgeColor = getColorForString(activity.title);

          return (
            <div
              key={i}
              className="card overflow-hidden rounded-2xl bg-card shadow-md"
              onClick={() => handleActivityClick(activity)}
            >
              {/* Image and Badge */}
              <div className="relative w-full p-3">
                <div className="w-58 aspect-square overflow-hidden rounded-[12px]">
                  {/* <div className='aspect-square w-48'> */}
                  <img
                    src={activity?.bannerImage}
                    alt={activity?.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className={`tag absolute left-5 top-5 ${badgeColor}`}>
                  {activity.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 pt-1">
                <div className="mb-1 flex items-center justify-between">
                  <div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium mb-2
            ${
              activity.status === "draft"
                ? "bg-orange-100 text-orange-600"
                : activity.status === "concluded"
                  ? "bg-gray-300 text-gray-800"
                  : ""
            }
          `}
                    >
                      {activity?.status}
                    </span>
                    <h3 className="text-sm font-semibold">{activity?.title}</h3>
                    <p className="mb-2 text-sm">
                      {formatToShortDate(activity?.startDateTime)} |{" "}
                      {activity?.ambassadorName}
                    </p>
                    <p className="mb-2 text-sm">{activity?.location}, India</p>
                  </div>
                  {/* <button className='normal-btn'>Book</button> */}
                  <EllipsisVertical />
                </div>
                <p className="card-about line-clamp-2 text-xs">
                  {activity?.about?.about}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Discover More button - only show on small screens */}
      <div className="mt-8 flex justify-center md:hidden">
        <button className="w-full max-w-sm rounded-xl bg-[#0094FF] px-6 py-2 text-sm font-medium text-white">
          Discover More
        </button>
      </div>
    </>
  );
};
export default ActivityGrid;
