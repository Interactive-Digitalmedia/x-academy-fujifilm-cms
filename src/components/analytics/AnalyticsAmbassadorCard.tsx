import React from "react";
import { ChevronRight } from "lucide-react";

// Inside JSX
<ChevronRight className="w-4 h-4 text-gray-400" />;

interface AnalyticsAmbassadorCardProps {
  name: string;
  totalEvents: number;
  lastEventDate: string;
  avatar: string;
}

export const AnalyticsAmbassadorCard: React.FC<
  AnalyticsAmbassadorCardProps
> = ({ name, totalEvents, lastEventDate, avatar }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-gray-500">
            Total Events: {totalEvents} | Last Event: {lastEventDate}
          </div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  );
};
