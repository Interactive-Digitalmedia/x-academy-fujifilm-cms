// components/partners/PublicProfile.tsx
import {
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
  DatePicker,
} from "@nextui-org/react";
import { useState } from "react";

const tagsList = [
  { name: "Fashion", color: "bg-yellow-400" },
  { name: "Street", color: "bg-blue-500" },
  { name: "Wildlife", color: "bg-green-600" },
  { name: "Portrait", color: "bg-pink-500" },
];

const titles = ["X - Ambassador", "X - Evangelist", "X - Creator"];

export default function PublicProfile({ data, setData }: any) {
  const [selectedTags, setSelectedTags] = useState<string[]>(data.tags || []);

  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    setData({ ...data, tags: updatedTags });
  };

  return (
    <div className="space-y-6">
      {/* Name and Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Name</label>
          <Input
            variant="bordered"
            placeholder="John Doe"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Title</label>
          <Select
            variant="bordered"
            placeholder="Select title"
            selectedKeys={data.title ? [data.title] : []}
            onChange={(e) => setData({ ...data, title: e.target.value })}
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
        <label className="text-sm font-medium mb-1 block">Tag</label>
        <div className="flex gap-2 flex-wrap">
          {tagsList.map((tag) => {
            const isSelected = selectedTags.includes(tag.name);
            return (
              <button
                key={tag.name}
                onClick={() => toggleTag(tag.name)}
                type="button"
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${tag.color} ${
                  isSelected ? "" : "opacity-50"
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="text-sm font-medium mb-1 block">Bio</label>
        <Textarea
          variant="bordered"
          placeholder="Write a short bio"
          value={data.bio || ""}
          onChange={(e) => setData({ ...data, bio: e.target.value })}
        />
      </div>

      {/* Location and Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Location</label>
          <Input
            variant="bordered"
            placeholder="Mumbai"
            value={data.location || ""}
            onChange={(e) => setData({ ...data, location: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Date Joined</label>
          <Input
            variant="bordered"
            type="date"
            value={data.dateJoined || ""}
            onChange={(e) => setData({ ...data, dateJoined: e.target.value })}
          />
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Profile Picture
          </label>
          <div className="flex gap-2">
            <Input
              variant="bordered"
              placeholder="Image URL"
              value={data.profilePic || ""}
              onChange={(e) => setData({ ...data, profilePic: e.target.value })}
            />
            <Button color="primary">Add Image</Button>
          </div>
          <p className="text-xs text-red-500 mt-1">
            Recommended: 1:1, min 500×500px
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Cover Image</label>
          <div className="flex gap-2">
            <Input
              variant="bordered"
              placeholder="Image URL"
              value={data.coverImage || ""}
              onChange={(e) => setData({ ...data, coverImage: e.target.value })}
            />
            <Button color="primary">Add Image</Button>
          </div>
          <p className="text-xs text-red-500 mt-1">
            Recommended: 1200×400px (3:1 ratio)
          </p>
        </div>
      </div>
    </div>
  );
}
