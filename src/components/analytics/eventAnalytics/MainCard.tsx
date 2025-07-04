import React from "react";
import { CalendarDays, Clock, MapPin, User, Download } from "lucide-react";

const MainCard: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-200">
      {/* Status Label */}
      <div className="text-sm font-medium text-gray-700 bg-gray-200 inline-block px-3 py-1 rounded-full mb-3">
        Concluded
      </div>

      {/* Cover Image */}
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden mb-4">
        <img
          src="/banner/eventConcluded.png"
          alt="Event"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Workshop Tag */}
      <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-md mb-2 inline-block">
        Workshop
      </span>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mt-0 mb-2">
        Know Your Fuji Gear Better
      </h1>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
          Street
        </span>
        <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-md">
          Wildlife
        </span>
        <span className="bg-pink-400 text-white text-xs font-medium px-2 py-1 rounded-md">
          Portrait
        </span>
      </div>

      {/* Event Info */}
      <div className="flex flex-col gap-2 text-sm text-gray-700 -mb-9">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          <span>Mon, 3 Mar</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>07:30 PM Onwards</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <img
            src="/images/ambassadors/ambassadorsImg.png"
            alt="Tarun Khiwal"
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="font-medium">Tarun Khiwal</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="underline font-medium">JW Marriot, Bengaluru</span>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-gray-100 text-sm text-gray-800 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200">
          <Download className="w-4 h-4" />
          Download Attendee List
        </button>
      </div>
    </div>
  );
};

export default MainCard;
