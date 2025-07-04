import React, { useState } from "react";

const EventSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(
    "Day 1 - Friday, May 16th 2025"
  );
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">Select Day</label>
        <input
          type="text"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Speaker/Presenter
          </label>
          <input
            type="text"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Daboo Ratnani"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="07:30 PM"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="07:30 PM"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 min-h-[80px]"
        />
      </div>
    </div>
  );
};

export default EventSchedule;
