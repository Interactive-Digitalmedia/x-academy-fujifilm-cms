import * as React from "react";
import AnalyticsCards from "@/components/analytics/AnalyticsCards";
import { AnalyticsEventTable } from "@/components/analytics/AnalyticsEventTable";
import { dummyAnalyticsEventData } from "@/assets/dummyAnalyticsEventData";
import TrendingAmbassadors from "@/components/analytics/TrendingAmbassadors";
import { dummyTrendingAmbassadorsData } from "@/assets/dummyTrendingAmbassadorsData";
import AttendanceRateChart from "@/components/analytics/AttendanceRateChart";
import RevenueByCityChart from "@/components/analytics/RevenueByCityChart";

interface AnalyticsProps {}

const Analytics: React.FunctionComponent<AnalyticsProps> = () => {
  return (
    <div className="space-y-6">
      {/* cards */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Overview</h2>
        <AnalyticsCards />
      </div>

      {/* attendance rate chart */}

      <div className="bg-white rounded-xl  shadow p-6">
        <AttendanceRateChart />
      </div>

      {/* all events table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">All Events</h2>
        <AnalyticsEventTable events={dummyAnalyticsEventData} />
      </div>

      {/* trending ambassadors and top cities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trending Ambassadors */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Trending Ambassadors
          </h2>
          <TrendingAmbassadors ambassadors={dummyTrendingAmbassadorsData} />
        </div>

        {/* Top Revenue-Generating Cities */}
        <div className="bg-white rounded-xl h-[300px] shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Top Revenue-Generating Cities
          </h2>
          <RevenueByCityChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
