// src/components/analytics/TrendingAmbassadors.tsx

import React from "react";
import { AnalyticsAmbassadorCard } from "./AnalyticsAmbassadorCard";

interface Ambassador {
  id: number;
  name: string;
  totalEvents: number;
  lastEventDate: string;
  avatar: string;
}

interface TrendingAmbassadorsProps {
  ambassadors: Ambassador[];
}

const TrendingAmbassadors: React.FC<TrendingAmbassadorsProps> = ({
  ambassadors,
}) => {
  return (
    <div className="space-y-4">
      {ambassadors.map((ambassador) => (
        <AnalyticsAmbassadorCard
          key={ambassador.id}
          name={ambassador.name}
          totalEvents={ambassador.totalEvents}
          lastEventDate={ambassador.lastEventDate}
          avatar={ambassador.avatar}
        />
      ))}
    </div>
  );
};

export default TrendingAmbassadors;
