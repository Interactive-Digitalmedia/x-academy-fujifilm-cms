import { Switch, Input } from '@nextui-org/react'
import { useState } from 'react'

export default function AdminControls({ data, setData }: any) {
  // Extra toggles stored locally unless added to schema
  const [visibility, setVisibility] = useState(true)
  const [stopRegistrations, setStopRegistrations] = useState(true)
  const [enableWaitlist, setEnableWaitlist] = useState(true)

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Admin Controls</h2>

      {/* Event Visibility (local state only) */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Event Visibility</span>
        <Switch
        color="secondary"
          isSelected={visibility}
          onValueChange={setVisibility}
        />
      </div>

      {/* Featured Event (schema: isFeatured) */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Featured Event</span>
        <Switch
          color="secondary"
          isSelected={data.isFeatured || false}
          onValueChange={(val) => setData({ ...data, isFeatured: val })}
        />
      </div>

      {/* Stop Registrations (local state only) */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Stop Registrations</span>
        <Switch
          color="secondary"
          isSelected={stopRegistrations}
          onValueChange={setStopRegistrations}
        />
      </div>

      {/* Enable Waitlist (local state only) */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Enable Waitlist</span>
        <Switch
          color="secondary"
          isSelected={enableWaitlist}
          onValueChange={setEnableWaitlist}
        />
      </div>

     {/* Spots Left Toggle */}
<div className="flex justify-between items-center">
  <span className="text-sm font-medium">Spots Left</span>
  <Switch
    color="secondary"
    isSelected={data.pendingSeats > 0}
    onValueChange={(val) =>
      setData({
        ...data,
        pendingSeats: val ? data.pendingSeats > 0 ? data.pendingSeats : 1 : 0
      })
    }
  />
</div>

{/* Input if switch is ON */}
{data.pendingSeats > 0 && (
  <Input
    type="number"
    min={1}
    placeholder="Enter a number"
    value={String(data.pendingSeats)}
    onChange={(e) =>
      setData({ ...data, pendingSeats: Number(e.target.value) })
    }
  />
)}


      {/* Max Participants (schema: seatCount) */}
      <div>
        <label className="text-sm font-medium mb-1 block">
          Maximum Number of Participants
        </label>
        <Input
          type="number"
          min={1}
          placeholder="Enter a number"
          value={String(data.seatCount || '')}
          onChange={(e) =>
            setData({ ...data, seatCount: Number(e.target.value) })
          }
        />
      </div>
    </div>
  )
}
