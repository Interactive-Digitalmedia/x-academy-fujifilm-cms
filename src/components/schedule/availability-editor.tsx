"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface TimeSlot {
  start: string
  end: string
}

interface DayAvailability {
  enabled: boolean
  timeSlots: TimeSlot[]
}

export default function AvailabilityEditor() {
  const [availability,] = useState<Record<string, DayAvailability>>({
    monday: { enabled: true, timeSlots: [{ start: "09:00", end: "17:00" }] },
    tuesday: { enabled: true, timeSlots: [{ start: "09:00", end: "17:00" }] },
    wednesday: { enabled: true, timeSlots: [{ start: "09:00", end: "17:00" }] },
    thursday: { enabled: true, timeSlots: [{ start: "09:00", end: "17:00" }] },
    friday: { enabled: true, timeSlots: [{ start: "09:00", end: "17:00" }] },
    saturday: { enabled: false, timeSlots: [] },
    sunday: { enabled: false, timeSlots: [] },
  })

  const dayLabels: Record<string, string> = {
    monday: "M",
    tuesday: "T",
    wednesday: "W",
    thursday: "T",
    friday: "F",
    saturday: "S",
    sunday: "S",
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        You&apos;ll only be booked during these times (you can change these times and add other schedules later)
      </p>

      <div className="space-y-3">
        {Object.entries(availability).map(([day, { enabled, timeSlots }]) => (
          <div key={day} className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
              {dayLabels[day]}
            </div>

            {enabled ? (
              <div className="flex-1 space-y-2">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Select defaultValue={slot.start}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00am</SelectItem>
                        <SelectItem value="10:00">10:00am</SelectItem>
                        <SelectItem value="11:00">11:00am</SelectItem>
                        <SelectItem value="12:00">12:00pm</SelectItem>
                        <SelectItem value="13:00">1:00pm</SelectItem>
                        <SelectItem value="14:00">2:00pm</SelectItem>
                        <SelectItem value="15:00">3:00pm</SelectItem>
                        <SelectItem value="16:00">4:00pm</SelectItem>
                        <SelectItem value="17:00">5:00pm</SelectItem>
                      </SelectContent>
                    </Select>

                    <span>—</span>

                    <Select defaultValue={slot.end}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10:00">10:00am</SelectItem>
                        <SelectItem value="11:00">11:00am</SelectItem>
                        <SelectItem value="12:00">12:00pm</SelectItem>
                        <SelectItem value="13:00">1:00pm</SelectItem>
                        <SelectItem value="14:00">2:00pm</SelectItem>
                        <SelectItem value="15:00">3:00pm</SelectItem>
                        <SelectItem value="16:00">4:00pm</SelectItem>
                        <SelectItem value="17:00">5:00pm</SelectItem>
                        <SelectItem value="18:00">6:00pm</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button variant="outline" size="sm" className="mt-1">
                  <Plus className="h-4 w-4 mr-1" />
                  Add time slot
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex items-center h-10 text-muted-foreground">Unavailable</div>
            )}
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div>
        <Label htmlFor="timezone">Time zone</Label>
        <Select defaultValue="America/New_York">
          <SelectTrigger id="timezone" className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="America/New_York">Eastern Time - US & Canada (GMT-04:00)</SelectItem>
            <SelectItem value="America/Chicago">Central Time - US & Canada (GMT-05:00)</SelectItem>
            <SelectItem value="America/Denver">Mountain Time - US & Canada (GMT-06:00)</SelectItem>
            <SelectItem value="America/Los_Angeles">Pacific Time - US & Canada (GMT-07:00)</SelectItem>
            <SelectItem value="Asia/Kolkata">India Standard Time (GMT+05:30)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

