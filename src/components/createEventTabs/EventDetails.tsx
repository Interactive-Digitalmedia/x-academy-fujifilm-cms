// EventDetails.tsx
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { getAmbassadors } from "@/api/ambassadors";

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
  const [ambassadorOptions, setAmbassadorOptions] = useState<any[]>([]);
  useEffect(() => {
    const fetchAmbassadors = async () => {
      const res = await getAmbassadors();
      if (res?.status === 200) {
        setAmbassadorOptions(res.data);
      }
    };

    fetchAmbassadors();
  }, []);

  useEffect(() => {
    if (Array.isArray(data?.tags)) {
      setSelectedTags(data.tags);
    }
  }, [data?.tags]);

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
    <div className="space-y-2 mt-[-25px]">
      <h2 className="text-base font-bold  mb-1">Event Details</h2>
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Event Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full placeholder:text-[15px] border rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
          placeholder="Photography Workshop"
          value={data.activityName || ""}
          onChange={(e) => setData({ ...data, activityName: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#818181] mb-2">
          Event Tag
        </label>

        {/* Selected Tags Display */}
        <div className="flex gap-2 flex-wrap px-2 py-1 rounded-md border  border-gray-300 bg-white shadow-sm mb-3">
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

        {/* Selectable Tag List */}
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
          <label className="block text-[#818181] text-sm font-medium mb-1 ">
            Event Type <span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select Event Type"
            selectedKeys={[data.activityType || ""]}
            onChange={(e) => setData({ ...data, activityType: e.target.value })}
            classNames={{
              trigger:
                "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
            }}
          >
            <SelectItem key="workshop">Workshop</SelectItem>
            <SelectItem key="event">Event</SelectItem>
            <SelectItem key="exhibition">Exhibition</SelectItem>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-[#818181] font-medium mb-1 ">
            Event Category <span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select Event Category"
            selectedKeys={[data.activityCategory || ""]}
            onChange={(e) =>
              setData({ ...data, activityCategory: e.target.value })
            }
            classNames={{
              trigger:
                "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
            }}
          >
            <SelectItem key="photography">Photography</SelectItem>
            <SelectItem key="videography">Videography</SelectItem>
          </Select>
        </div>

        <div className="w-full">
          <label className="block text-sm text-[#818181] font-medium mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="w-full appearance-none border border-gray-300 rounded-md px-4 py-2 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={data.startDate || ""}
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm text-[#818181] font-medium mb-1">
            End Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="w-full appearance-none border border-gray-300 rounded-md px-4 py-2 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={data.endDate || ""}
              onChange={(e) => setData({ ...data, endDate: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#818181] font-medium mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select event location"
            selectedKeys={data.location ? [data.location] : []}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            classNames={{
              trigger:
                "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
            }}
          >
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
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm text-[#818181] font-medium mb-1">
            Language
          </label>
          <Select
            placeholder="Select Language"
            selectedKeys={[data.language || ""]}
            onChange={(e) => setData({ ...data, language: e.target.value })}
            classNames={{
              trigger:
                "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
            }}
          >
            <SelectItem key="english">English</SelectItem>
            <SelectItem key="hindi">Hindi</SelectItem>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-[#818181] font-medium mb-1">
            Hosted By <span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select one or multiple ambassador or evangelist names"
            selectionMode="multiple"
            selectedKeys={new Set(data.ambassadorId || [])}
            onSelectionChange={(keys) => {
              if (keys === "all") return;
              const selected = Array.from(keys as Set<string>);
              setData({ ...data, ambassadorId: selected });
            }}
            isMultiline
            classNames={{
              trigger:
                "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
            }}
          >
            {ambassadorOptions.map((amb) => (
              <SelectItem key={amb._id} value={amb._id}>
                {amb.fullname || amb.userName}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm text-[#818181] font-medium mb-1">
            Pricing <span className="text-red-500">*</span>
          </label>
          <Select
            placeholder="Select event pricing"
            selectedKeys={[data.pricing || ""]}
            onChange={(e) => setData({ ...data, pricing: e.target.value })}
            classNames={{
              trigger:
                "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
            }}
          >
            <SelectItem key="free">Free</SelectItem>
            <SelectItem key="paid">Paid</SelectItem>
          </Select>
        </div>
        {data.pricing === "paid" && (
          <div>
            <label className="block text-sm text-[#818181] font-medium mb-1">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              placeholder="1000"
              value={data.amount || ""}
              onChange={(e) => setData({ ...data, amount: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
