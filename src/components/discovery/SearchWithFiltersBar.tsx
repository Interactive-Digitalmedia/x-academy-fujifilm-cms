import React from 'react'
import { Button, Input } from '@nextui-org/react'
import FiltersPopoverAmbassadors from '../homePage/FiltersPopoverAmbassadors'
import { useNavigate } from 'react-router-dom'

type Props = {
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedTypes: string[]
  setSelectedTypes: (types: string[]) => void
  selectedTimeline: string[]
  setSelectedTimeline: (timeline: string[]) => void
  onReset: () => void
  isDiscover?: boolean
}

const SearchWithFiltersBar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedTypes,
  setSelectedTypes,
  selectedTimeline,
  setSelectedTimeline,
  onReset,
  isDiscover
}) => {
  const navigate = useNavigate()
  return (
    <nav className='fixed top-0 z-40 flex min-h-16 w-full items-center justify-between bg-white/60 pr-12 backdrop-blur-md dark:bg-black/30'>
      {!isDiscover ? (
        <Button
          isIconOnly
          variant='light'
          onPress={() => navigate(-1)}
          // className='mr-2'
        >
          <svg
            width='28'
            height='28'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15 18L9 12L15 6'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          {/* <ChevronLeft size={24} color='black ' /> */}
        </Button>
      ) : (
        <div className='w-10'></div> // Empty space for alignment
      )}
      <div className='flex w-full items-center gap-4 px-14'>
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
          onReset={onReset}
        />
      </div>

      <Button
        isIconOnly
        variant='light'
        onPress={() => navigate('/')}
        // className='ml-2'
      >
        <svg
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6 18L18 6M6 6L18 18'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>
    </nav>
  )
}

export default SearchWithFiltersBar
