import React from "react";
import { CalendarDays, MapPin, Copy, Trash2, Download } from "lucide-react";
import { Blog } from "@/types";
import toast from "react-hot-toast";
import ChangeStatusPopover from "../Activity/ChangeStatusPopover";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import { deletelog } from "@/api/blogApi";

import { Button } from "@nextui-org/react";

type BlogEditMainCardProps = {
  data: Partial<Blog>;
  onDelete?: () => void;
};

const BlogEditMainCard: React.FC<BlogEditMainCardProps> = ({
  data,
  // onDelete,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleCopyLink = () => {
    const link = `${window.location.origin}/blogs/${data._id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Blog link copied!");
    });
  };
  const handleToggleStatus = (newStatus: "draft" | "published") => {
    try {
      toast.success(`Status changed to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (!data._id) {
        toast.error("Invalid blog ID.");
        return;
      }

      await deletelog(data._id); // api call
      toast.success("Blog deleted");
      navigate("/blogs");
    } catch (err) {
      toast.error("Failed to delete blog");
      console.error(err);
    }
  };

  const formattedDate = data.publishedDate
    ? new Date(data.publishedDate).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Date not set";

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
          src={data?.blogImage?.heroImage}
          alt={data?.blogImage?.description}
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="absolute bottom-4 left-4 z-10">
          {data?.tags?.[0] && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {data.tags[0]}
            </span>
          )}
          <h1 className="text-white font-bold text-2xl mt-2">{data.title}</h1>
        </div>
      </div>

      {/* ---------- Tag chips + action buttons ---------- */}
      <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {data?.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md"
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
            onClick={() => navigate(`/blogs/${data._id}`)}
          >
            Preview
          </Button>
          <ChangeStatusPopover
            currentStatus={(data?.status as "draft" | "published") ?? "draft"}
            onChange={handleToggleStatus}
          />
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600 border border-red-600 px-3 py-[5px] rounded-md text-sm"
          >
            <Trash2 className="w-4 h-4 inline-block mr-1" />
            Delete
          </button>
        </div>
      </div>

      {/* ---------- Date / location (if applicable) ---------- */}
      <div className="flex flex-wrap gap-10 text-sm text-gray-700">
        <div className="flex items-center gap-1 min-w-[150px]">
          <CalendarDays className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        {Array.isArray(data?.cta) && data.cta.length > 0 && (
          <div className="flex flex-wrap gap-2 min-w-[200px]">
            {data.cta.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                <MapPin className="w-4 h-4" />
                {item.text}
              </a>
            ))}
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Blog"
        description="Are you sure you want to delete this blog? This action is permanent."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        showReasonInput={true}
      />
    </div>
  );
};

export default BlogEditMainCard;
