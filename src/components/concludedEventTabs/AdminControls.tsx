import { useEffect } from "react";
import useGlobalStore from "@/state/GlobalState";
import { Select, SelectItem } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";

const managers = [
  "Riya Sharma",
  "Aman Verma",
  "John Joseph",
  "Sana Ali",
  "Kanishka Chandani",
];

export default function AdminControls({ data, setData }: any) {
  const { user } = useGlobalStore((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    console.log("Admin User:", user);
  }, []);

  return (
    <div className="space-y-4 p-4 w-full max-w-md ">
      <h2 className="text-lg font-semibold mb-2">Admin Controls</h2>

      {user?.userRole !== "admin" && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Event Visibility</label>
          <Switch
            color="secondary"
            isSelected={data.status === "publish"}
            onValueChange={(val) =>
              setData({ ...data, status: val ? "publish" : "draft" })
            }
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Featured Event</label>
        <Switch
          color="secondary"
          isSelected={data.isFeatured || false}
          onValueChange={(val) => setData({ ...data, isFeatured: val })}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Stop Registrations</label>
        <Switch
          color="secondary"
          isSelected={data.stopRegistration || false}
          onValueChange={(val) => setData({ ...data, stopRegistration: val })}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Enable Waitlist</label>
        <Switch
          color="secondary"
          isSelected={data.enableWaitlist || false}
          onValueChange={(val) => setData({ ...data, enableWaitlist: val })}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Spots Left</label>
        <Switch
          color="secondary"
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
        />
      </div>

      {data.pendingSeats > 0 && (
        <input
          type="number"
          min={1}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter a number"
          value={String(data.pendingSeats)}
          onChange={(e) =>
            setData({ ...data, pendingSeats: Number(e.target.value) })
          }
        />
      )}

      <div>
        <label className="text-sm font-medium mb-1 block">
          Maximum Number of Participants
        </label>
        <input
          type="number"
          min={1}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter a number"
          value={String(data.seatCount || "")}
          onChange={(e) =>
            setData({ ...data, seatCount: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">
          Assign Event Manager
        </label>
        <Select
          placeholder="Select one or multiple"
          selectionMode="multiple"
          selectedKeys={new Set(data.assignedManagers || [])}
          onSelectionChange={(keys) =>
            setData({ ...data, assignedManagers: Array.from(keys) })
          }
          classNames={{
            trigger: "w-full border rounded px-3 py-2 text-sm bg-white",
            base: "w-full",
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
