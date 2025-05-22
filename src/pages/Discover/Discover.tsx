import TagChip from '@/components/discovery/TagChips'
import { dummyTags } from '@/assets/dummyTags'
import SectionHeader from '@/components/homePage/SectionHeader'
import AmbassadorCard from '@/components/discovery/AmbassadorCard'
import eventImage1 from '../../../public/images/banner/event2.jpg'
import { demoActivities } from '@/assets/activities'
import ActivityGrid from '@/components/homePage/ActivityGrid'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import XBlogsCard from '@/components/discovery/XBlogs'
import AmbassadorGrid from '@/components/homePage/AmbassadorGrid'
import { ambassadors } from '@/assets/ambassadors'
import SearchWithFiltersBar from '@/components/discovery/SearchWithFiltersBar'
import { blogs } from '@/assets/blogs'

type CategoryType = {
  id: number
  title: string
  imageSrc: string
  type: string
}

const categories = [
  {
    id: 1,
    title: 'Workshops',
    imageSrc: eventImage1,
    type: 'workshop'
  },
  {
    id: 2,
    title: 'Exhibitions',
    imageSrc: eventImage1,
    type: 'exhibition'
  },
  {
    id: 3,
    title: 'Events',
    imageSrc: eventImage1,
    type: 'event'
  }
]

const Discover = () => {
  const navigate = useNavigate()
  const [filteredActivities, setFilteredActivities] = useState(demoActivities)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const location = useLocation()

  // Determine if we're on the main Discover page or a category page
  const isDiscover = location.pathname === '/discover'

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTimeline, setSelectedTimeline] = useState<string[]>([])

  const resetFilters = () => {
    setSelectedTypes([])
    setSelectedTimeline([])
    setSearchQuery('')
  }

  const handleActivityViewAllClick = () => {
    navigate('/activity/event') // ✅ Replace with your actual route
  }

  const handleAmbassadorViewAllClick = () => {
    navigate(`/ambassadors`)
  }
  // Show search results if there's a search query
  if (searchQuery.trim()) {
    return (
      <div className='section relative px-4'>
        <h2 className='mb-4 text-xl font-semibold text-white'>
          Search Results
        </h2>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, i) => (
              <div
                key={i}
                className='card overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-md'
              >
                {/* Image and Badge */}
                <div className='relative h-[200px] w-full p-3'>
                  <img
                    src={activity.bannerImage}
                    alt={activity.title}
                    className='h-full w-full rounded-[12px] object-cover'
                  />
                  <div
                    className={`absolute left-5 top-5 rounded-[8px] px-3 py-1 text-xs font-semibold capitalize ${
                      activity.type === 'workshop'
                        ? 'bg-[#f55b69] text-white'
                        : ''
                    } ${activity.type === 'event' ? 'bg-[#8f4efc] text-white' : ''} ${
                      activity.type === 'exhibition'
                        ? 'bg-[#3498db] text-white'
                        : ''
                    }`}
                  >
                    {activity.type}
                  </div>
                </div>

                {/* Content */}
                <div className='p-4 pt-1'>
                  <div className='mb-1 flex items-center justify-between'>
                    <div>
                      <h3 className='text-md mb-2 font-semibold text-white'>
                        {activity.title}
                      </h3>
                      <p className='mb-2 text-sm text-gray-400'>
                        Mon, 3 Mar | {activity.ambassadorName}
                      </p>
                    </div>
                    <Button color='primary' size='sm'>
                      Book
                    </Button>
                  </div>
                  <p className='line-clamp-2 text-xs text-gray-400'>
                    {activity.about.about}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-3 flex h-64 items-center justify-center'>
              <p className='text-gray-400'>
                No results found for "{searchQuery}". Try a different search
                term.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

  const handleAmbassadorClick = (ambassador: any) => {
    console.log('here')
    const slug = slugify(ambassador?.name)
    navigate(`/ambassadors/${slug}`, { state: { ambassador } })
  }

  // Show normal discover page if no search query
  return (
    <div className='section relative'>
      <div className='fixed left-0 top-0 z-50 w-full bg-background px-6 py-4'>
        <SearchWithFiltersBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedTimeline={selectedTimeline}
          setSelectedTimeline={setSelectedTimeline}
          onReset={resetFilters}
          isDiscover={isDiscover}
        />
      </div>

      <section className='space-y-4 px-0'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='relative h-[200px] cursor-pointer overflow-hidden rounded-2xl'
              onClick={() => {
                navigate('/activity')
              }}
            >
              <img
                src={category.imageSrc}
                alt={category.title}
                className='h-full w-full object-cover'
              />
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40'>
                <h3 className='text-2xl font-bold text-white'>
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rest of your component remains unchanged */}
      <section className='space-y-4 px-0'>
        <SectionHeader
          title='Recommended for you'
          onViewAllClick={handleActivityViewAllClick}
        />
        <ActivityGrid demoActivities={demoActivities} />
      </section>

      <div>
        <SectionHeader title='Trending topics' />
        <div className='flex flex-wrap gap-3'>
          {dummyTags.map((tag) => (
            <TagChip key={tag.id} label={tag.name} />
          ))}
        </div>
      </div>

      {/* Ambassador sections */}
      <section className='space-y-4 px-0'>
        <SectionHeader
          title='Our Ambassadors'
          onViewAllClick={handleAmbassadorViewAllClick}
        />

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5'>
          {ambassadors.map((amb) => (
            <AmbassadorCard
              ambassador={amb}
              onClick={() => {
                handleAmbassadorClick(amb)
              }}
            />
          ))}
        </div>
      </section>
      <section className='space-y-4 px-0'>
        <SectionHeader title='X Stories' />
        {/* <ActivityGrid demoActivities={demoActivities} activeTab={'month'} /> */}
        <AmbassadorGrid ambassadors={ambassadors} />
      </section>
      <section className='space-y-4 px-0'>
        <SectionHeader title='X Blogs' />
        <XBlogsCard blogs={blogs} />
      </section>
    </div>
  )
}

export default Discover
