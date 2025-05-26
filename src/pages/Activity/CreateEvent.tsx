import { useState } from "react"
import CreateEventLayout from "@/layouts/CreateEventLayout"

export default function CreateEvent() {
  const [formData, setFormData] = useState({})

  return (
    <CreateEventLayout
      data={formData}
      setData={setFormData}
    />
  )
}
