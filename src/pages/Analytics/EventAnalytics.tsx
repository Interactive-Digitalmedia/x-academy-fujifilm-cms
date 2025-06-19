import React from "react";
import MainCard from "@/components/analytics/eventAnalytics/MainCard";
import EventAttendanceCard from "@/components/analytics/eventAnalytics/EventAttendaceCard";
import { LineChart, LayoutList } from "lucide-react";

const EventAnalytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-2 space-y-6">
      <MainCard />

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Attendance Card */}
        <EventAttendanceCard />

        {/* Right: Revenue and Waitlist Cards */}
        <div className="flex flex-col gap-4 h-full justify-between">
          {/* Revenue Collected */}
          <div className="bg-white rounded-xl shadow w-full h-[100px] flex items-center justify-between px-4 py-3">
            <div>
              <h2 className="text-sm font-medium text-gray-600 mb-1">
                Total Revenue Generated
              </h2>
              <p className="text-2xl font-bold text-black">₹6,46,520</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <LineChart className="text-green-500 w-5 h-5" />
            </div>
          </div>

          {/* Total Waitlisted */}
          <div className="bg-white rounded-xl shadow w-full h-[100px] flex items-center justify-between px-4 py-3">
            <div>
              <h2 className="text-sm font-medium text-gray-600 mb-1">
                Total Waitlisted
              </h2>
              <p className="text-2xl font-bold text-black">43</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <LayoutList className="text-purple-500 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;
