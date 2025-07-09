import React, { useState } from "react";
import { ChevronLeft, Headset, Zap, MoreVertical } from "lucide-react";

type Status = "success" | "failed" | "retry";

const iconMap: Record<Status, { src: string; alt: string }> = {
  success: {
    src: "/banner/icons/tick.svg",
    alt: "Success Tick",
  },
  failed: {
    src: "/banner/icons/failed.svg",
    alt: "Failed Cross",
  },
  retry: {
    src: "/banner/icons/retry.svg",
    alt: "Retry Icon",
  },
};

const TicketConfirmation: React.FC = () => {
  const [status, setStatus] = useState<Status>("success");
  const { src, alt } = iconMap[status];

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-start px-4 pt-16">
      {/* Top Navbar Icons */}
      <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-center z-10">
        {/* Back Button */}
        <button className="text-white">
          <ChevronLeft size={24} />
        </button>

        {/* Right Side Icons */}
        <div className="flex space-x-4">
          <button className="text-white">
            <Headset size={24} />
          </button>
          <button className="text-white">
            <Zap size={24} />
          </button>
          <button className="text-white">
            <MoreVertical size={24} />
          </button>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setStatus("success")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            status === "success" ? "bg-green-600" : "bg-gray-700"
          }`}
        >
          Success
        </button>
        <button
          onClick={() => setStatus("failed")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            status === "failed" ? "bg-red-600" : "bg-gray-700"
          }`}
        >
          Failed
        </button>
        <button
          onClick={() => setStatus("retry")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            status === "retry" ? "bg-yellow-500 text-black" : "bg-gray-700"
          }`}
        >
          Retry
        </button>
      </div>

      {/* Ticket Card */}
      <div className="bg-[#1C1C1E] rounded-2xl w-full max-w-md shadow-lg py-6 px-4 relative">
        <div className="flex flex-col items-center space-y-4">
          {/* Icon */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={src} alt={alt} className="w-26 h-26 rounded-full p-1" />
            </div>
          </div>

          {/* Booking Info */}
          <div className="text-center">
            <p className="text-sm text-gray-300">BOOKING ID - 2383012394</p>
            <p className="text-sm text-gray-300">GROUP ENTRY - 3 Attendees</p>
          </div>

          <div className="w-full border-t border-gray-700 my-2" />

          {/* Details */}
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-400">NAME</span> - Jatin Jakhar
            </p>
            <p>
              <span className="text-gray-400">EMAIL</span> - sample@gmail.com
            </p>
            <p>
              <span className="text-gray-400">TICKET ID</span> - #XYZABC9823
            </p>
            <p>
              <span className="text-gray-400">EVENT</span> - Visual Alchemy And
              Fujifilm
            </p>
            <p>
              <span className="text-gray-400">DATE</span> - Monday, April 28th
              2025
            </p>
            <p>
              <span className="text-gray-400">CHECK-IN TIME</span> - 07:26 PM
            </p>
            <p>
              <span className="text-gray-400">LOCATION</span> - BENGALURU
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="mt-6 w-[95%] sm:w-[30%] py-2 rounded-full text-sm font-semibold bg-[#1098F7] text-white">
        {status === "failed" ? "Try Again" : "Continue"}
      </button>
    </div>
  );
};

export default TicketConfirmation;
