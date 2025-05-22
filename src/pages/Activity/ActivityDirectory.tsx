// src/components/discover/ActivityDirectory.tsx
import { useEffect, useState } from 'react'
import { Button, Slider } from '@nextui-org/react'
import { demoActivities } from '@/assets/activities'
import CategoryActivitiesGrid from '@/components/discovery/CategoryActivitiesGrid'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SearchWithFiltersBar from '@/components/discovery/SearchWithFiltersBar'
import { Select, SelectItem } from '@nextui-org/react'

// Filter types for the left panel
const filterTypes = [
  ['Events', 'Exhibitions'],
  ['Workshops', 'Online Seminars'],
  ['Phototours', 'Photowalks'],
  ['Service Camps', 'Others']
]

// Category tabs mapping
const categoryTabs = [
  { id: 'all', label: 'All' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'exhibition', label: 'Exhibitions' },
  { id: 'event', label: 'Events' }
]

// Get unique ambassador names
const uniqueAmbassadors = [
  ...new Set(demoActivities.map((act) => act.ambassadorName))
]

const ActivityDirectory = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'all'
  ])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState(5000)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAmbassadors, setSelectedAmbassadors] = useState<string[]>([])
  const [selectedTimeline, setSelectedTimeline] = useState<string[]>([])
  const [filteredActivities, setFilteredActivities] = useState(demoActivities)
  const [paginationInfo, setPaginationInfo] = useState({
    start: 1,
    end: 0,
    total: 0
  })

  // Apply all filters
  useEffect(() => {
    // Start with all activities
    let result = demoActivities

    // Handle category filtering
    if (!selectedCategories.includes('all')) {
      result = result.filter((act) =>
        selectedCategories.includes(act.type.toLowerCase())
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter(
        (act) =>
          act.title.toLowerCase().includes(q) ||
          act.type.toLowerCase().includes(q) ||
          act.ambassadorName.toLowerCase().includes(q)
      )
    }

    // Filter by selected types (if any)
    if (selectedTypes.length > 0) {
      // Create a mapping of display names to actual type values
      const typeMapping: { [key: string]: string } = {
        Events: 'event',
        Exhibitions: 'exhibition',
        Workshops: 'workshop',
        'Online Seminars': 'online',
        Phototours: 'phototour',
        Photowalks: 'photowalk',
        'Service Camps': 'servicecamp',
        Others: 'other'
      }

      // Convert selected display types to actual types
      const selectedActualTypes = selectedTypes
        .map((t) => typeMapping[t])
        .filter(Boolean)

      // Sync with category selections
      const updatedCategories = [
        ...new Set([
          ...selectedCategories.filter((c) => c !== 'all'),
          ...selectedActualTypes
        ])
      ]

      if (
        JSON.stringify(updatedCategories.sort()) !==
        JSON.stringify(selectedCategories.filter((c) => c !== 'all').sort())
      ) {
        setSelectedCategories(
          updatedCategories.length ? updatedCategories : ['all']
        )
      }

      // Apply type filtering
      result = result.filter((act) =>
        selectedActualTypes.includes(act.type.toLowerCase())
      )
    }

    // Filter by selected ambassadors (if any)
    if (selectedAmbassadors.length > 0) {
      result = result.filter((act) =>
        selectedAmbassadors.includes(act.ambassadorName)
      )
    }

    // Update pagination information
    setPaginationInfo({
      start: result.length > 0 ? 1 : 0,
      end: result.length,
      total: result.length
    })

    // Set filtered results
    setFilteredActivities(result)
  }, [searchQuery, selectedCategories, selectedTypes, selectedAmbassadors])

  // Handle type selection
  const handleTypeSelection = (type: string) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((t) => t !== type)
      } else {
        return [...prevSelectedTypes, type]
      }
    })

    // Map display type to category
    const typeToCategory: { [key: string]: string } = {
      Events: 'event',
      Exhibitions: 'exhibition',
      Workshops: 'workshop'
    }

    const categoryValue = typeToCategory[type]

    // If it's a main category, update the top category selection too
    if (categoryValue) {
      setSelectedCategories((prev) => {
        if (prev.includes(categoryValue)) {
          // Remove the category if it's already selected
          const filtered = prev.filter((c) => c !== categoryValue)
          // If removing the last specific category, go back to "all"
          return filtered.length && filtered[0] !== 'all' ? filtered : ['all']
        } else {
          // Add the category and remove "all"
          return [...prev.filter((c) => c !== 'all'), categoryValue]
        }
      })
    }
  }

  // Handle category selection
  const handleCategorySelection = (categoryId: string) => {
    setSelectedCategories((prev) => {
      // If selecting "all", clear other selections
      if (categoryId === 'all') {
        return ['all']
      }

      // If the category is already selected, remove it
      if (prev.includes(categoryId)) {
        const filtered = prev.filter((c) => c !== categoryId)
        // If removing the last specific category, go back to "all"
        return filtered.length ? filtered : ['all']
      } else {
        // Add the category and remove "all"
        return [...prev.filter((c) => c !== 'all'), categoryId]
      }
    })

    // Update the sidebar filter accordingly
    const categoryToType: { [key: string]: string } = {
      event: 'Events',
      exhibition: 'Exhibitions',
      workshop: 'Workshops'
    }

    const typeValue = categoryToType[categoryId]

    if (typeValue && categoryId !== 'all') {
      setSelectedTypes((prev) => {
        if (!prev.includes(typeValue)) {
          return [...prev, typeValue]
        }
        return prev
      })
    }
  }

  // Handle ambassador selection
  const handleAmbassadorSelection = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setSelectedAmbassadors(selectedOptions)
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedTypes([])
    setPriceRange(5000)
    setSearchQuery('')
    setSelectedCategories(['all'])
    setSelectedAmbassadors([])
    setSelectedTimeline([])
  }

  return (
    <div className='min-h-screen'>
      <div className='section'>
        <div className='mb-6'>
          <div className='fixed left-0 top-0 z-50 w-full bg-background px-6 py-4'>
            <SearchWithFiltersBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedTimeline={selectedTimeline}
              setSelectedTimeline={setSelectedTimeline}
              // onReset={resetFilters}
            />
          </div>

          {/* Category Tabs - Using the custom CSS classes */}
          <div className='mb-4 flex space-x-2'>
            {categoryTabs.map((tab) => (
              <Button
                key={tab.id}
                className={
                  selectedCategories.includes(tab.id)
                    ? 'btn-toggle-active'
                    : 'btn-toggle-inactive'
                }
                onClick={() => handleCategorySelection(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          <div className='flex'>
            <div className='w-[36%]'></div>
            <div className='flex w-full items-center justify-between'>
              <h1 className='text-xl font-bold'>
                {selectedCategories.includes('all')
                  ? 'All Activities'
                  : selectedCategories.length > 1
                    ? `Multiple Categories`
                    : `All ${categoryTabs.find((t) => t.id === selectedCategories[0])?.label || 'Items'}`}
              </h1>

              <div className='flex items-center space-x-2'>
                <Button isIconOnly variant='light' className='mr-1'>
                  <ChevronLeft />
                </Button>
                <p className='text-sm'>
                  Showing {paginationInfo.start}-{paginationInfo.end} of{' '}
                  {paginationInfo.total}
                </p>
                <Button isIconOnly variant='light' className=''>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-6 lg:flex-row'>
          {/* Filters Panel */}
          <div className='w-full lg:w-1/4'>
            <div className='rounded-lg border bg-[#F4F4F4] p-4 dark:border-gray-800 dark:bg-gray-900'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-xl font-semibold'>Filters</h2>
                <button
                  className='mb-1 text-sm underline'
                  onClick={resetFilters}
                >
                  Reset all filters
                </button>
              </div>

              <div className='mb-6'>
                <h3 className='mb-3 font-medium'>Type</h3>
                <div className='space-y-3'>
                  {filterTypes.map((row, rowIndex) => (
                    <div key={rowIndex} className='flex flex-wrap gap-2'>
                      {row.map((type) => {
                        // Determine if this type should be active based on both direct selection
                        // and category selection
                        const typeToCategory: { [key: string]: string } = {
                          Events: 'event',
                          Exhibitions: 'exhibition',
                          Workshops: 'workshop'
                        }

                        const correspondingCategory = typeToCategory[type]
                        const isActive =
                          selectedTypes.includes(type) ||
                          (correspondingCategory &&
                            selectedCategories.includes(correspondingCategory))

                        return (
                          <Button
                            key={type}
                            className={
                              isActive
                                ? 'btn-toggle-active'
                                : 'btn-toggle-inactive'
                            }
                            onClick={() => handleTypeSelection(type)}
                          >
                            {type}
                          </Button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className='mb-6'>
                <Select
                  placeholder='Conducted By'
                  selectionMode='multiple'
                  selectedKeys={selectedAmbassadors}
                  onSelectionChange={(keys) =>
                    setSelectedAmbassadors(Array.from(keys) as string[])
                  }
                  className='rounded-lg border'
                >
                  {uniqueAmbassadors.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <div className='mb-6 flex items-center justify-between'>
                  <h3 className='font-medium'>Price</h3>
                  <span className='font-medium'>Upto Rs. {priceRange}</span>
                </div>

                <Slider
                  aria-label='Price Range'
                  step={100}
                  maxValue={10000}
                  minValue={0}
                  color='primary'
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as number)}
                  className='max-w-full'
                  classNames={{
                    filler: 'bg-blue-500', // explicitly override the filled track color
                    track: 'bg-gray-300', // optional: the empty part
                    thumb: 'border-blue-500' // optional: thumb border
                  }}
                  formatOptions={{ style: 'currency', currency: 'INR' }}
                  showTooltip={true}
                  tooltipValueFormatOptions={{
                    style: 'currency',
                    currency: 'INR'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Activities Grid */}
          <CategoryActivitiesGrid
            activities={filteredActivities}
            categoryTitle={
              selectedCategories.includes('all')
                ? 'All Activities'
                : selectedCategories.length > 1
                  ? 'Multiple Categories'
                  : categoryTabs.find((t) => t.id === selectedCategories[0])
                      ?.label || 'Items'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ActivityDirectory
