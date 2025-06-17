import React from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Copy,
  Download,
} from "lucide-react";

const MainCard: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 mb-6">
      {/* Status Label */}
      <div className="text-xs font-medium text-gray-700 bg-gray-200 inline-block px-3 py-1 rounded-full mb-2">
        Concluded
      </div>

      {/* Cover Image */}
      <div className="relative w-full h-[150px] rounded-lg overflow-hidden mb-4">
        <img
          src="/banner/eventConcluded.png"
          alt="Event"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="absolute bottom-4 left-4 z-10">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Workshop
          </span>
          <h1 className="text-white font-bold text-3xl mt-2">
            Know Your Fuji Gear Better
          </h1>
        </div>
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Tags and Buttons Row */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        {/* Tags */}
        <div className="flex gap-2">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
            Street
          </span>
          <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-md">
            Wildlife
          </span>
          <span className="bg-pink-500 text-white text-xs font-medium px-2 py-1 rounded-md">
            Portrait
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="border p-2 rounded-md">
            <Copy className="w-4 h-4" />
          </button>
          <button className="border p-2 rounded-md">
            <Download className="w-4 h-4" />
          </button>
          <button className="bg-[#1098F7] text-white text-sm px-4 py-2 rounded-md">
            Change Status
          </button>
        </div>
      </div>

      {/* Info Row */}
      <div className="flex flex-wrap gap-10 text-sm text-gray-700">
        {/* Date and Time Column */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>Mon, 3 Mar</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>07:30 PM Onwards</span>
          </div>
        </div>

        {/* Partner and Location Column */}
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span className="font-medium">Tarun Khiwal</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="underline">JW Marriot, Bengaluru</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
