import React from "react";
import {
  ChevronLeft,
  Headset,
  Zap,
  MoreVertical,
  Search,
  Bell,
  History,
  ScanLine,
} from "lucide-react";

const QRScannerPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-center z-10">
        <button>
          <ChevronLeft size={28} />
        </button>
        <div className="flex space-x-4">
          <button>
            <Headset size={24} />
          </button>
          <button>
            <Zap size={24} />
          </button>
          <button>
            <MoreVertical size={24} />
          </button>
        </div>
      </div>

      {/* Camera Background (placeholder for now) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/your-camera-placeholder.jpg" // Replace with live camera or blur background
          alt="camera"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* QR Scanner Frame */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-72 h-72 border-4 border-white rounded-lg relative">
          {/* You can customize this with corner brackets later */}
        </div>
      </div>

      {/* Search input */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-[80%] z-10">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search ticket ID"
            className="w-full bg-white/10 text-white pl-10 pr-4 py-2 rounded-2xl border border-white/20 placeholder-gray-300"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] flex justify-around py-3 border-t border-white/10 z-10">
        <button className="flex flex-col items-center text-white">
          <img src="/banner/icons/home.svg" alt="Home" className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button className="flex flex-col items-center text-white">
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center text-white">
          <ScanLine size={24} />
          <span className="text-xs mt-1">Scan</span>
        </button>
        <button className="flex flex-col items-center text-white">
          <Bell size={24} />
          <span className="text-xs mt-1">Alerts</span>
        </button>
        <button className="flex flex-col items-center text-white">
          <History size={24} />
          <span className="text-xs mt-1">History</span>
        </button>
      </div>
    </div>
  );
};

export default QRScannerPage;
