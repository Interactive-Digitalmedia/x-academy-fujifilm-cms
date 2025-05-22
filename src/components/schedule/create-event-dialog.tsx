"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, User } from "lucide-react"
import EventDetailsForm from "./event-details-form"
import GroupEventDetailsForm from "./group-event-details"
import { Button } from "@/components/ui/button"

interface CreateEventDialogProps {
  // open: boolean
  // onOpenChange: (open: boolean) => void
  onEventCreated?: (eventDetails: any) => void
}

export default function CreateEventDialog({onEventCreated }: CreateEventDialogProps) {
  const [step, setStep] = useState(1)
  const [eventType, setEventType] = useState<"1:1" | "group" | null>(null)
  const [eventDetails, setEventDetails] = useState<any>(null)

  const handleEventTypeSelect = (type: "1:1" | "group") => {
    setEventType(type)
    setStep(2)
  }

  const handleEventDetailsSubmit = (details: any) => {
    const finalDetails = {
      ...details,
      eventType,
    }

    setEventDetails(finalDetails)
    //here i can put the console and check the final details of the link creation
    setStep(3) // Move to confirmation step
  }

  const handleConfirmation = () => {
    // Submit the event
    if(onEventCreated)
    onEventCreated(eventDetails)

    // Reset and close
    setTimeout(() => {
      // onOpenChange(false)
      setStep(1)
      setEventType(null)
    }, 500)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // this useEffect to setStep one when user comes to this page
  useEffect(()=>{
    setStep(1)
    setEventType(null)
  },[
  ])

  // Reset state when dialog closes
  // const handleOpenChange = (newOpen: boolean) => {
  //   // onOpenChange(newOpen)
  //   if (!newOpen) {
  //     setTimeout(() => {
  //       setStep(1)
  //       setEventType(null)
  //     }, 300)
  //   }
  // }

  return (
    // <Dialog open={open} onOpenChange={handleOpenChange}>
    //   <DialogContent className="sm:max-w-[600px]">
    //     <DialogHeader>
    //       <DialogTitle>Create Scheduling Link</DialogTitle>
    //     </DialogHeader>
<div className={`flex h-screen gap-3 p-5`}>
    <div
      className={`relative p-10 flex flex-1 flex-col rounded-xl border border-[#e0e0e0] bg-[#FFFEFE] transition-all duration-500 ease-in-out`}
    >
        <div className="mt-2">
          <div className="mb-6">
            {/* <div className="flex justify-between mb-2">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  1
                </div>
                <span className="text-xs mt-1">Event Type</span>
              </div>
              <div className="flex-1 flex items-center mx-2">
                <div className={`h-1 w-full ${step > 1 ? "bg-primary" : "bg-muted"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  2
                </div>
                <span className="text-xs mt-1">Event Details</span>
              </div>
              <div className="flex-1 flex items-center mx-2">
                <div className={`h-1 w-full ${step > 2 ? "bg-primary" : "bg-muted"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  3
                </div>
                <span className="text-xs mt-1">Confirmation</span>
              </div>
            </div> */}
          </div>

          <div className="mt-3">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Select Event Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleEventTypeSelect("1:1")}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                      <User className="h-10 w-10 text-primary" />
                      <h3 className="font-medium text-lg">One-on-One</h3>
                      <p className="text-sm text-muted-foreground">Schedule meetings with a single person</p>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleEventTypeSelect("group")}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                      <Users className="h-10 w-10 text-primary" />
                      <h3 className="font-medium text-lg">Group Event</h3>
                      <p className="text-sm text-muted-foreground">Schedule meetings with multiple participants</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {step === 2 && eventType === "1:1" && (
              <EventDetailsForm onSubmit={handleEventDetailsSubmit} onBack={handleBack} />
            )}

            {step === 2 && eventType === "group" && (
              <GroupEventDetailsForm onSubmit={handleEventDetailsSubmit} onBack={handleBack} />
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Confirm Event Details</h2>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Type:</span>
                    <span className="font-medium">{eventType === "1:1" ? "One-on-One" : "Group Event"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Name:</span>
                    <span className="font-medium">{eventDetails?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{eventDetails?.duration} minutes</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{eventDetails?.location === "online" ? "Online" : "In-person"}</span>
                  </div>

                  {eventType === "group" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Participants:</span>
                      <span className="font-medium">{eventDetails?.maxParticipants}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="button" onClick={handleConfirmation}>
                    Create Event
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div></div>
    //   </DialogContent>
    // </Dialog>
  )
}

