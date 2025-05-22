import useGlobalStore from '@/state/GlobalState'
import { baseUrl } from '@/utils/config'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'

type Event = {
  kind: string
  etag: string
  id: string
  status: string
  htmlLink: string
  created: string
  updated: string
  summary: string
  description: string
  start: {
    date?: string
    dateTime?: string
  }
  end: {
    date?: string
    dateTime?: string
  }
  allDay?: boolean
}

const hours = [
  '12:00 AM',
  '1:00 AM',
  '2:00 AM',
  '3:00 AM',
  '4:00 AM',
  '5:00 AM',
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM'
]

const CalendarView = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [activeTabDate, setActiveTabDate] = useState(new Date())
  const [currentTimePosition, setCurrentTimePosition] = useState(0)
  const { user } = useGlobalStore()
  const currentHourRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}calendar/events?date=${formatDate(activeTabDate)}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.token}`
            }
          }
        )
        setEvents(response.data.events)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    fetchData()
  }, [activeTabDate, user])

  useEffect(() => {
    if (currentHourRef.current) {
      currentHourRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    const updateCurrentTimePosition = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const totalMinutes = currentHour * 60 + currentMinute

      if (currentHourRef.current && containerRef.current) {
        // const hourHeight = currentHourRef.current.clientHeight
        const containerTop = containerRef.current.getBoundingClientRect().top
        const hourTop = currentHourRef.current.getBoundingClientRect().top

        const offsetTop = hourTop - containerTop
        const position =
          (totalMinutes / 1440) * containerRef.current.scrollHeight

        setCurrentTimePosition(
          offsetTop + (position / 1440) * containerRef.current.scrollHeight
        )
      }
    }

    updateCurrentTimePosition()
    const interval = setInterval(updateCurrentTimePosition, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleDateClick = (date: Date) => {
    setActiveTabDate(date)
  }

  const formatDay = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' }
    return date.toLocaleDateString('en-US', options)
  }

  const getMonthYear = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric'
    }
    return date.toLocaleDateString('en-US', options)
  }

  const changeDate = (offset: number) => {
    const newDate = new Date(activeTabDate)
    newDate.setDate(newDate.getDate() + offset)
    setActiveTabDate(newDate)
  }

  const getEventsForSelectedHour = (hour: string) => {
    const filteredEvents = events.filter((event) => {
      if (event.allDay) {
        return event.start?.date === formatDate(activeTabDate)
      } else if (event.start?.dateTime) {
        const eventDateTime = new Date(event.start.dateTime)
        return (
          eventDateTime.getDate() === activeTabDate.getDate() &&
          eventDateTime.getMonth() === activeTabDate.getMonth() &&
          eventDateTime.getFullYear() === activeTabDate.getFullYear() &&
          hours[eventDateTime.getHours()] === hour
        )
      }
      return false
    })
    return filteredEvents
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
  }

  const formatTime = (dateTime: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric'
    }
    return new Date(dateTime).toLocaleTimeString('en-US', options)
  }

  const currentHour = new Date().getHours() % 12 || 12
  const currentPeriod = new Date().getHours() >= 12 ? 'PM' : 'AM'
  const currentHourString = `${currentHour}:00 ${currentPeriod}`

  // const currentTimeLabel = new Date().toLocaleTimeString('en-US', {
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   hour12: true
  // })

  return (
    <div
      className='flex h-full flex-col'
      style={{ width: 'calc(100% - 4rem)' }}
    >
      <div className='flex-none border-b border-gray-300 p-2 text-center'>
        <div className='mb-4 mr-[20px] flex items-center justify-between'>
          <div className='text-xl font-medium'>
            {getMonthYear(activeTabDate)}
          </div>
          <div className='flex items-center'>
            <button onClick={() => changeDate(-1)} className='px-2 py-1'>
              &lt;
            </button>
            <button onClick={() => changeDate(1)} className='px-2 py-1'>
              &gt;
            </button>
          </div>
        </div>
        <div className='mr-[20px] flex items-center justify-between'>
          {[0, 1, 2, 3].map((offset) => {
            const currentDate = new Date(activeTabDate)
            currentDate.setDate(currentDate.getDate() + offset)
            const isSelected = currentDate.getDate() === activeTabDate.getDate()

            return (
              <div
                key={offset}
                className='flex cursor-pointer flex-col items-center'
                onClick={() => handleDateClick(currentDate)}
              >
                {isSelected ? (
                  <div className='rounded-lg bg-blue-100 p-5'>
                    <h2 className='text-xl font-medium text-blue-500'>
                      {currentDate.getDate()}
                    </h2>
                    <p className='text-sm text-gray-400'>
                      {formatDay(currentDate)}
                    </p>
                    <div className='mx-auto mt-1 h-2 w-2 rounded-full bg-blue-500'></div>
                  </div>
                ) : (
                  <>
                    <h2 className='text-xl font-medium text-gray-600'>
                      {currentDate.getDate()}
                    </h2>
                    <p className='text-sm text-gray-400'>
                      {formatDay(currentDate)}
                    </p>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <h3 className='p-2 pt-6 text-left font-medium'>Schedule today</h3>
      </div>

      <div ref={containerRef} className='flex-1 overflow-y-hidden'>
        <div className='relative h-full overflow-y-auto text-medium scrollbar-hide'>
          {hours.map((hour, index) => (
            <div
              key={index}
              className='flex border-t border-gray-300'
              ref={hour === currentHourString ? currentHourRef : null}
            >
              <div className='w-16 border-r border-gray-100 p-2 text-right text-gray-400'>
                {hour}
              </div>
              <div className='flex-1 border-l border-gray-300 p-2'>
                {getEventsForSelectedHour(hour).map((event, idx) => (
                  <div
                    key={idx}
                    className='mb-2 rounded-lg bg-pink-100 p-2'
                    style={{
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    <h4
                      className='font-semibold text-pink-700'
                      style={{ whiteSpace: 'normal' }}
                    >
                      {event.summary}
                    </h4>
                    <p className='text-xs text-pink-600'>
                      {event.start?.dateTime && event.end?.dateTime
                        ? `${formatTime(event.start.dateTime)} - ${formatTime(
                            event.end.dateTime
                          )}`
                        : 'All day'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div
            className='absolute left-0 right-0 top-0'
            style={{
              height: '2px',
              backgroundColor: '#3B82F6', // Change color here
              marginTop: `${currentTimePosition}px`
            }}
          ></div>
          {/* Time Label */}
          {/* <div
            className='absolute left-[50%-3px] top-0 -mt-2 w-24 text-center text-xs text-gray-600'
            style={{ marginTop: `${currentTimePosition}px` }}
          >
            {currentTimeLabel}
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default CalendarView
