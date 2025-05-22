"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Clock, Calendar, MapPin } from "lucide-react"

interface BookingFormProps {
  event: {
    id: string
    name: string
    duration: string
    type: "1:1" | "group"
    location: string
  }
  selectedDate: string
  selectedTime: string
  onSubmit: () => void
  onBack: () => void
}

export default function BookingForm({ event, selectedDate, selectedTime, onSubmit, onBack }: BookingFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="p-4">
      <button className="flex items-center text-sm text-primary mb-4" onClick={onBack}>
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back
      </button>

      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{event.duration} min</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {selectedDate}, {selectedTime}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location === "online" ? "Online Meeting" : "In-person Meeting"}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" required />
        </div>

        {event.type === "group" && (
          <div className="space-y-2">
            <Label htmlFor="guests">Guest Email(s)</Label>
            <Input id="guests" placeholder="guest@example.com, another@example.com" />
            <p className="text-xs text-muted-foreground">Notify up to 10 additional guests of the scheduled event.</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Please share anything that will help prepare for our meeting.</Label>
          <Textarea id="notes" rows={3} />
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full">
            Schedule Event
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By proceeding, you confirm that you have read and agree to the Terms of Use and Privacy Notice.
        </p>
      </form>
    </div>
  )
}

