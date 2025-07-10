import React, { useState } from "react";
import {
  CalendarDays,
  // Clock,
  MapPin,
  // User,
  Copy,
  Download,
  Trash2,
} from "lucide-react";
import { Activity } from "@/types";
import toast from "react-hot-toast";
import { deleteActivity } from "@/api/activity";
import ConfirmationModal from "../ConfirmationModal";
import ChangeStatusPopover from "../Activity/ChangeStatusPopover";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

type MainCardProps = {
  data: Activity;
  onStatusChange?: (newStatus: "draft" | "published") => void;
  onDeleteSuccess?: () => void;
};

const MainCard: React.FC<MainCardProps> = ({ data, onStatusChange }) => {
  /* ---------- Helpers ---------- */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const formattedDate = new Date(data?.startDate).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const navigate = useNavigate();

  // give each tag a repeat-safe colour
  const colourPool = [
    "bg-[#2073F0]",
    "bg-[#006C51]",
    "bg-[#FF576D]",
    "bg-[#FFA928]",
    "bg-[#4BCFFF]",
    "bg-[#8847FF]",
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Link copied");
    });
  };
  const handleDelete = async () => {
    try {
      await deleteActivity(data._id);
      toast.success("Activity deleted");
      navigate("/events");
    } catch (err) {
      toast.error("Failed to delete activity");
      console.error(err);
    }
  };

  const handleToggleStatus = (newStatus: "draft" | "published") => {
    try {
      onStatusChange?.(newStatus);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 mb-6">
      {/* ---------- Status label ---------- */}
      <div className="mb-2">
        {data?.status === "draft" ? (
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
            Draft
          </span>
        ) : (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
            Published
          </span>
        )}
      </div>

      {/* ---------- Cover image ---------- */}
      <div className="relative w-full h-[240px] rounded-lg overflow-hidden mb-4">
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
          <button className="border p-2 rounded-md" onClick={handleCopyLink}>
            <Copy className="w-4 h-4" />
          </button>
          <button className="border p-2 rounded-md">
            <Download className="w-4 h-4" />
          </button>
          <Button
            size="sm"
            color="primary"
            className="bg-[#1098F7] text-white"
            onClick={() => navigate(`/events/${data._id}`)}
          >
            Preview
          </Button>
          <ChangeStatusPopover
            currentStatus={data?.status}
            onChange={handleToggleStatus}
          />
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600 border border-red-600 px-3 py-2 rounded-md text-sm"
          >
            <Trash2 className="w-4 h-4 inline-block mr-1" />
            Delete
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
          {/* <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{data.schedule[0].sessions[0].startTime}</span>
          </div> */}
        </div>

        {/* Host / location – adjust host later if needed */}
        <div className="flex flex-col gap-1 min-w-[200px]">
          {/* <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span className="font-medium">{data.ambassadorId}</span>
          </div> */}
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="underline">{data?.location}</span>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Ambassador"
        description="Are you sure you want to delete this ambassador? This action is permanent."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        showReasonInput={true}
      />
    </div>
  );
};

export default MainCard;
