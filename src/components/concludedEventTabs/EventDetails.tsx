import { useState, useRef, useEffect } from "react";

const allTags = [
  { name: "Event", color: "bg-purple-600" },
  { name: "Fashion", color: "bg-amber-500" },
  { name: "Street", color: "bg-blue-600" },
  { name: "Wildlife", color: "bg-emerald-700" },
  { name: "Portrait", color: "bg-pink-400" },
];

const ambassadors = [
  "Ritika",
  "Tarun Khiwal",
  "Rohit Vohra",
  "Kanishka",
  "Pravin Talan",
  "Sean Paul",
];

export default function EventDetails({ data, setData }: any) {
  const [selectedTags, setSelectedTags] = useState<string[]>(data.tags || []);
  const [hostDropdownOpen, setHostDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setHostDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagToggle = (tag: string) => {
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

  return (
    <div className="space-y-5 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">Event Name</label>
        <input
          type="text"
          placeholder="Event Name xyz"
          value={data.title || ""}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Event Tag</label>

        <div className="flex gap-2 flex-wrap p-2 rounded-md bg-gray-100 mb-3">
          {selectedTags.map((tag) => {
            const tagColor =
              allTags.find((t) => t.name === tag)?.color || "bg-gray-400";
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
          {allTags.map((tag) => (
            <button
              key={tag.name}
              type="button"
              onClick={() => handleTagToggle(tag.name)}
              disabled={selectedTags.includes(tag.name)}
              className={`px-3 py-1 rounded-md text-white text-sm font-medium ${tag.color} disabled:opacity-40`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Type</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={data.type || ""}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option value="" disabled>
              Select event type
            </option>
            <option value="workshop">Workshop</option>
            <option value="eventr">Event</option>
            <option value="exhibition">Exhibition</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Event Category
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={data.category || ""}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="" disabled>
              Select event category
            </option>
            <option value="photography">Photography</option>
            <option value="videography">Videography</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            value={data.startDateTime || ""}
            onChange={(e) =>
              setData({ ...data, startDateTime: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            value={data.endDateTime || ""}
            onChange={(e) => setData({ ...data, endDateTime: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={data.location || ""}
            onChange={(e) => setData({ ...data, location: e.target.value })}
          >
            <option value="" disabled>
              Select event location
            </option>
            {[
              "Ahmedabad",
              "Bangalore",
              "Chandigarh",
              "Chennai",
              "Delhi",
              "Hyderabad",
              "Kochi",
              "Kolkata",
              "Mumbai",
              "Pune",
            ].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={data.language || ""}
            onChange={(e) => setData({ ...data, language: e.target.value })}
          >
            <option value="" disabled>
              Select Language
            </option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>

        {/* Hosted By: Styled Dropdown with Multi Select */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium mb-1">Hosted By</label>
          <div
            onClick={() => setHostDropdownOpen(!hostDropdownOpen)}
            className="w-full border rounded px-3 py-2 cursor-pointer bg-white"
          >
            {data.ambassadors && data.ambassadors.length > 0
              ? data.ambassadors.join(", ")
              : "Select hosts"}
          </div>

          {hostDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full border rounded bg-white shadow max-h-48 overflow-y-auto">
              {ambassadors.map((name) => (
                <div
                  key={name}
                  onClick={() => {
                    const updated = data.ambassadors?.includes(name)
                      ? data.ambassadors.filter((a: string) => a !== name)
                      : [...(data.ambassadors || []), name];
                    setData({ ...data, ambassadors: updated });
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={data.ambassadors?.includes(name)}
                    readOnly
                  />
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pricing</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={data.pricing || ""}
            onChange={(e) => setData({ ...data, pricing: e.target.value })}
          >
            <option value="" disabled>
              Select event pricing
            </option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>
    </div>
  );
}
