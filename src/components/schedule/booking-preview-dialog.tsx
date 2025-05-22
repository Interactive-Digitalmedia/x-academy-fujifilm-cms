"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingCalendar from "./booking-calendar"
import BookingForm from "./booking-form"
import BookingConfirmation from "./booking-confirmation"

interface BookingPreviewDialogProps {
  event: {
    id: string
    name: string
    duration: string
    type: "1:1" | "group"
    location: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BookingPreviewDialog({ event, open, onOpenChange }: BookingPreviewDialogProps) {
  const [bookingStep, setBookingStep] = useState<"calendar" | "form" | "confirmation">("calendar")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
    setBookingStep("form")
  }

  const handleFormSubmit = () => {
    setBookingStep("confirmation")
  }

  const handleReset = () => {
    setBookingStep("calendar")
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
    if (!newOpen) {
      setTimeout(() => {
        handleReset()
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Booking Preview</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <Tabs defaultValue="invitee" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="invitee">Invitee View</TabsTrigger>
              <TabsTrigger value="settings">Page Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="invitee" className="mt-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{event.duration} min</span>
                    <span>•</span>
                    <span>{event.type === "1:1" ? "One-on-One" : "Group"}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                </div>

                {bookingStep === "calendar" && <BookingCalendar onSelect={handleDateTimeSelect} />}

                {bookingStep === "form" && (
                  <BookingForm
                    event={event}
                    selectedDate={selectedDate!}
                    selectedTime={selectedTime!}
                    onSubmit={handleFormSubmit}
                    onBack={() => setBookingStep("calendar")}
                  />
                )}

                {bookingStep === "confirmation" && (
                  <BookingConfirmation event={event} selectedDate={selectedDate!} selectedTime={selectedTime!} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Booking Page Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize the look of your booking page to fit seamlessly into your website.
                  </p>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="hideEventType" className="text-sm">
                      Hide Event Type Details
                    </label>
                    <input type="checkbox" id="hideEventType" className="h-4 w-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="hideCookieBanner" className="text-sm">
                      Hide Cookie Banner
                    </label>
                    <input type="checkbox" id="hideCookieBanner" className="h-4 w-4" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="bgColor" className="text-sm">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white border rounded-md"></div>
                    <select id="bgColor" className="flex-1 h-9 rounded-md border px-3 py-1 text-sm">
                      <option value="white">White</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="textColor" className="text-sm">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black border rounded-md"></div>
                    <select id="textColor" className="flex-1 h-9 rounded-md border px-3 py-1 text-sm">
                      <option value="black">Black</option>
                      <option value="gray">Gray</option>
                      <option value="white">White</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="buttonColor" className="text-sm">
                    Button & Link Color
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 border rounded-md"></div>
                    <select id="buttonColor" className="flex-1 h-9 rounded-md border px-3 py-1 text-sm">
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="green">Green</option>
                    </select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

