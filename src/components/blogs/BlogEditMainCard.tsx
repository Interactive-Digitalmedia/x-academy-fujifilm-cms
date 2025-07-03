import React from "react";
import { CalendarDays, MapPin, Copy, Trash2 } from "lucide-react";
import { Blog } from "@/types";
import toast from "react-hot-toast";

type BlogEditMainCardProps = {
  data: Partial<Blog>;
  onDelete?: () => void;
};

const BlogEditMainCard: React.FC<BlogEditMainCardProps> = ({
  data,
  onDelete,
}) => {
  const handleCopyLink = () => {
    const link = `${window.location.origin}/blogs/${data._id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Blog link copied!");
    });
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
      <div className="text-xs font-medium text-gray-700 bg-gray-200 inline-block px-3 py-1 rounded-full mb-2 capitalize">
        {data?.status}
      </div>

      {/* ---------- Cover image ---------- */}
      <div className="relative w-full h-[150px] rounded-lg overflow-hidden mb-4">
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
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-600 border border-red-600 px-3 py-2 rounded-md text-sm"
            >
              <Trash2 className="w-4 h-4 inline-block mr-1" />
              Delete
            </button>
          )}
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
    </div>
  );
};

export default BlogEditMainCard;
