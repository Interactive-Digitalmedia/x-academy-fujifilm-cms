import React from 'react'
import { Button } from '@nextui-org/react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import { SlidersHorizontal, X } from 'lucide-react'

type FiltersPopoverProps = {
  selectedTypes: string[]
  setSelectedTypes: (types: string[]) => void
  selectedTimeline: string[]
  setSelectedTimeline: (timeline: string[]) => void
  onReset: () => void
}

const FiltersPopoverAmbassadors: React.FC<FiltersPopoverProps> = ({
  selectedTypes,
  setSelectedTypes,
  selectedTimeline,
  setSelectedTimeline,
  onReset
}) => {
  const toggleFilter = (
    value: string,
    current: string[],
    setter: (val: string[]) => void
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    )
  }

  return (
    <Popover placement='bottom-end' showArrow>
      <PopoverTrigger>
        <Button
          size='md'
          className='icon-button rounded-[8px] md:hidden'
          startContent={<SlidersHorizontal className='h-4 w-4' />}
        >
          Filters
        </Button>
      </PopoverTrigger>

      <PopoverContent className='filter-card'>
        <div className='mb-4 flex w-full items-center justify-between'>
          <h4 className='text-lg font-semibold'>Filters</h4>
          <button onClick={onReset} className='filter-reset'>
            Reset all filters
          </button>
        </div>

        {/* Type Filters */}
        <div className='mb-4 w-full'>
          <h5 className='filter-title mb-2 items-center'>Type</h5>
          <div className='grid grid-cols-3 gap-2'>
            {['fashion', 'street', 'portrait', 'wildLife'].map((type) => {
              const isActive = selectedTypes.includes(type)
              return (
                <button
                  key={type}
                  onClick={() =>
                    toggleFilter(type, selectedTypes, setSelectedTypes)
                  }
                  className={`filter-chip ${isActive ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                >
                  {type}
                  {isActive && <X className='h-3 w-3 opacity-80' />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Timeline Filters */}
        <div>
          <h5 className='filter-title mb-2 items-center'>Event Timeline</h5>
          <div className='grid grid-cols-3 gap-2'>
            {['Upcoming', 'Attended'].map((time) => {
              const isActive = selectedTimeline.includes(time)
              return (
                <button
                  key={time}
                  onClick={() =>
                    toggleFilter(time, selectedTimeline, setSelectedTimeline)
                  }
                  className={`filter-chip ${isActive ? 'filter-chip-active' : 'filter-chip-inactive'}`}
                >
                  {time}
                  {isActive && <X className='h-3 w-3 opacity-80' />}
                </button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FiltersPopoverAmbassadors
