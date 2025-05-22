'use client'

import { useState, useEffect, useRef } from 'react'
import newsletter from '/public/images/banner/newsletter.jpg'
import showcase from '/public/images/banner/showcase.jpg'
import { Button } from '@nextui-org/react'
import { demoActivities } from '@/assets/activities'
import { ambassadors } from '@/assets/ambassadors'
import ActivityGrid from '@/components/homePage/ActivityGrid'
import AmbassadorGrid from '@/components/homePage/AmbassadorGrid'
import AmbassadorBanner from '@/components/homePage/AmbassadorBanner'
import ShowcaseBanner from '@/components/homePage/ShowcaseBanner'
import needsImage from '/public/images/banner/needs.jpg'
import instaFujiImage from '/public/images/banner/instaFuji.png'
import BluetickFrame from '/public/images/banner/Frame.png'
import WarrantyImage from '/public/images/banner/warranty.png'
import NewsletterImage from '/public/images/banner/newsletter.png'
import SectionHeader from '@/components/homePage/SectionHeader'
import viewBlogsWhite from '../../../public/images/banner/viewBlogsWhite.png'
import viewBlogsBlack from '../../../public/images/banner/viewBlogsBlack.png'
import { sliderBlogDummyData } from '@/assets/sliderBlogDummyData'
import NewsletterBanner from '@/components/homePage/NewsletterBanner'
import Blogs from '@/components/homePage/Blogs'
import { useNavigate } from 'react-router-dom'

import { badgeColors } from '@/assets/badgeColors'

export default function Home() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'week' | 'month'>('month')
  const [, setActiveBlogIndex] = useState(0)
  const blogContainerRef = useRef<HTMLDivElement>(null)

  const handleTabClick = () => {
    setActiveTab('week')
  }

  const scrollToSlide = (index: number) => {
    const container = containerRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement
    container.scrollTo({
      left:
        child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2,
      behavior: 'smooth'
    })
    setActiveIndex(index)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      // const center = container.scrollLeft + container.offsetWidth / 2
      let closestIndex = 0
      let closestDistance = Infinity

      Array.from(container.children).forEach((child, index) => {
        const rect = (child as HTMLElement).getBoundingClientRect()
        const childCenter = rect.left + rect.width / 2
        const containerCenter = window.innerWidth / 2
        const distance = Math.abs(childCenter - containerCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Optional: snap to center on load
  useEffect(() => {
    scrollToSlide(1)
  }, [])

  // Add this function to scroll to a specific blog when a dot is clicked

  // Add this useEffect to track which blog is currently in view
  useEffect(() => {
    const container = blogContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const containerTop = container.scrollTop
      const containerCenter = containerTop + container.offsetHeight / 2

      let closestIndex = 0
      let closestDistance = Infinity

      Array.from(container.children).forEach((child, index) => {
        const childTop = (child as HTMLElement).offsetTop
        const childHeight = (child as HTMLElement).offsetHeight
        const childCenter = childTop + childHeight / 2
        const distance = Math.abs(childCenter - containerCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveBlogIndex(closestIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  function formatPrettyDate(dateString: string): string {
    const date = new Date(dateString)

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const dayOfWeek = days[date.getDay()]
    const month = months[date.getMonth()]
    const day = date.getDate()

    // Add ordinal suffix
    const ordinal = (n: number) => {
      if (n > 3 && n < 21) return `${n}th`
      switch (n % 10) {
        case 1:
          return `${n}st`
        case 2:
          return `${n}nd`
        case 3:
          return `${n}rd`
        default:
          return `${n}th`
      }
    }

    return `${dayOfWeek}, ${month} ${ordinal(day)}`
  }

  const handleActivityViewAllClick = () => {
    navigate('/activity/event') // ✅ Replace with your actual route
  }

  return (
    <div className='relative mx-auto mt-[80px] h-auto w-full max-w-[100%] bg-background py-6'>
      {/* Carousel */}
      <div
        ref={containerRef}
        className='scrollbar-none flex h-[400px] snap-x snap-mandatory overflow-x-auto scroll-smooth px-[3rem]'
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none' // IE 10+
        }}
      >
        {demoActivities.map((item, i) => (
          <div
            key={i}
            className='min-w-[300px] max-w-[90%] shrink-0 snap-center rounded-xl bg-neutral-900 text-white transition-all duration-300'
            style={{
              transform: i === activeIndex ? 'scale(1)' : 'scale(0.92)',
              opacity: i === activeIndex ? 1 : 0.5
            }}
          >
            <div className='flex h-full w-full flex-col overflow-hidden rounded-xl md:flex-row'>
              {/* LEFT: Image Section */}
              <div className='relative w-full md:w-1/2'>
                <img
                  src={item.bannerImage}
                  alt={item.title}
                  className='h-full w-full object-cover'
                />

                {/* Fade Overlay - desktop only */}
                <div className='pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 bg-gradient-to-l from-black to-transparent md:block' />

                {/* Tags */}
                <div className='absolute left-3 top-3 z-10 flex flex-wrap gap-2'>
                  {item.tags.map((tag, idx) => {
                    const randomColor =
                      badgeColors[
                        Math.floor(Math.random() * badgeColors.length)
                      ]
                    return (
                      <span key={idx} className={`tag ${randomColor}`}>
                        {tag}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* RIGHT: Content Section */}
              <div className='flex w-full flex-col items-center justify-center bg-black px-6 py-6 text-center text-white md:w-1/2 md:items-end md:text-right'>
                <div className='w-full md:w-[100%]'>
                  <h3 className='mb-4 text-xl font-bold leading-tight md:text-[46px]'>
                    {item.title}
                  </h3>

                  {/* Responsive container: row on mobile, column on desktop */}
                  <div className='mt-2 flex flex-col items-center justify-center gap-2 text-sm text-gray-300 md:flex-col md:items-end md:justify-end md:gap-0'>
                    {/* Row for mobile only: wraps date + divider + ambassador */}
                    <div className='flex items-center gap-4 md:hidden'>
                      {/* Date */}
                      <div className='flex items-center'>
                        {formatPrettyDate(item.date)}
                      </div>

                      {/* Divider */}
                      <div className='h-4 w-px bg-gray-500' />

                      {/* Ambassador */}
                      <div className='flex items-center'>
                        <img
                          src='/avatar-placeholder.png'
                          alt='ambassador'
                          className='mr-2 h-6 w-6 rounded-full'
                        />
                        <span>{item.ambassadorName}</span>
                      </div>
                    </div>

                    {/* Stack vertically for md+ screens */}
                    <div className='hidden flex-col items-end md:flex'>
                      <div className='mb-2 flex items-center'>
                        <span className='mr-2 text-red-500'>📅</span>
                        {formatPrettyDate(item.date)}
                      </div>
                      <div className='flex items-center'>
                        <img
                          src='/avatar-placeholder.png'
                          alt='ambassador'
                          className='mr-2 h-6 w-6 rounded-full'
                        />
                        <span>{item.ambassadorName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className='mt-4 flex justify-center gap-2'>
        {demoActivities.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-8 bg-black dark:bg-white'
                : 'w-2 bg-[#999999]'
            }`}
          ></button>
        ))}
      </div>

      {/* the events section */}
      <div className='w-full px-6 md:px-[120px]'>
        {/* Header */}
        <SectionHeader
          title='Suggested for you'
          onViewAllClick={handleActivityViewAllClick}
        />
        <div className='mb-4 mt-[-10px] space-x-2'>
          <Button
            onPress={handleTabClick}
            className={`btn-toggle ${
              activeTab === 'week' ? 'btn-toggle-active' : 'btn-toggle-inactive'
            }`}
          >
            This Week
          </Button>
          <Button
            onPress={() => setActiveTab('month')}
            className={`btn-toggle ${
              activeTab === 'month'
                ? 'btn-toggle-active'
                : 'btn-toggle-inactive'
            }`}
          >
            This Month
          </Button>
        </div>

        {/* events section */}
        <ActivityGrid demoActivities={demoActivities} activeTab={activeTab} />

        {/* banner image  */}

        <AmbassadorBanner image={newsletter} />

        {/* x stories */}
        <SectionHeader title='X Stories' />

        {/* Ambassador Cards Grid */}
        <AmbassadorGrid ambassadors={ambassadors} />

        {/* showcase banner */}
        <ShowcaseBanner image={showcase} />

        <div className='grid grid-cols-1 gap-6 py-10 md:grid-cols-2'>
          {/* Instagram Card */}
          <div className='card-wide flex items-center justify-between'>
            <div className='flex w-1/2 flex-col items-center justify-center text-center'>
              <img
                src={instaFujiImage}
                alt='Fujifilm India'
                className='mb-4 h-24 w-24'
              />
              <p className='flex items-center justify-center gap-1 text-lg font-medium'>
                fujifilmxindia
                <img src={BluetickFrame} alt='verified' className='h-4 w-4' />
              </p>
            </div>
            <div className='!m-0 flex w-1/2 overflow-hidden'>
              <img
                src={needsImage}
                alt='Story 1'
                className='rounded-lg object-cover'
              />
            </div>
          </div>

          {/* Warranty Card */}
          <div className='card-wide flex items-center justify-between p-6'>
            <div className='flex w-1/2 justify-center'>
              <img src={WarrantyImage} alt='Warranty' className='h-auto' />
            </div>
            <div className='flex w-1/2 items-center justify-center'>
              <p className='text-center text-lg font-semibold leading-snug md:text-xl'>
                Claim Your +1 Year <br /> Warranty
              </p>
            </div>
          </div>
        </div>

        {/* the upward slider */}
        <Blogs
          blogs={sliderBlogDummyData}
          viewBlogsBlack={viewBlogsBlack}
          viewBlogsWhite={viewBlogsWhite}
        />

        <NewsletterBanner image={NewsletterImage} />
      </div>
    </div>
  )
}
