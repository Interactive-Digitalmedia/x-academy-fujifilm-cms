import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'

// Define the Activity type based on your data structure
type Activity = {
  id?: number
  title: string
  type: string
  bannerImage: string
  ambassadorName: string
  date: string
  about: {
    about: string
  }
}

type CategoryActivitiesGridProps = {
  activities: Activity[]
  categoryTitle: string
}

const CategoryActivitiesGrid: React.FC<CategoryActivitiesGridProps> = ({
  activities,
  categoryTitle
}) => {
  const navigate = useNavigate()

  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

  const handleActivityClick = (activity: Activity) => {
    const slug = slugify(activity.title)
    navigate(`/home/events/${slug}`, { state: { activity } })
  }

  // Helper function to determine badge color based on activity type
  const getBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'workshop':
        return 'bg-[#F55B69] text-white'
      case 'event':
        return 'bg-[#8F4EFC] text-white'
      case 'exhibition':
        return 'bg-[#3498db] text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className='w-full lg:w-3/4'>
      {activities.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {activities.map((activity, i) => (
            <div
              key={i}
              className='card cursor-pointer overflow-hidden rounded-2xl bg-card shadow-md'
              onClick={() => handleActivityClick(activity)}
            >
              {/* Image and Badge */}
              <div className='relative h-[200px] w-full p-3'>
                <img
                  src={activity.bannerImage}
                  alt={activity.title}
                  className='h-full w-full rounded-[12px] object-cover'
                />
                <div
                  className={`absolute left-5 top-5 rounded-[8px] px-3 py-1 text-xs font-semibold capitalize ${getBadgeClass(activity.type)}`}
                >
                  {activity.type}
                </div>
              </div>

              {/* Content */}
              <div className='p-4 pt-1'>
                <div className='mb-1 flex items-center justify-between'>
                  <div>
                    <h3 className='text-md mb-2 font-semibold'>
                      {activity.title}
                    </h3>
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
          ))}
        </div>
      ) : (
        <div className='col-span-3 flex h-64 items-center justify-center'>
          <p>No {categoryTitle} found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}

export default CategoryActivitiesGrid
