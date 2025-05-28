import React, { useEffect, useState } from 'react'
import { getActivities } from '@/api/activity'
import ActivityGrid from '@/components/events/ActivityGrid'
import { Activity } from '@/types'

const Events = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [activeType, setActiveType] = useState<string>('All') // ⬅️ Track selected type

  useEffect(() => {
    const load = async () => {
      const response = await getActivities()
      setActivities(response.data)
    }
    load()
  }, [])

  // ✅ Apply filtering based on selected type
  const filteredActivities =
    activeType === 'All'
      ? activities
      : activities.filter((a) => a.type === activeType)

  const types = ['All', 'event', 'workshop', 'exhibition']

  return (
    <div className='bgCard px-4 py-6'>
      {/* Toggle Buttons */}
      <div className='mb-6 flex flex-wrap gap-2'>
        {types.map((type) => (
          <button
            key={type}
            className={`btn-toggle capitalize ${
              activeType === type
                ? 'btn-toggle-active'
                : 'btn-toggle-inactive'
            }`}
            onClick={() => setActiveType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Activity Grid */}
      <ActivityGrid demoActivities={filteredActivities} />
    </div>
  )
}

export default Events
