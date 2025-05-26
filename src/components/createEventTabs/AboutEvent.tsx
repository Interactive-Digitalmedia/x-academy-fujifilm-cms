// AboutEvent.tsx
import { Textarea } from '@nextui-org/react'

export default function AboutEvent({ data, setData }: any) {
  const about = data.about || {
    whyShouldYouAttend: '',
    whatsIncluded: [],
    about: ''
  }

  const handleChange = (field: string, value: string | string[]) => {
    const updated = { ...about, [field]: value }
    setData({ ...data, about: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">About the Event</label>
        <Textarea
          placeholder="Describe what attendees will learn, experience, and take away."
          minRows={4}
          value={about.about}
          onChange={(e) => handleChange('about', e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-500">
          Note: Write a compelling description of your event. Include what attendees can expect to learn or experience.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">What's Included?</label>
        <Textarea
  placeholder="e.g. Live demo, Expert Q&A, Free goodies"
  minRows={3}
  value={about.whatsIncluded.join(', ')}  // ✅ Convert array to string
  onChange={(e) =>
    handleChange(
      'whatsIncluded',
      e.target.value.split(',').map((s) => s.trim()) // ✅ Convert string back to array
    )
  }
/>

      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Why Should You Attend?</label>
        <Textarea
          placeholder="Explain the value and benefits of this event."
          minRows={3}
          value={about.whyShouldYouAttend}
          onChange={(e) => handleChange('whyShouldYouAttend', e.target.value)}
        />
      </div>

      <div className="pt-4">
        <p className="text-sm font-semibold text-gray-600 mb-2">Tips for a great description:</p>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
          <li>Be clear about what participants will gain from attending</li>
          <li>Highlight key speakers or special features</li>
          <li>Mention any prerequisites or who the event is ideal for</li>
          <li>Include information about refreshments, materials, or other amenities</li>
        </ul>
      </div>
    </div>
  )
}
