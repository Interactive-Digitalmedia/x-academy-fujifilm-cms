import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { DatePickerWithPresetsCustom } from './CalendarView2'
// import { Button } from '@nextui-org/react'

import { DateTime } from 'luxon'
import TaskView from './TaskView'
import NotesView from './NotesView'
import { useBlocks } from '@/context/BlocksContext'

const CalendarMenuView2 = () => {
  const {
    // blocks,
    // setBlocks,
    selectedDate,
    // setSelectedDate,
    // setSelectedDateWithTime
  } = useBlocks()

  const [currentView, setCurrentView] = useState('Tasks')
  // const [openDatePicker, setOpenDatePicker] = useState(false)

  const goLeft = () => {
    if (currentView === 'Notes') setCurrentView('Tasks')
  }

  const goRight = () => {
    if (currentView === 'Tasks') setCurrentView('Notes')
  }

  // const formatDate = (date: Date) => {
  //   const dt = DateTime.fromJSDate(date)
  //   return dt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  // }

  const getWeekday = (date: Date) => DateTime.fromJSDate(date).toFormat('cccc') // "Monday"
  const getDayMonth = (date: Date) => {
    const dt = DateTime.fromJSDate(date)
    return {
      day: dt.toFormat('d'), // "14"
      month: dt.toFormat('LLLL') // "April"
    }
  }

  // In your JSX
  const { day, month } = getDayMonth(selectedDate ?? new Date())
  const weekday = getWeekday(selectedDate ?? new Date())

  return (
    <div className='w-full h-full'>
      {/* <div className='mb-[1rem] flex w-full items-center justify-center bg-background'>
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
            className='px-3 py-0.5 text-sm font-medium'
          >
            {formatDate(selectedDate ?? new Date())}
          </Button>
        </DatePickerWithPresetsCustom>
      </div> */}

      <div className='flex w-full items-center justify-between border-b border-dashed bg-background px-4 py-2 pb-5'>
        {/* Left Arrow */}
        <button
          onClick={goLeft}
          disabled={currentView === 'Tasks'}
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-background ${
            currentView === 'Tasks'
              ? 'cursor-not-allowed bg-background'
              : 'bg-background hover:bg-gray-300'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Center Title */}
        <h1 className='text-md font-medium'>{currentView}</h1>

        {/* Right Arrow */}
        <button
          onClick={goRight}
          disabled={currentView === 'Notes'}
          className={`flex h-6 w-6 items-center justify-center rounded-full border-border${
            currentView === 'Notes'
              ? 'cursor-not-allowed bg-background'
              : 'bg-background hover:bg-gray-300'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className='mt-2 flex w-full items-center justify-between bg-background px-2 py-2'>
        {/* Left: Day Name */}
        <div className='text-xl font-medium'>{weekday}</div>

        {/* Right: Day + Month with red month */}
        <div className='text-lg font-medium'>
          {day} <span className='text-red-500'>{month}</span>
        </div>
      </div>

      {currentView === 'Tasks' && <TaskView />}
      {currentView === 'Notes' && <NotesView />}
    </div>
  )
}

export default CalendarMenuView2
