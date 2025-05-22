import { Button, Input } from '@nextui-org/react'
import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ambassadors } from '@/assets/ambassadors'
import { badgeColors } from '@/assets/badgeColors'
import FiltersPopoverAmbassadors from '@/components/homePage/FiltersPopoverAmbassadors'

const AmbassadorDirectory = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'ambassador' | 'evangelist'>(
    'ambassador'
  )

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTimeline, setSelectedTimeline] = useState<string[]>([])

  const filteredAmbassadors = ambassadors
    .filter((amb) =>
      activeTab === 'ambassador'
        ? amb.type === 'X-Ambassador'
        : amb.type === 'Product Evangelists'
    )
    .filter(
      (amb) =>
        amb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        amb.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (amb) =>
        selectedTypes.length === 0 ||
        amb.tags?.some((tag) => selectedTypes.includes(tag.toLowerCase()))
    )
    .filter(
      (amb) =>
        selectedTimeline.length === 0 || selectedTimeline.includes('Upcoming') // TODO: implement real timeline logic
    )

  const resetFilters = () => {
    setSelectedTypes([])
    setSelectedTimeline([])
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

  return (
    <div className='section mb-[3rem]'>
      <div className='mb-4 flex items-center'>
        <div className='max-w-8xl flex w-full items-center gap-3'>
          {/* Search Input */}
          <Input
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='flex-1'
            size='md'
            variant='bordered'
            isClearable
            onClear={() => setSearchQuery('')}
          />

          <FiltersPopoverAmbassadors
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedTimeline={selectedTimeline}
            setSelectedTimeline={setSelectedTimeline}
            onReset={resetFilters}
          />
        </div>
      </div>

      <div className='mb-4 space-x-2'>
        <Button
          onPress={() => {
            setActiveTab('ambassador')
            resetFilters()
          }}
          className={`btn-toggle ${
            activeTab === 'ambassador'
              ? 'btn-toggle-active'
              : 'btn-toggle-inactive'
          }`}
        >
          X-Ambassador
        </Button>
        <Button
          onPress={() => setActiveTab('evangelist')}
          className={`btn-toggle ${
            activeTab === 'evangelist'
              ? 'btn-toggle-active'
              : 'btn-toggle-inactive'
          }`}
        >
          Product Evangelists
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredAmbassadors.map((ambassador, index) => {
          const randomColor =
            badgeColors[Math.floor(Math.random() * badgeColors.length)]

          return (
            <div
              key={index}
              className='card p-3'
              onClick={() => handleAmbassadorClick(ambassador)}
            >
              {/* Image */}
              <div className='aspect-square overflow-hidden rounded-lg bg-red-100'>
                <img
                  src={ambassador.image}
                  alt={ambassador.name}
                  className='h-full w-full object-cover'
                />
              </div>

              {/* Name and icon */}
              <div className='mb-2 flex items-center justify-between'>
                <h3 className='text-sm font-semibold'>
                  {ambassador.name} <span className='ml-1'>🇮🇳</span>
                </h3>
                <span className='text-2xl text-gray-500'>↗</span>
              </div>

              {/* Location Badge with random color */}
              <div>
                <span
                  className={`inline-block rounded-[8px] px-3 py-1 text-xs font-medium capitalize text-white ${randomColor}`}
                >
                  {ambassador.location}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AmbassadorDirectory
