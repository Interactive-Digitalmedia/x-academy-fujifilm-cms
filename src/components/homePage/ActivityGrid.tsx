import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity } from '@/types'
import { badgeColors } from '@/assets/badgeColors'

type Props = {
  demoActivities: Activity[]
  activeTab?: 'week' | 'month'
}
const ActivityGrid: React.FC<Props> = ({ demoActivities, activeTab }) => {
  const navigate = useNavigate()

  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])

  useEffect(() => {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
  
    const filtered = demoActivities.filter((activity) => {
      const activityDate = new Date(activity.date)
  
      if (!activeTab) return true // ✅ Show all if no tab selected
  
      if (activeTab === 'week') {
        return activityDate >= startOfWeek && activityDate <= endOfWeek
      }
  
      if (activeTab === 'month') {
        return (
          activityDate.getMonth() === currentMonth &&
          activityDate.getFullYear() === currentYear
        )
      }
  
      return false
    })
  
    setFilteredActivities(filtered.slice(0, 3))
  }, [activeTab, demoActivities])
  

  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

  const handleActivityClick = (activity: Activity) => {
    const slug = slugify(activity.title)
    navigate(`/events/${slug}`, { state: { activity } })
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>

      {filteredActivities.map((activity, i) => {
  const randomColor = badgeColors[Math.floor(Math.random() * badgeColors.length)]

  return (
    <div
      key={i}
      className='card overflow-hidden rounded-2xl bg-card shadow-md'
      onClick={() => handleActivityClick(activity)}
    >
      {/* Image and Badge */}
      <div className='relative w-full p-3'>
        <div className="aspect-[4/3] overflow-hidden rounded-[12px]">
          <img
            src={activity.bannerImage}
            alt={activity.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className={`absolute left-5 top-5 tag ${randomColor}`}>
          {activity.type}
        </div>
      </div>

      {/* Content */}
      <div className='p-4 pt-1'>
        <div className='mb-1 flex items-center justify-between'>
          <div>
            <h3 className='text-md mb-2 font-semibold'>{activity.title}</h3>
            <p className='mb-2 text-sm'>
              Mon, 3 Mar | {activity.ambassadorName}
            </p>

          </div>
          <button className='normal-btn'>Book</button>
        </div>
        <p className='card-about line-clamp-2 text-xs'>
          {activity.about.about}
        </p>
      </div>
    </div>
  )
})}

      </div>
      {/* Discover More button - only show on small screens */}
      <div className='mt-8 flex justify-center md:hidden'>
        <button className='w-full max-w-sm rounded-xl bg-[#0094FF] px-6 py-2 text-sm font-medium text-white'>
          Discover More
        </button>
      </div>
    </>
  )
}
export default ActivityGrid
