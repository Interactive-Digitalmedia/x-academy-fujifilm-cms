import { useState } from 'react'
import { Input, Textarea, Select, SelectItem } from '@nextui-org/react'
import { Plus, Trash2 } from 'lucide-react'

const days = [
  'Day 1 - Friday, May 16th 2025',
  'Day 2 - Saturday, May 17th 2025',
  'Day 3 - Sunday, May 18th 2025'
]

const blankSession = {
  dayTitle: '',
  title: '',
  speaker: '',
  startTime: '',
  endTime: '',
  bullets: ''
}

export default function EventSchedule({ data, setData }: any) {
  const [sessionBlocks, setSessionBlocks] = useState([{ ...blankSession }])

  type SessionField = 'dayTitle' | 'title' | 'speaker' | 'startTime' | 'endTime' | 'bullets'

  const handleFieldChange = (index: number, field: SessionField, value: string) => {
    const updated = [...sessionBlocks]
    updated[index][field] = value
    setSessionBlocks(updated)
  
    // Convert to formatted schedule immediately
    const groupedByDay: Record<string, any[]> = {}
  
    updated.forEach((session) => {
      const { dayTitle, title, speaker, startTime, endTime, bullets } = session
      if (!dayTitle || !title || !startTime || !endTime) return
  
      const sessionData = {
        title: speaker ? `${title} - ${speaker}` : title,
        time: `${startTime} - ${endTime}`,
        bullets: bullets
          .split(',')
          .map((b) => b.trim())
          .filter(Boolean)
      }
  
      if (!groupedByDay[dayTitle]) {
        groupedByDay[dayTitle] = []
      }
  
      groupedByDay[dayTitle].push(sessionData)
    })
  
    const formattedSchedule = Object.entries(groupedByDay).map(([dayTitle, sessions]) => ({
      dayTitle,
      sessions
    }))
  
    setData({ ...data, schedule: formattedSchedule })
  }
  

  const handleAddBlock = () => {
    setSessionBlocks([...sessionBlocks, { ...blankSession }])
  }

  const handleRemoveBlock = (index: number) => {
    if (sessionBlocks.length === 1) return
    const updated = [...sessionBlocks]
    updated.splice(index, 1)
    setSessionBlocks(updated)
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg">Add Schedule Item</h2>

      {sessionBlocks.map((session, index) => (
        <div
          key={index}
          className="space-y-4 p-6 rounded-xl border bg-white relative"
        >
          {/* Remove Button (top right) */}
          {sessionBlocks.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveBlock(index)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition"
              title="Remove this session"
            >
              <Trash2 size={16} />
            </button>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Select Day</label>
            <Select
              placeholder="Select day"
              selectedKeys={session.dayTitle ? [session.dayTitle] : []}
              onChange={(e) =>
                handleFieldChange(index, 'dayTitle', e.target.value)
              }
            >
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                placeholder="Session title"
                value={session.title}
                onChange={(e) =>
                  handleFieldChange(index, 'title', e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Speaker/Presenter</label>
              <Input
                placeholder="Name of speaker or presenter"
                value={session.speaker}
                onChange={(e) =>
                  handleFieldChange(index, 'speaker', e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <Input
                type="time"
                value={session.startTime}
                onChange={(e) =>
                  handleFieldChange(index, 'startTime', e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <Input
                type="time"
                value={session.endTime}
                onChange={(e) =>
                  handleFieldChange(index, 'endTime', e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              placeholder="e.g. Overview, key learning points, exercises"
              minRows={3}
              value={session.bullets}
              onChange={(e) =>
                handleFieldChange(index, 'bullets', e.target.value)
              }
            />
          </div>
        </div>
      ))}

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddBlock}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} strokeWidth={2} />
          Add Item
        </button>
      </div>
    </div>
  )
}
