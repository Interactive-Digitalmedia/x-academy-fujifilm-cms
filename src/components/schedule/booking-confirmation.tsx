"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, User, ExternalLink } from "lucide-react"

interface BookingConfirmationProps {
  event: {
    id: string
    name: string
    duration: string
    type: "1:1" | "group"
    location: string
  }
  selectedDate: string
  selectedTime: string
}

export default function BookingConfirmation({ event, selectedDate, selectedTime }: BookingConfirmationProps) {
  return (
    <div className="p-6 flex flex-col items-center text-center">
      <CheckCircle className="h-12 w-12 text-green-500 mb-4" />

      <h3 className="text-xl font-semibold mb-2">You are scheduled</h3>
      <p className="text-muted-foreground mb-6">A calendar invitation has been sent to your email address.</p>

      <Button variant="outline" className="mb-8 gap-2">
        <ExternalLink className="h-4 w-4" />
        Open Invitation
      </Button>

      <div className="border rounded-lg p-4 w-full max-w-md">
        <h4 className="font-semibold mb-4">{event.name}</h4>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <span>Host Name</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>{selectedDate}</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>
              {selectedTime} ({event.duration} min)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

