import { Select, SelectItem, Button } from "@nextui-org/react";
import { useState, useRef } from "react";

const tagsList = [
  { name: "Event", color: "bg-purple-600" },
  { name: "Fashion", color: "bg-amber-500" },
  { name: "Street", color: "bg-blue-600" },
  { name: "Wildlife", color: "bg-emerald-700" },
  { name: "Portrait", color: "bg-pink-400" },
];

const titles = ["X - Ambassador", "X - Evangelist", "X - Creator"];

export default function PublicProfile({ data, setData }: any) {
  const [selectedTags, setSelectedTags] = useState<string[]>(data.tags || []);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    setData({ ...data, tags: updatedTags });
  };

  const removeTag = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    setData({ ...data, tags: updatedTags });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return alert("Only .jpg, .png, .svg files are allowed");
    }

    const url = URL.createObjectURL(file);
    if (type === "profile") {
      setData({ ...data, profilePic: url });
    } else {
      setData({ ...data, coverImage: url });
    }
  };

  const removeImage = (type: "profile" | "cover") => {
    if (type === "profile") {
      setData({ ...data, profilePic: "" });
    } else {
      setData({ ...data, coverImage: "" });
    }
  };

  return (
    <div className="space-y-3 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Public Profile</h2>

      {/* Name & Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            placeholder="John Doe"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Title
          </label>
          <Select
            placeholder="Select title"
            selectedKeys={data.title ? [data.title] : []}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            classNames={{
              trigger:
                "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
            }}
          >
            {titles.map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-2">
          Tags
        </label>
        <div className="flex gap-2 flex-wrap px-2 py-1 rounded-md border border-gray-300 bg-white shadow-sm mb-3">
          {selectedTags.map((tag) => {
            const tagColor =
              tagsList.find((t) => t.name === tag)?.color || "bg-gray-400";
            return (
              <span
                key={tag}
                className={`flex items-center gap-1 text-white text-sm px-3 py-1 rounded-md ${tagColor}`}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-white hover:text-red-200"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>

        <div className="flex gap-2 flex-wrap">
          {tagsList.map((tag) => (
            <button
              key={tag.name}
              type="button"
              onClick={() => toggleTag(tag.name)}
              disabled={selectedTags.includes(tag.name)}
              className={`px-3 py-1 rounded-md text-white text-sm font-medium ${tag.color} disabled:opacity-40`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Bio
        </label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm bg-white text-gray-800 placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
          placeholder="Write a short bio"
          value={data.bio || ""}
          onChange={(e) => setData({ ...data, bio: e.target.value })}
        />
      </div>

      {/* Location & Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Location
          </label>
          <input
            type="text"
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            placeholder="Mumbai"
            value={data.location || ""}
            onChange={(e) => setData({ ...data, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Date Joined
          </label>
          <input
            type="date"
            className="w-full border rounded-md px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            value={data.dateJoined || ""}
            onChange={(e) => setData({ ...data, dateJoined: e.target.value })}
          />
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Picture */}
        <div>
          <label className="text-sm font-medium mb-1 block">
            Profile Picture
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              value={data.profilePic || ""}
              onChange={(e) => setData({ ...data, profilePic: e.target.value })}
            />

            <Button
              variant="bordered"
              className="border-[#1098F7] text-[#1098F7] bg-white hover:bg-[#e6f4fe]"
              onClick={() => profileInputRef.current?.click()}
            >
              Add Image
            </Button>
          </div>
          <input
            type="file"
            ref={profileInputRef}
            accept="image/jpeg,image/jpg,image/png,image/svg+xml"
            onChange={(e) => handleFileChange(e, "profile")}
            className="hidden"
          />
          {data.profilePic && (
            <div className="relative inline-block mt-2">
              <img
                src={data.profilePic}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border"
              />
              <button
                onClick={() => removeImage("profile")}
                className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded-full hover:bg-opacity-70"
              >
                ×
              </button>
            </div>
          )}
          <p className="text-xs text-red-500 mt-1">
            Recommended: 1:1, min 500×500px
          </p>
        </div>

        {/* Cover Image */}
        <div>
          <label className="text-sm font-medium mb-1 block">Cover Image</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              value={data.coverImage || ""}
              onChange={(e) => setData({ ...data, coverImage: e.target.value })}
            />

            <Button
              variant="bordered"
              className="border-[#1098F7] text-[#1098F7] bg-white hover:bg-[#e6f4fe]"
              onClick={() => coverInputRef.current?.click()}
            >
              Add Image
            </Button>
          </div>
          <input
            type="file"
            ref={coverInputRef}
            accept="image/jpeg,image/jpg,image/png,image/svg+xml"
            onChange={(e) => handleFileChange(e, "cover")}
            className="hidden"
          />
          {data.coverImage && (
            <div className="relative mt-2">
              <img
                src={data.coverImage}
                alt="Cover Preview"
                className="w-full h-40 object-cover rounded-md border"
              />
              <button
                onClick={() => removeImage("cover")}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded hover:bg-opacity-70"
              >
                ×
              </button>
            </div>
          )}
          <p className="text-xs text-red-500 mt-1">
            Recommended: 1200×400px (3:1 ratio)
          </p>
        </div>
      </div>
    </div>
  );
}
