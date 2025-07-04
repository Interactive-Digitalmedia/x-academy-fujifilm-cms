import { Switch } from "@nextui-org/react";
// import { useState } from 'react'
import { Select, SelectItem } from "@nextui-org/react";
import useGlobalStore from "@/state/GlobalState";
import { useEffect } from "react";

const managers = [
  "Riya Sharma",
  "Aman Verma",
  "John Joseph",
  "Sana Ali",
  "Kanishka Chandani",
];

export default function AdminControls({ data, setData }: any) {
  // Extra toggles stored locally unless added to schema
  // const [stopRegistrations, setStopRegistrations] = useState(true)
  // const [enableWaitlist, setEnableWaitlist] = useState(true)

  const { user } = useGlobalStore((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    console.log("here here", user);
  }, []);
  return (
    <div className="space-y-6 md:w-[420px] mt-[-25px]">
      <h2 className="text-base font-bold  mb-1">Admin Controls</h2>

      {user?.userRole !== "admin" && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Event Visibility</span>
          <Switch
            size="sm"
            isSelected={data.status === "publish"}
            onValueChange={(val) =>
              setData({ ...data, status: val ? "publish" : "draft" })
            }
            classNames={{
              base: [
                "w-[36px] h-[20px]",
                "rounded-full",
                "bg-gray-300",
                "data-[selected=true]:bg-[#1098F7]",
                "transition-colors",
              ].join(" "),
              thumb: [
                "w-4 h-4",
                "rounded-full",
                "bg-white",
                "shadow-md",
                "transition-transform",
                "translate-x-0",
                "data-[selected=true]:translate-x-[16px]",
              ].join(" "),
            }}
          />
        </div>
      )}
      {/* Event Visibility (local state only) */}

      {/* Featured Event (schema: isFeatured) */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Featured Event</span>
        <Switch
          size="sm"
          isSelected={data.isFeatured || false}
          onValueChange={(val) => setData({ ...data, isFeatured: val })}
          classNames={{
            base: [
              "w-[36px] h-[20px]",
              "rounded-full",
              "bg-gray-300",
              "data-[selected=true]:bg-[#1098F7]",
              "transition-colors",
            ].join(" "),
            thumb: [
              "w-4 h-4",
              "rounded-full",
              "bg-white",
              "shadow-md",
              "transition-transform",
              "translate-x-0",
              "data-[selected=true]:translate-x-[16px]",
            ].join(" "),
          }}
        />
      </div>

      {/* Stop Registrations */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Stop Registrations</span>
        <Switch
          size="sm"
          isSelected={data.stopRegistration || false}
          onValueChange={(val) => setData({ ...data, stopRegistration: val })}
          classNames={{
            base: [
              "w-[36px] h-[20px]",
              "rounded-full",
              "bg-gray-300",
              "data-[selected=true]:bg-[#1098F7]",
              "transition-colors",
            ].join(" "),
            thumb: [
              "w-4 h-4",
              "rounded-full",
              "bg-white",
              "shadow-md",
              "transition-transform",
              "translate-x-0",
              "data-[selected=true]:translate-x-[16px]",
            ].join(" "),
          }}
        />
      </div>

      {/* Enable Waitlist */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Enable Waitlist</span>
        <Switch
          size="sm"
          isSelected={data.enableWaitlist || false}
          onValueChange={(val) => setData({ ...data, enableWaitlist: val })}
          classNames={{
            base: [
              "w-[36px] h-[20px]",
              "rounded-full",
              "bg-gray-300",
              "data-[selected=true]:bg-[#1098F7]",
              "transition-colors",
            ].join(" "),
            thumb: [
              "w-4 h-4",
              "rounded-full",
              "bg-white",
              "shadow-md",
              "transition-transform",
              "translate-x-0",
              "data-[selected=true]:translate-x-[16px]",
            ].join(" "),
          }}
        />
      </div>

      {/* Spots Left Toggle */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Spots Left</span>
        <Switch
          size="sm"
          isSelected={data.pendingSeats > 0}
          onValueChange={(val) =>
            setData({
              ...data,
              pendingSeats: val
                ? data.pendingSeats > 0
                  ? data.pendingSeats
                  : 1
                : 0,
            })
          }
          classNames={{
            base: [
              "w-[36px] h-[20px]",
              "rounded-full",
              "bg-gray-300",
              "data-[selected=true]:bg-[#1098F7]",
              "transition-colors",
            ].join(" "),
            thumb: [
              "w-4 h-4",
              "rounded-full",
              "bg-white",
              "shadow-md",
              "transition-transform",
              "translate-x-0",
              "data-[selected=true]:translate-x-[16px]",
            ].join(" "),
          }}
        />
      </div>

      {/* Input if switch is ON */}
      {data.pendingSeats > 0 && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Pending Seats
          </label>
          <input
            type="number"
            min={1}
            placeholder="Enter a number"
            value={data.pendingSeats}
            onChange={(e) =>
              setData({ ...data, pendingSeats: Number(e.target.value) })
            }
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
          />
        </div>
      )}

      {/* Max Participants (schema: seatCount) */}
      <div>
        <label className="block text-sm font-medium  mb-1">
          Maximum Number of Participants
        </label>
        <input
          type="number"
          min={1}
          placeholder="Enter a number"
          value={data.seatCount || ""}
          onChange={(e) =>
            setData({ ...data, seatCount: Number(e.target.value) })
          }
          className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
        />
      </div>

      {/* Assign Event Manager */}
      <div>
        <label className="block text-sm font-medium  mb-1">
          Assign Event Manager
        </label>
        <Select
          placeholder="Select one or multiple"
          selectionMode="multiple"
          selectedKeys={new Set(data.assignedManagers || [])}
          onSelectionChange={(keys) =>
            setData({ ...data, assignedManagers: Array.from(keys) })
          }
          isMultiline
          classNames={{
            trigger:
              "border text-sm px-3 py-2 bg-white rounded-md shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500",
          }}
        >
          {managers.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
