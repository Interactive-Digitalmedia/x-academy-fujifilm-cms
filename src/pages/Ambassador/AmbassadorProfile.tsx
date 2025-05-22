import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import InstagramIcon from '/public/images/banner/icons/instagramIcon.png'
import FacebookIcon from '/public/images/banner/icons/facebookIcon.png'
import { badgeColors } from '@/assets/badgeColors'
import SectionHeader from '@/components/homePage/SectionHeader'
import ShieldImage from '/public/images/banner/shield.png'
import ActivityGrid from '@/components/homePage/ActivityGrid'
import { demoActivities } from '@/assets/activities'
import { TooltipComponent } from '@/components/TooltipComponent'
import GalleryMasonryGrid from '@/components/homePage/GalleryMasonryGrid'
import { ambassadors } from '@/assets/ambassadors'
import AmbassadorCard from '@/components/discovery/AmbassadorCard'
import GearDetailsGrid from '@/components/homePage/GearDetailsGrid'
import { ambassadorGear } from '@/assets/ambassadorGear'

const AmbassadorProfile = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const ambassador = location.state?.ambassador
  const tabs = ['About', 'Past Events', 'Gallery', 'Gear Details']

  const [activeTab, setActiveTab] = useState('About')

  const handleAmbassadorViewAllClick = () => {
    navigate(`/ambassadors`)
  }

  const now = new Date()
  const upcomingActivities = demoActivities.filter(
    (activity) =>
      activity.ambassador[0] === ambassador?.name &&
      new Date(activity.date) > now
  )

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

  return (
    <div className='section'>
      {/* Breadcrumbs */}
      <div className='flex items-center space-x-2 px-4 py-3 text-sm'>
        <button onClick={() => navigate(-1)} className='focus:outline-none'>
          <ChevronLeft className='h-6 w-6' />
        </button>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1
          return (
            <React.Fragment key={index}>
              {index > 0 && <span className='text-gray-500'>/</span>}
              <span
                className={
                  isLast ? 'font-medium capitalize' : 'capitalize text-gray-500'
                }
              >
                {decodeURIComponent(segment)}
              </span>
            </React.Fragment>
          )
        })}
      </div>

      {/* Header */}
      {/* Banner with avatar */}
      <div className="relative min-h-[120px] w-full overflow-hidden rounded-t-2xl bg-[#0000001A] bg-[url('/checkerboard.svg')] bg-repeat" />

      {/* Avatar and buttons row */}
      <div className='-mt-10 flex items-end justify-between px-6'>
        {/* Overlapping Avatar */}
        <div className='z-40 h-28 w-28 overflow-hidden rounded-full border-4 border-black'>
          <img
            src={ambassador.image}
            alt={ambassador.name}
            className='h-full w-full object-cover'
          />
        </div>

        {/* Social Buttons */}
        <div className='flex gap-2'>
          <a
            href='#'
            className='icon-button flex items-center gap-1 rounded-[8px] border-none'
          >
            <img src={InstagramIcon} alt='Instagram' className='mr-1 h-4 w-4' />
            Instagram
            <span className='ml-1 text-lg'>↗</span>
          </a>

          <a
            href='#'
            className='icon-button flex items-center gap-1 rounded-[8px] border-none'
          >
            <img src={FacebookIcon} alt='Facebook' className='mr-1 h-4 w-4' />
            Facebook
            <span className='ml-1 text-lg'>↗</span>
          </a>
        </div>
      </div>

<div className="space-y-4 mt-[2rem]">
  {/* Name + Badge */}
  <div className="flex items-center gap-2">
    <h2 className="text-2xl font-bold">{ambassador?.name}</h2>
    <TooltipComponent text="X-Ambassador">
  <img
    src={ShieldImage}
    alt="badge"
    className="h-6 cursor-pointer"
  />
</TooltipComponent>
  </div>

        {/* Bio */}
        <p className='text-base leading-relaxed'>
          <span className='font-semibold'>Bio - </span>
          {ambassador?.bio}
        </p>

        {/* Tags */}
        <div className='flex flex-wrap gap-2'>
          {ambassador?.tags?.map((tag: string, index: number) => {
            const randomColor =
              badgeColors[Math.floor(Math.random() * badgeColors.length)]

            return (
              <span key={index} className={`tag ${randomColor}`}>
                {tag} Photography
              </span>
            )
          })}
        </div>

        {upcomingActivities.length > 0 && (
          <div className='mt-10'>
            <SectionHeader title={`Upcoming Events by ${ambassador?.name}`} />
            <ActivityGrid demoActivities={upcomingActivities} />
          </div>
        )}
      </div>

      <div className='mt-6 space-y-4'>
        {/* Tabs */}
        <div className='flex text-sm font-medium'>
          {tabs.map((tab: any) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 transition-all ${
                activeTab === tab
                  ? 'font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Placeholder content for other tabs */}
        {activeTab === 'Past Events' && (
          <ActivityGrid demoActivities={demoActivities} />
        )}

        {activeTab === 'Gear Details' && (
          <div className='space-y-4'>
            <GearDetailsGrid gear={ambassadorGear} />
          </div>
        )}

        {activeTab !== 'Past Events' && activeTab !== 'Gear Details' && (
          <div className='card space-y-5 p-4 text-sm'>
            {activeTab === 'About' && (
              <>
                {/* Who Section */}
                {ambassador?.about?.who && (
                  <div>
                    <h4 className='mb-2 text-sm font-semibold text-gray-400'>
                      Who is {ambassador.name}?
                    </h4>
                    <ul className='list-disc space-y-1 pl-5'>
                      {ambassador.about.who
                        .split('.')
                        .filter((line: any) => line.trim().length > 0)
                        .map((line: any, idx: any) => (
                          <li key={idx}>{line.trim()}.</li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* About Section */}
                {ambassador?.about?.about && (
                  <div>
                    <h4 className='mb-2 mt-4 text-sm font-semibold text-gray-400'>
                      About Ambassador
                    </h4>
                    <p className='whitespace-pre-line leading-relaxed'>
                      {ambassador.about.about}
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'Gallery' && (
              <div className='px-1 pt-2'>
                <GalleryMasonryGrid images={ambassador.gallery} />
              </div>
            )}
          </div>
        )}

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
      </div>

      {/* Spacer for avatar */}
      <div className='h-10' />
    </div>
  )
}

export default AmbassadorProfile
