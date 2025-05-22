"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Copy, Share2 } from "lucide-react"
import BookingPreviewDialog from "./booking-preview-dialog"

interface EventCardProps {
  event: {
    id: string
    name: string
    duration: string
    type: "1:1" | "group"
    location: string
  }
}

export default function EventCard({ event }: EventCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{event.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{event.duration} min</span>
              <span>•</span>
              <span>{event.type === "1:1" ? "One-on-One" : "Group"}</span>
              <span>•</span>
              <span>{event.location}</span>
            </div>
          </div>
          <div>
            <Button variant="link" className="text-sm" onClick={() => setIsPreviewOpen(true)}>
              View booking page
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Copy className="h-4 w-4" />
          Copy link
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </CardFooter>

      <BookingPreviewDialog event={event} open={isPreviewOpen} onOpenChange={setIsPreviewOpen} />
    </Card>
  )
}

