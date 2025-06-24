import React from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Copy,
  Download,
} from "lucide-react";
import { Activity } from "@/types";
import DeleteEventButton from "../events/DeleteEventButton";

type MainCardProps = {
data : Activity,
onStatusUpdate: (newStatus: "draft" | "published") => void | Promise<void>;
};

type Status = "draft" | "published" ;

const statusLabel: Record<Status, string> = {
  draft: "Draft",
  published: "Published",
};


const MainCard: React.FC<MainCardProps> = ({
data, onStatusUpdate
}) => {
  /* ---------- Helpers ---------- */
  const formattedDate = new Date(data?.startDate).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  // give each tag a repeat-safe colour
  const colourPool = [
    "bg-[#2073F0]",
    "bg-[#006C51]",
    "bg-[#FF576D]",
    "bg-[#FFA928]",
    "bg-[#4BCFFF]",
    "bg-[#8847FF]",
  ];

  const nextStatus: Status = status === "draft" ? "published" : "draft";

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 mb-6">
      {/* ---------- Status label ---------- */}
      <div className="text-xs font-medium text-gray-700 bg-gray-200 inline-block px-3 py-1 rounded-full mb-2 capitalize">
        {data?.status}
      </div>

      {/* ---------- Cover image ---------- */}
      <div className="relative w-full h-[150px] rounded-lg overflow-hidden mb-4">
        <img
          src={data?.heroImage}
          alt="Event hero"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-black opacity-30" />
        {/* You can make title/type dynamic later if you like */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {data?.activityType}
          </span>
          <h1 className="text-white font-bold text-3xl mt-2">
            {data?.activityName}
          </h1>
        </div>
      </div>

      {/* ---------- Tag chips + action buttons ---------- */}
      <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {data?.tags?.map((tag, i) => (
            <span
              key={tag}
              className={`text-white text-xs font-medium px-2 py-1 rounded-md ${
                colourPool[i % colourPool.length]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
        <DeleteEventButton activityId={data._id} />
          <button className="border p-2 rounded-md">
            <Copy className="w-4 h-4" />
          </button>
          <button className="border p-2 rounded-md">
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onStatusUpdate(nextStatus)}
            className="bg-[#1098F7] text-white text-sm px-4 py-2 rounded-md"
          >
            Change&nbsp;Status
          </button>
        </div>
      </div>

      {/* ---------- Date / time / location ---------- */}
      <div className="flex flex-wrap gap-10 text-sm text-gray-700">
        {/* Date / time */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>07&nbsp;: 30&nbsp;PM&nbsp;Onwards</span>
          </div>
        </div>

        {/* Host / location – adjust host later if needed */}
        <div className="flex flex-col gap-1 min-w-[200px]">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span className="font-medium">Tarun Khiwal</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="underline">{data?.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
