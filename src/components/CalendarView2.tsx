import {
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus
} from 'lucide-react'
import { DateTime } from 'luxon'
import { useState, useEffect } from 'react'
// import toast from 'react-hot-toast'
import { Button } from './ui/button'
import { useNotes } from '@/hooks/use-notes'
// import { Separator } from './ui/separator'
import { Item } from '@/types'
import HourCells from './HourCells'
import { useBlocks } from '../context/BlocksContext'
import axios from 'axios'
import { baseUrl } from '@/utils/config'
import useGlobalStore from '@/state/GlobalState'
// import { useNotes } from '@/hooks/use-notes'

type TParentProps = {
  // activeTabDate: Date | undefined
  // setActiveTabDate: (date: Date | undefined) => void
  isOpen: boolean
  hasCalendarAccess: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  // blocks: Item[] | null
  // setBlocks: React.Dispatch<React.SetStateAction<Item[]>>
  onBlockClick?: (block: Item) => void
  setSelectedHour: React.Dispatch<React.SetStateAction<number | null>>
  selectedHour: number | null
}

const CalendarView2 = ({
  // activeTabDate,
  // setActiveTabDate,
  // blocks,
  // setBlocks,
  // onBlockClick,
  setSelectedHour,
  selectedHour
}: TParentProps) => {
  const { user } = useGlobalStore((state) => ({
    user: state.user
  }))
  const bearerToken = user?.token as string

  const [isEarlyAccess, setIsEarlyAccess] = useState<boolean>(false)
  const location = useLocation()

  const {
    blocks,
    setBlocks,
    selectedDate,
    setSelectedDate,
    setSelectedDateWithTime
  } = useBlocks()

  const { handleUpdateTaskOrEvent, handleSaveTaskOrEvent } = useNotes()
  const [events, setEvents] = useState<Item[] | null>([])

  //datepicker
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const { setSelectedBlockForSidebar, setSidebarView } = useNotes()

  const formatDate = (date: Date) => {
    const dt = DateTime.fromJSDate(date)
    return dt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  }

  function parseJwt(token: string) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }

  useEffect(() => {
    const decoded = parseJwt(bearerToken)
    // console.log("decoded :", decoded)
    setIsEarlyAccess(decoded.isEarlyAccess)
  }, [bearerToken])

  // Check for location state from SearchModal to create a new event/task
  useEffect(() => {
    if (location.state?.createNew) {
      const { title, type, hour } = location.state

      const hourToUse = hour !== undefined ? hour : new Date().getHours()

      createDemoBlock(hourToUse, title, type)

      // Clear the location state to prevent recreation on page refresh
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  // Added to render the searched clicked block
  useEffect(() => {
    const pathname = location.pathname
    const match = pathname.match(/^\/calendar\/(.+)$/)
    // console.log(match)
    if (match && match[1]) {
      const calendarId = match[1]

      const fetchData = async () => {
        try {
          const response = await fetchBlockesById({ id: calendarId })
          // console.log(response)

          if (response?.note) {
            setSelectedBlockForSidebar(response.note)
            setSidebarView(true)
            setSelectedDate(new Date(response.note?.dueDate))
          }
        } catch (error) {
          console.error('Error fetching block by ID:', error)
        }
      }

      fetchData()
    }
  }, [location.pathname])

  const handleDateClick = (date: Date) => {
    const now = new Date()

    const updatedDate = new Date(date)
    updatedDate.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    )

    console.log('this happened :', updatedDate)

    if (selectedDate?.getTime() !== updatedDate.getTime()) {
      setSelectedDate(updatedDate)
    }
  }

  // ⚠️ Don’t call handleDateClick inside this useEffect anymore
  useEffect(() => {
    if (selectedDate) {
      setEvents(blocks)
    }
  }, [selectedDate, blocks])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       // const currentDate = new Date()
  //       // const formattedDate = activeTabDate?.toISOString()
  //       const formattedDate = activeTabDate?.toLocaleDateString('en-CA')

  //       const newDateFormat = formattedDate
  //       // const response = await getTasksByDate(formattedDate)
  //       const payload = {
  //         dueDate: newDateFormat
  //       }
  //       const response = await fetchNotes(payload)

  //       setBlocks(response.notes)
  //       setEvents(response.notes)
  //     } catch (error) {
  //       const err = error as AxiosError
  //       const toastMessage =
  //         // @ts-expect-error custom error code
  //         err?.response?.data?.message || 'Unknown err. Check console'
  //       toast.error(toastMessage.toString())
  //     }
  //   }

  //   fetchData()
  // }, [activeTabDate])

  // change date by setting active date

  // change date with offset
  const changeDate = (offset: number) => {
    const newDate = new Date(selectedDate ?? new Date())
    newDate.setDate(newDate.getDate() + offset)
    handleDateClick(newDate)
    // setActiveTabDate(newDate)
  }
  // console.log(events);

  // Kanishka's' new cal

  // const { notes } = useNotes()

  const [view] = useState<'day' | 'week'>('day')

  const changeWeek = (weeks: number) => {
    const newDate = new Date(selectedDate ?? new Date()) // Ensure a valid Date
    newDate.setDate(newDate.getDate() + weeks * 7)
    setSelectedDate(newDate) // ✅ Directly setting Date, no updater function
  }

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay()) // Set to Sunday

    return Array(7)
      .fill(null)
      .map((_, i) => {
        const day = new Date(startOfWeek)
        day.setDate(startOfWeek.getDate() + i)
        return day
      })
  }

  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes())

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date()
      setCurrentHour(now.getHours())
      setCurrentMinutes(now.getMinutes())
    }

    updateCurrentTime() // Initial update
    const interval = setInterval(updateCurrentTime, 60000) // Update every minute

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  const [is24Hours, setIs24Hours] = useState(true)

  useEffect(() => {
    const format = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric'
    }).format(new Date())

    // If the formatted hour contains "AM" or "PM", it's 12-hour format

    setIs24Hours(!format.includes('AM') && !format.includes('PM'))
  }, [])

  const handleBlockClick = (block: Item) => {
    // onBlockClick(block)
    setSelectedBlockForSidebar(block)
    setSidebarView(true)
  }

  const createDemoBlock = (
    i: number,
    title: string = '',
    type: string = 'event'
  ) => {
    const currentDate = new Date()
    const selectedDate1 = selectedDate ?? currentDate
    const year = selectedDate1?.getFullYear()
    const month = String(selectedDate1?.getMonth() + 1).padStart(2, '0') // Month is 0-based
    const day = String(selectedDate1?.getDate()).padStart(2, '0')

    // Create startTime and endTime
    const startTime = new Date(
      year,
      selectedDate1?.getMonth(),
      selectedDate1?.getDate(),
      i,
      0,
      0
    )
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000) // +1 hour

    const demoBlock: Item = {
      title: title,
      content: '',
      dueDate: `${year}-${month}-${day}`, // Format yyyy-mm-dd
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      userId: '',
      type: type.toLowerCase(),
      _id: '',
      parentId: ''
    }

    setSelectedHour(i)

    // onBlockClick(demoBlock)
    setSelectedBlockForSidebar(demoBlock)
    setSidebarView(true)
  }

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    block: Item
    // index: number
  ) => {
    // Prevent default to avoid unwanted behavior
    e.stopPropagation()
    e.preventDefault()

    document.body.style.pointerEvents = 'none'

    // Capture the initial position and initial height
    const startY = e.clientY
    const blockElement = (e.target as HTMLElement).closest(
      '.block'
    ) as HTMLElement

    // const startHeight = blockElement.offsetHeight

    // Get start and end times
    const blockStart = block.startTime ? new Date(block.startTime) : new Date()
    const initialEndTime = block.endTime ? new Date(block.endTime) : new Date()

    // Store original end time for reference
    const originalEndTime = new Date(initialEndTime)

    // Get the height of the hour cell
    const cellHeight = 64 // Height in pixels for one hour
    const pixelsPerMinute = cellHeight / 60 // How many pixels represent one minute

    // Function to snap to the nearest 15-minute increment
    const snapTo15Minutes = (date: Date) => {
      const minutes = date.getMinutes()
      const remainder = minutes % 15

      // Round to nearest 15-minute increment
      if (remainder < 8) {
        // Round down to previous 15-minute mark
        date.setMinutes(minutes - remainder)
      } else {
        // Round up to next 15-minute mark
        date.setMinutes(minutes + (15 - remainder))
      }
      return date
    }

    // Mouse move handler for resizing
    const handleMouseMove = (moveEvent: MouseEvent) => {
      // Calculate vertical movement
      const deltaY = moveEvent.clientY - startY

      // Calculate new height with constraints
      // const newHeight = Math.max(20, startHeight + deltaY) // Minimum height of 20px

      // Calculate time change based on pixel movement
      const minutesChange = Math.round(deltaY / pixelsPerMinute)

      // Create a new end time based on original end time plus the change
      const newEndTime = new Date(originalEndTime)
      newEndTime.setMinutes(originalEndTime.getMinutes() + minutesChange)

      // Snap to nearest 15-minute increment
      const snappedEndTime = snapTo15Minutes(newEndTime)

      // Calculate what the height should be for this snapped time
      const timeDiffMinutes =
        (snappedEndTime.getTime() - blockStart.getTime()) / (1000 * 60)
      const snapHeight = timeDiffMinutes * pixelsPerMinute

      // Update the height of the block element with the snapped height
      blockElement.style.height = `${snapHeight}px`

      // For visual indicator of time (optional)
      const formattedTime = snappedEndTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
      if (blockElement.querySelector('.resize-tooltip')) {
        (
          blockElement.querySelector('.resize-tooltip') as HTMLElement
        ).textContent = formattedTime
      }
    }

    // Mouse up handler to finalize resizing
    const handleMouseUp = () => {
      document.body.style.pointerEvents = 'auto'
      // setResizing(false)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)

      // Calculate the time based on the final height
      const finalHeight = blockElement.offsetHeight
      const finalMinutes = (finalHeight / cellHeight) * 60

      // Calculate new end time
      const newEndTime = new Date(blockStart)
      newEndTime.setMinutes(blockStart.getMinutes() + finalMinutes)

      // Snap the time to 15-minute increments
      const snappedEndTime = snapTo15Minutes(newEndTime)
      const snappedEndTimeISO = snappedEndTime.toISOString()

      // Create updated block directly without depending on state
      const updatedBlock = {
        ...block,
        endTime: snappedEndTimeISO
      }

      // Update the blocks state (uncomment this if you want to update the state)
      // if (!blocks) return // Ensure blocks is not null

      const updatedBlocks: Item[] = (blocks ?? []).map((currentBlock) =>
        currentBlock._id === block._id
          ? ({ ...currentBlock, endTime: snappedEndTimeISO } as Item) // ✅ Explicitly cast to Item
          : currentBlock
      )

      setBlocks(updatedBlocks)

      // Log the correct updated end time

      // Pass the directly updated block to handleBlockClick instead of getting it from state
      if (updatedBlock === block) {
        // console.log('same')
      } else {
        // handleBlockClick(updatedBlock);
        // setIsModalOpen(true);

        const data = {
          _id: updatedBlock?._id,
          type: updatedBlock?.type,
          title: updatedBlock?.title,
          content: updatedBlock?.content,
          ...(updatedBlock?.type === 'task' && {
            dueDate: updatedBlock?.dueDate,
            priority: updatedBlock?.priority,
            isCompleted: false,
            startTime: updatedBlock?.startTime,
            endTime: updatedBlock?.endTime
          }),
          ...(updatedBlock?.type === 'event' && {
            date: updatedBlock?.dueDate,
            startTime: updatedBlock?.startTime,
            endTime: updatedBlock?.endTime
          })
        }

        handleSaveResize(data)
      }

      // Remove the tooltip
      const tooltipElement = blockElement.querySelector('.resize-tooltip')
      if (tooltipElement) {
        blockElement.removeChild(tooltipElement)
      }
    }

    // Add optional visual indicator for the current time during resize
    const tooltip = document.createElement('div')

    tooltip.className = 'resize-tooltip'
    tooltip.style.position = 'absolute'
    tooltip.style.right = '8px'
    tooltip.style.bottom = '8px'
    tooltip.style.background = 'rgba(0,0,0,0.7)'
    tooltip.style.color = 'white'
    tooltip.style.padding = '2px 6px'
    tooltip.style.borderRadius = '4px'
    tooltip.style.fontSize = '12px'
    tooltip.style.pointerEvents = 'none'
    tooltip.textContent = initialEndTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
    // blockElement.style.position = 'relative';
    blockElement.appendChild(tooltip)

    // Attach mousemove and mouseup events
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleSaveResize = (data: any) => {
    if (data) {
      // handleUpdateTaskOrEvent(data);
      if (data?._id === '') {
        // console.log('blocks saved')
        handleSaveTaskOrEvent(data)
      } else {
        // console.log('blocks updated')
        handleUpdateTaskOrEvent(data)
      }
    } else {
      // console.log('blocks saved')
      handleSaveTaskOrEvent(data)
    }
  }

  const handleDropOnHourCell = (data: any, i: number, activeDate: Date) => {
    const year = activeDate.getFullYear()
    const startTime = new Date(
      year,
      activeDate.getMonth(),
      activeDate.getDate(),
      i,
      0,
      0
    )
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000)

    console.log('🧠 Creating new time block on:', activeDate)

    if (data) {
      const updatedData = {
        ...data,
        date: selectedDate?.toLocaleDateString('en-CA'),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString()
      }

      handleUpdateTaskOrEvent(updatedData)
      setBlocks((prevBlocks) => {
        const exists = prevBlocks.some((b) => b._id === data._id)

        if (exists) {
          // 🔄 Update existing block
          return prevBlocks.map((b) => (b._id === data._id ? updatedData : b))
        } else {
          // ➕ Add new block
          return [...prevBlocks, updatedData]
        }
      })
    }
  }

  const handleTaskCompletion = async (block: Item) => {
    if (!block || !block._id) return
    console.log(block)
    const updatedBlock = { ...block, isCompleted: !block.isCompleted }

    // Optimistically update state
    setBlocks((prevBlocks) =>
      prevBlocks.map((b) => (b._id === block._id ? updatedBlock : b))
    )

    try {
      const updatePayload: any = {
        _id: block._id,
        isCompleted: !block.isCompleted,
        startTime: block.startTime,
        endTime: block.endTime,
        type: block.type ?? 'task',
        ...(block.parentId && { parentId: block.parentId }),
        ...(block.dueDate && { date: block.dueDate }),
        ...(block.isRecurring && { isRecurring: block.isRecurring })
      }
      const response = await handleUpdateTaskOrEvent(updatePayload)
      if (!response) {
        throw new Error('Invalid response from backend')
      }
    } catch (error) {
      console.error('Error updating task:', error)

      // Rollback state if request fails
      setBlocks((prevBlocks) =>
        prevBlocks.map((b) => (b._id === block._id ? { ...block } : b))
      )
    }
  }

  function scrollToCurrentHour(selectedDate: Date) {
    if (!selectedDate) return

    const today = new Date()
    const isToday =
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()

    if (isToday) {
      const currentHour = today.getHours()

      // 🔹 Select all hour cells
      const hourCells = document.getElementsByClassName('hour-cell')

      if (hourCells.length > 0) {
        const hourCell = [...hourCells].find((cell) =>
          cell?.textContent?.includes(currentHour.toString())
        )

        if (hourCell) {
          hourCell.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
  }

  // ⏳ Run the function whenever `selectedDate` changes
  useEffect(() => {
    scrollToCurrentHour(selectedDate)
  }, [selectedDate])

  // ⏳ Run the function whenever `selectedDate` changes
  useEffect(() => {
    scrollToCurrentHour(selectedDate)
  }, [])

  const handleGoogleCalendarClick = async () => {
    try {
      const response = await axios.get(`${baseUrl}v2/calendar/google/url`, {
        params: {
          userId: user?.userId
        }
      })

      const authUrl = response.data.authUrl // ✅ access the correct property

      window.location.href = authUrl // ✅ now this will be a proper string
    } catch (error) {
      console.error('Error fetching Google Auth URL:', error)
    }
  }

  return (
    <div id='one' className={`toolbar-box w-full`}>
      <div
        className={`left-14 right-0 top-[-1] items-center justify-center border-b-1 border-border`}
      >
        <div className='relative flex items-center justify-between px-3 py-5'>
          {/* Dropdown to switch views */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='rounded-md border-gray-300 px-6 py-2'
              >
                {view === 'day' ? 'Day View' : 'Week View'}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg'>
              <DropdownMenuItem
                onClick={() => setView('day')}
                className='rounded-lg px-4 py-2 transition hover:bg-blue-100'
              >
                Day View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setView('week')}
                className='rounded-lg px-4 py-2 transition hover:bg-blue-100'
                disabled
              >
                Week View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <div className='flex items-center gap-2 px-3 py-1'>
            {/* Left Arrow Button */}
            <Button
              onClick={() => (view === 'day' ? changeDate(-1) : changeWeek(-1))}
              size='icon'
              variant='ghost'
              className='h-6 w-6 rounded-full p-0 hover:bg-gray-300'
            >
              <ChevronLeft className='h-4 w-4 text-gray-500' />
            </Button>

            <div className='rounded-md bg-[#EFEFEF]'>
              {/* Date Picker (Formatted Date) */}
              <DatePickerWithPresetsCustom
                date={selectedDate ?? new Date()}
                setDate={(date) => {
                  setSelectedDateWithTime(date)
                  // setSelectedDate(date)
                  // handleDateClick(date) // ✅ Call handleDateClick whenever the date is selected
                }}
                open={openDatePicker}
                setOpen={setOpenDatePicker}
              >
                <Button
                  size='sm'
                  variant='ghost'
                  className='px-3 py-0.5 text-sm font-medium text-gray-700'
                >
                  {formatDate(selectedDate ?? new Date())}
                </Button>
              </DatePickerWithPresetsCustom>
            </div>
            {/* Right Arrow Button */}
            <Button
              onClick={() => (view === 'day' ? changeDate(1) : changeWeek(1))}
              size='icon'
              variant='ghost'
              className='h-6 w-6 rounded-full p-0 hover:bg-gray-300'
            >
              <ChevronRight className='h-4 w-4 text-gray-500' />
            </Button>
          </div>

          <div className='flex items-center gap-5'>
            <Tooltip content='Coming soon' isDisabled={isEarlyAccess}>
              <div className='inline-block'>
                <Button
                  className='flex gap-2 bg-[#D4D4D8] text-foreground hover:bg-transparent dark:bg-[#3F3F46]'
                  disabled={!isEarlyAccess}
                  onClick={handleGoogleCalendarClick}
                >
                  <img
                    src='/googleCalendar.webp'
                    alt='google calendar'
                    className='h-5 w-5'
                  />
                  Calendar
                </Button>
              </div>
            </Tooltip>
            <button
              className='ml-auto mr-6 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[14px] font-medium text-white shadow-md transition'
              onClick={() => createDemoBlock(new Date().getHours())}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Create</span>
              <ChevronDown size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div className='h-[84.9vh] overflow-y-auto'>
        <div className='toolbar-content-box min-h-full px-4 pt-[1rem]' id='two'>
          {view === 'day' ? (
            // **Day View (Existing Code)**
            <>
              <HourCells
                // blocks={blocks}
                is24Hours={is24Hours}
                activeTabDate={selectedDate}
                selectedHour={selectedHour}
                createDemoBlock={createDemoBlock}
                handleBlockClick={handleBlockClick}
                handleTaskCompletion={handleTaskCompletion}
                handleMouseDown={handleMouseDown}
                handleDropOnHourCell={handleDropOnHourCell}
              />
            </>
          ) : (
            // **Week View**
            <section className='week-view grid grid-cols-7'>
              {/* Header Row - Week Days */}

              {getWeekDays(selectedDate ?? new Date()).map((day, idx) => {
                const isToday =
                  new Date().toDateString() === new Date(day).toDateString()

                return (
                  <div
                    key={idx}
                    className='day-column sticky top-0 z-20 mb-5 flex flex-none flex-col items-center justify-center bg-[#FFFEFE] p-3'
                  >
                    {/* Day Name - Turns Blue if it's Today */}
                    <span
                      className={`text-sm font-medium ${isToday ? 'text-[#0b57d0]' : 'text-gray-600'} mb-2`}
                    >
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>

                    {/* Date - Turns White & Gets a Blue Background if it's Today */}
                    <span
                      className={`px-3 py-2 text-2xl font-medium ${
                        isToday
                          ? 'rounded-full bg-[#0b57d0] text-white'
                          : 'text-gray-900'
                      }`}
                    >
                      {day.toLocaleDateString('en-US', { day: 'numeric' })}
                    </span>
                  </div>
                )
              })}

              {/* Time Grid - 24 Hour Slots */}
              <div className={`col-span-7 grid grid-cols-7 transition-all`}>
                {Array(24)
                  .fill(0)
                  .map((_, hour) => {
                    let hourLabel
                    if (is24Hours) {
                      hourLabel = hour < 10 ? `0${hour}:00` : `${hour}:00`
                    } else {
                      const period = hour < 12 ? 'AM' : 'PM'
                      const hour12 = hour % 12 || 12 // Convert 0 -> 12 for AM/PM format
                      hourLabel = `${hour12}:00 ${period}`
                    }

                    return (
                      <>
                        {getWeekDays(selectedDate ?? new Date()).map(
                          (day, idx) => {
                            const isToday =
                              new Date().toDateString() ===
                              new Date(day).toDateString()
                            const isCurrentHour = hour === currentHour
                            const minuteOffset = (currentMinutes / 60) * 100
                            const dayEvents = events?.filter((event) => {
                              const eventDate = event?.startTime
                                ? new Date(event.startTime).toDateString()
                                : 'Invalid Date'
                              return new Date(day).toDateString() === eventDate
                            })

                            return (
                              <div
                                key={`${hour}-${idx}`}
                                className='this relative flex min-h-[60px] border-b border-[#D7D7D7]'
                              >
                                {/* Time Labels on the First Column */}
                                {idx === 0 && hourLabel !== '12:00 AM' && (
                                  <div className='time absolute left-[-22px] top-[-25px] z-10 w-20 min-w-10 border-[#DBDBDB] pe-2 pt-2 text-right text-xs tracking-wide text-muted-foreground'>
                                    {hourLabel} {/* Use hourLabel here */}
                                  </div>
                                )}

                                {isCurrentHour && isToday && (
                                  <div
                                    className='absolute left-0 right-0 h-[2px] bg-red-500'
                                    style={{ top: `${minuteOffset}%` }} // Position inside cell
                                  >
                                    <div
                                      className='absolute left-[-5px] h-3 w-3 rounded-full bg-red-500'
                                      style={{ transform: 'translateY(-40%)' }}
                                    ></div>
                                  </div>
                                )}

                                {/* Render Events */}
                                {dayEvents?.map((event, eventIdx) => {
                                  const eventStartHour = event?.startTime
                                    ? new Date(event.startTime).getHours()
                                    : null
                                  const eventEndHour = event?.endTime
                                    ? new Date(event.endTime).getHours()
                                    : null
                                  const eventDuration =
                                    eventStartHour !== null &&
                                    eventEndHour !== null
                                      ? eventEndHour - eventStartHour
                                      : 0
                                  if (eventStartHour === hour) {
                                    return (
                                      <div
                                        key={eventIdx}
                                        className='absolute left-1 right-1 top-0 w-[90%] rounded-md bg-blue-500 p-2 text-xs text-white'
                                        style={{
                                          height: `${eventDuration * 60}px`
                                        }} // Scale event height based on duration
                                      >
                                        {event.title}
                                      </div>
                                    )
                                  }
                                  return null
                                })}
                              </div>
                            )
                          }
                        )}
                      </>
                    )
                  })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarView2

export function PopoverComponent({
  children,
  hasCalendarAccess,
  handleConnectCalendar
}: {
  children: React.ReactNode
  hasCalendarAccess: boolean
  handleConnectCalendar: () => Promise<void>
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='ms-24 h-[unset] w-[unset] min-w-0 px-2 py-2'>
        <Button
          className='rounded-md !px-2 text-xs'
          variant={'ghost'}
          size={'xs'}
          // disabled={hasCalendarAccess}
          disabled={true}
          onClick={async (e) => {
            e.preventDefault()
            if (hasCalendarAccess) return
            await handleConnectCalendar()
          }}
        >
          {!hasCalendarAccess ? (
            <span className='flex items-center gap-1.5'>
              <ExternalLink size={14} />
              Connect Calendar
            </span>
          ) : (
            <span className='flex items-center gap-1.5'>
              <CalendarCheck size={14} />
              Calendar connected
            </span>
          )}
        </Button>
      </PopoverContent>
    </Popover>
  )
}

import { addDays } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
// import { Checkbox } from '@nextui-org/react'
import React from 'react'
import { Tooltip } from '@nextui-org/react'
import { fetchBlockesById } from '@/api/note/noteApi'
import { useLocation } from 'react-router-dom'

// import posthog from 'posthog-js'

// for select due date
export function DatePickerWithPresetsCustom({
  date,
  setDate,
  open,
  setOpen,
  children
}: {
  date: Date
  setDate: (date: Date) => void
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}) {
  return (
    <Popover
      open={open}
      onOpenChange={(e) => {
        setOpen(e)
      }}
    >
      <PopoverTrigger
        className='bg-transparent hover:bg-transparent hover:text-black'
        asChild
      >
        {children}
      </PopoverTrigger>
      <PopoverContent className='flex w-auto flex-col space-y-2 p-2 hover:bg-transparent hover:text-inherit'>
        <Select
          onValueChange={(value) =>
            setDate && setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem
              value='0'
              className='text-black hover:bg-transparent hover:text-inherit'
            >
              Today
            </SelectItem>
            <SelectItem
              value='1'
              className='text-black hover:bg-transparent hover:text-inherit'
            >
              Tomorrow
            </SelectItem>
            <SelectItem
              value='3'
              className='text-black hover:bg-transparent hover:text-inherit'
            >
              In 3 days
            </SelectItem>
            <SelectItem
              value='7'
              className='text-black hover:bg-transparent hover:text-inherit'
            >
              In a week
            </SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(e) => {
              if (!e) e = new Date()
              setDate && setDate(e)
              setOpen(false)
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
