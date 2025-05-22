"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Video, MapPin } from "lucide-react"
import AvailabilityEditor from "./availability-editor"

interface EventDetailsFormProps {
  onSubmit: (data: any) => void
  onBack: () => void
}

export default function EventDetailsForm({ onSubmit, onBack }: EventDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: "Appointment",
    duration: "15",
    location: "online",
    hostEmail: "user@example.com",
  })

  const handleChange = (field: string, value: string) => {
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
  <h2 className="text-2xl font-semibold text-gray-800">Event Details</h2>

  <div className="space-y-6">
    <div>
      <Label htmlFor="name">Event Name</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-primary transition"
        required
      />
    </div>

    <div>
      <Label htmlFor="duration">Duration</Label>
      <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
        <SelectTrigger id="duration" className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-primary transition">
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="15">15 minutes</SelectItem>
          <SelectItem value="30">30 minutes</SelectItem>
          <SelectItem value="45">45 minutes</SelectItem>
          <SelectItem value="60">60 minutes</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label>Location</Label>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Card
          className={`cursor-pointer hover:border-primary transition-colors p-4 rounded-lg border ${formData.location === "online" ? "border-primary bg-primary/10" : "border-gray-300"}`}
          onClick={() => handleChange("location", "online")}
        >
          <CardContent className="flex items-center gap-3">
            <Video className="h-5 w-5 text-primary" />
            <span className="text-lg text-gray-700">Online</span>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer hover:border-primary transition-colors p-4 rounded-lg border ${formData.location === "in-person" ? "border-primary bg-primary/10" : "border-gray-300"}`}
          onClick={() => handleChange("location", "in-person")}
        >
          <CardContent className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-lg text-gray-700">In-person</span>
          </CardContent>
        </Card>
      </div>
    </div>

    <div className="border rounded-lg p-6 bg-gray-50">
      <h3 className="font-medium text-xl mb-4 text-gray-800">Availability</h3>
      <AvailabilityEditor />
    </div>

    <div>
      <Label htmlFor="host">Host</Label>
      <Input
        id="host"
        value={formData.hostEmail}
        onChange={(e) => handleChange("hostEmail", e.target.value)}
        className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-primary transition"
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

