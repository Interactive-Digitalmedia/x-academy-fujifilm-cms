import React from "react";

const EventAttendanceCard: React.FC = () => {
  const total = 100;

  const stats = [
    {
      label: "Tickets Sold",
      value: 86,
      color: "#70C1FA",
    },
    {
      label: "Attendees",
      value: 66,
      color: "#85D99D",
    },
    {
      label: "Cancellations",
      value: 8,
      color: "#FD6679",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <h2 className="text-sm font-medium text-gray-600 mb-1">
        Event Attendance Rate
      </h2>

      <div className="space-y-1">
        {stats.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{item.label}</span>
              <span>
                {item.value}/{total}
              </span>
            </div>
            <div className="w-full h-7 bg-gray-100 rounded-md overflow-hidden">
              <div
                className="h-full rounded-md"
                style={{
                  width: `${(item.value / total) * 100}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventAttendanceCard;
