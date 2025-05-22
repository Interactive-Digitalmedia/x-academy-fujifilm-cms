"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Video, MapPin } from "lucide-react"
// import { Switch } from "@/components/ui/switch"
import AvailabilityEditor from "./availability-editor"

interface GroupEventDetailsFormProps {
  onSubmit: (data: any) => void
  onBack: () => void
}

export default function GroupEventDetailsForm({ onSubmit, onBack }: GroupEventDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: "Group Meeting",
    duration: "30",
    location: "online",
    hostEmail: "user@example.com",
    maxParticipants: "5",
    showRemainingSpots: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="h-screen overflow-y-auto pb-[5rem]">
    <form onSubmit={handleSubmit} className="space-y-8 max-w-full mx-auto p-6 bg-white rounded-lg h-[90%] overflow-y-auto">
      <h2 className="text-xl font-semibold">Group Event Details</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Event Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="duration">Duration</Label>
          <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
            <SelectTrigger id="duration" className="mt-1">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
              <SelectItem value="90">90 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Location</Label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <Card
              className={`cursor-pointer hover:border-primary transition-colors ${formData.location === "online" ? "border-primary bg-primary/5" : ""}`}
              onClick={() => handleChange("location", "online")}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Video className="h-5 w-5 text-primary" />
                <span>Online</span>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer hover:border-primary transition-colors ${formData.location === "in-person" ? "border-primary bg-primary/5" : ""}`}
              onClick={() => handleChange("location", "in-person")}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>In-person</span>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Label htmlFor="maxParticipants">Maximum Participants</Label>
          <Select value={formData.maxParticipants} onValueChange={(value) => handleChange("maxParticipants", value)}>
            <SelectTrigger id="maxParticipants" className="mt-1">
              <SelectValue placeholder="Select maximum participants" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 participants</SelectItem>
              <SelectItem value="5">5 participants</SelectItem>
              <SelectItem value="10">10 participants</SelectItem>
              <SelectItem value="20">20 participants</SelectItem>
              <SelectItem value="50">50 participants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showRemainingSpots" className="cursor-pointer">
            Show remaining spots on booking page
          </Label>
          {/* <Switch
            id="showRemainingSpots"
            checked={formData.showRemainingSpots as boolean}
            onCheckedChange={(checked) => handleChange("showRemainingSpots", checked)}
          /> */}
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Availability</h3>
          <AvailabilityEditor />
        </div>

        <div>
          <Label htmlFor="host">Host</Label>
          <Input
            id="host"
            value={formData.hostEmail}
            onChange={(e) => handleChange("hostEmail", e.target.value)}
            className="mt-1"
            disabled
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
    </div>
  )
}

