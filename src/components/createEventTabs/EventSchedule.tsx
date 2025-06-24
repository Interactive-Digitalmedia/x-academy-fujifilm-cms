import { useEffect, useMemo, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Plus, Trash2 } from "lucide-react";

const days = [
  "Day 1 - Friday, May 16th 2025",
  "Day 2 - Saturday, May 17th 2025",
  "Day 3 - Sunday, May 18th 2025",
];

const blankSession = {
  dayTitle: "",
  title: "",
  speaker: "",
  startTime: "",
  endTime: "",
  bullets: "",
};

export default function EventSchedule({ data, setData }: any) {
  const [sessionBlocks, setSessionBlocks] = useState([{ ...blankSession }]);

  type SessionField =
    | "dayTitle"
    | "title"
    | "speaker"
    | "startTime"
    | "endTime"
    | "bullets";

    /* 1. Convert `data.schedule` -> sessionBlocks on mount / when data changes */
useEffect(() => {
  if (!data?.schedule?.length) return;

  const restored = data.schedule[0]?.sessions?.map((s: any) => ({
    dayTitle   : s.day,           // stored as plain `day` in DB
    title      : s.title,
    speaker    : s.speaker,
    startTime  : s.startTime,
    endTime    : s.endTime,
    bullets    : s.description,
  })) || [{ ...blankSession }];

  setSessionBlocks(restored);
}, [data?.schedule]);




    const handleFieldChange = (
      index: number,
      field: SessionField,
      value: string
    ) => {
      const updated = [...sessionBlocks];
      updated[index][field] = value;
      setSessionBlocks(updated);
    
      // Transform sessions into MongoDB schema format
      const formattedSessions = updated.map((session) => ({
        day: session.dayTitle,
        title: session.title,
        speaker: session.speaker,
        startTime: session.startTime,
        endTime: session.endTime,
        description: session.bullets,
      }));
    
      // Store in schema format
      setData({
        ...data,
        schedule: [{ sessions: formattedSessions }],
      });
    };

    const getTakenDays = (idx: number) =>
      sessionBlocks
        .filter((_, i) => i !== idx)          // all other blocks
        .map((s) => s.dayTitle)               // their chosen day
        .filter(Boolean);  
    

  const handleAddBlock = () => {
    setSessionBlocks([...sessionBlocks, { ...blankSession }]);
  };

  const handleRemoveBlock = (index: number) => {
    if (sessionBlocks.length === 1) return;
    const updated = [...sessionBlocks];
    updated.splice(index, 1);
    setSessionBlocks(updated);
  };

  // utils/dateRange.ts
  const buildDayList = (start: string, end: string): string[] => {
    if (!start || !end) return [];
  
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate > endDate) return [];
  
    const days: string[] = [];
    let cur = new Date(startDate);
  
    let dayIndex = 1;
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  
    while (cur <= endDate) {
      days.push(`Day ${dayIndex} - ${formatter.format(cur)}`);
      cur.setDate(cur.getDate() + 1);
      dayIndex++;
    }
  
    return days;
  };

  const dayOptions = useMemo(
    () => buildDayList(data.startDate, data.endDate),
    [data.startDate, data.endDate]
  );

  useEffect(() => {
    if (!dayOptions.length) return;
  
    setSessionBlocks((prev) =>
      prev.map((block) =>
        dayOptions.includes(block.dayTitle) ? block : { ...block, dayTitle: "" }
      )
    );
  }, [dayOptions]);
  

  return (
    <div className="space-y-2 mt-[-25px]">
      <h2 className="text-base font-bold  mb-1">Event Schedule</h2>

      {sessionBlocks.map((session, index) => (
        <div
          key={index}
          className="space-y-4 p-6 rounded-xl border bg-white relative"
        >
          {/* Remove Button (top right) */}
          {sessionBlocks.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveBlock(index)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition"
              title="Remove this session"
            >
              <Trash2 size={16} />
            </button>
          )}

          <div>
            <h2 className="text-sm font-bold mt-[-13px] mb-1">
              Add Schedule Item
            </h2>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Select Day
            </label>
            <Select
  placeholder={
    dayOptions.length ? "Select day" : "Choose start/end dates first"
  }
  isDisabled={!dayOptions.length}
  selectedKeys={session.dayTitle ? [session.dayTitle] : []}
  onChange={(e) => handleFieldChange(index, "dayTitle", e.target.value)}
  classNames={{
    trigger:
      "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
  }}
>
  {dayOptions.map((day) => (
    <SelectItem
      key={day}
      value={day}
      // disable if some OTHER block already picked this day
      isDisabled={getTakenDays(index).includes(day)}
    >
      {day}
    </SelectItem>
  ))}
</Select>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#818181] mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full placeholder:text-[15px] border rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
                placeholder="Session title"
                value={session.title}
                onChange={(e) =>
                  handleFieldChange(index, "title", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#818181] mb-1">
                Speaker/Presenter
              </label>
              <input
                type="text"
                className="w-full placeholder:text-[15px] border rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
                placeholder="Name of speaker or presenter"
                value={session.speaker}
                onChange={(e) =>
                  handleFieldChange(index, "speaker", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#818181] mb-1">
                Start Time
              </label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
                value={session.startTime}
                onChange={(e) =>
                  handleFieldChange(index, "startTime", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#818181] mb-1">
                End Time
              </label>
              <input
                type="time"
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
                value={session.endTime}
                onChange={(e) =>
                  handleFieldChange(index, "endTime", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Description
            </label>
            <textarea
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              placeholder="e.g. Overview, key learning points, exercises"
              rows={3}
              value={session.bullets}
              onChange={(e) =>
                handleFieldChange(index, "bullets", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddBlock}
          className="inline-flex items-center gap-2 rounded-md bg-[#1098F7] px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} strokeWidth={2} />
          Add Item
        </button>
      </div>
    </div>
  );
}
