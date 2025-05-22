import { useState } from 'react'
import { Item } from '@/types'
import { Calendar2 } from './ui/calendar2'
import { Checkbox } from '@nextui-org/react'
import { Link } from 'lucide-react'
import { useNotes } from '@/hooks/use-notes'
import { useDrag } from 'react-dnd'
import { useBlocks } from '../context/BlocksContext'
import clsx from 'clsx'
import RepeatIcon from './icons/Block/RepeatIcon'
import CalendarMenuView2 from './CalendarMenuView2'
import { LayoutList, Calendar } from 'lucide-react'
import useGlobalStore from '@/state/GlobalState'
import { useLocation, useNavigate } from 'react-router-dom'
// import { usePlan } from '@/context/PlanContext'
// import { usePlan } from '@/context/PlanContext'

// type CalendarMenuProps = {
//   // selectedDate: Date | undefined
//   // setSelectedDate: (date: Date | undefined) => void
//   // blocks: Item[] | null
//   onBlockClick?: (block: Item) => void
//   // setBlocks: React.Dispatch<React.SetStateAction<Item[]>>
// }
const CalendarMenu = () => {
  const navigate = useNavigate()
  const {
    handleUpdateTaskOrEvent,
    notes,
    setSelectedBlockForSidebar,
    setSidebarView,
    handleSaveTaskOrEvent
  } = useNotes()

  const {
    blocks,
    setBlocks,
    selectedDate,
    setSelectedDate,
    setSelectedDateWithTime
  } = useBlocks()

  const [activeTab, setActiveTab] = useState<'myDay' | 'overdue' | 'someday'>(
    'myDay'
  )
  const { calendarView, setCalendarView } = useGlobalStore()
  // const {isTrialActive, loading } = usePlan()

  // if (loading) return null // or a spinner
  // const isButtonDisabled = !isTrialActive
  // const [view, setView] = useState<number>(1)
  const location = useLocation()
  const handleSave = (
    noteId: string,
    noteType: string,
    isSelected: boolean,
    parentId: string,
    dueDate: string
  ) => {
    const data: any = {
      _id: noteId,
      isCompleted: !isSelected,
      type: noteType
    }
    // Optimistically update state
    setBlocks((prevBlocks: Item[]) =>
      prevBlocks
        ? prevBlocks.map((block) =>
            block._id === noteId
              ? { ...block, isCompleted: !isSelected }
              : block
          )
        : prevBlocks
    )
    // Update in backend
    if (parentId && dueDate) {
      data.parentId = parentId
      data.dueDate = dueDate
    }
    handleUpdateTaskOrEvent(data)
  }
  const handleOpenModal = (block: Item) => {
    setSelectedBlockForSidebar(block)
    setSidebarView(true)
  }
  // :white_check_mark: Today's Date (ignoring time)
  const today = new Date(selectedDate ?? new Date())
  today.setHours(0, 0, 0, 0)
  // :white_check_mark: Filter blocks based on tab selection
  const overdueBlocks =
    notes?.filter(
      (block) =>
        block.dueDate &&
        new Date(block.dueDate) < today &&
        block.isCompleted === false &&
        block.isRecurring === false &&
        block.type === 'task'
    ) || []
  const filteredBlocks: Item[] =
    activeTab === 'myDay'
      ? blocks?.filter((block) => {
          const due = block?.dueDate
          const isValidDueDate =
            due &&
            due.trim() !== '' &&
            due !== 'NaN-NaN-NaN' &&
            !isNaN(new Date(due).getTime())
          return (
            !block?.startTime &&
            !block?.endTime &&
            block?.type === 'task' &&
            isValidDueDate
          )
        }) || []
      : activeTab === 'overdue'
        ? // ? notes?.filter(
          //     (block) =>
          //       block.dueDate &&
          //       new Date(block.dueDate) < today &&
          //       block.isCompleted === false
          //   ) || []
          overdueBlocks
        : activeTab === 'someday'
          ? notes?.filter((block) => {
              const due = block.dueDate
              return (
                block.type === 'task' &&
                block.isCompleted === false &&
                (!due ||
                  due === 'NaN-NaN-NaN' ||
                  due.trim() === '' ||
                  isNaN(new Date(due).getTime()))
              )
            }) || []
          : []
  const handleSelectDate = (date: any) => {
    if (!date) return;
    const pathname = location.pathname
    const match = pathname.match(/^\/calendar\/(.+)$/)
    if (match && match[0]) {
      navigate('/calendar')
    }
    console.log('dd :', date)
    setSelectedDate(date)
    setSelectedDateWithTime(date)
  }
  const handleAddTask = async (title: string) => {
    if (!title) return
    const newTask = {
      title,
      type: 'task',
      isCompleted: false,
      ...(activeTab === 'myDay' && {
        date: selectedDate.toLocaleDateString('en-CA')
      })
    }
    try {
      const response = await handleSaveTaskOrEvent(newTask)
      // console.log(response)
      if (response) {
        setBlocks((prevBlocks) => [...prevBlocks, response])
      }
    } catch (error) {
      console.error('Error saving tasks:', error)
    }
  }
  return (
    <div className='flex h-full flex-col justify-between'>
      <div>
        {calendarView === 1 ? (
          <div className='h-[85vh] w-full'>
            <div className='h-full w-full'>
              {/* 20% Height Div */}
              <div className='flex max-h-[35%] min-h-[30%] w-full items-center justify-center'>
                <Calendar2
                  mode='single'
                  selected={selectedDate}
                  onSelect={(date) => handleSelectDate(date)}
                  className='mb-2 mt-4'
                />
              </div>
              {/* 80% Height Div */}
              <div className='mt-8 flex h-[65%] w-full flex-col items-center justify-center gap-3 px-2'>
                <div className='flex w-full gap-2 border-b'>
                  <button
                    className={`px-1 py-2 text-sm font-medium ${
                      activeTab === 'myDay'
                        ? 'border-b-2 border-[#1877F2] text-[#1877F2]'
                        : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('myDay')}
                  >
                    Today
                  </button>
                  <button
                    className={`px-1 py-2 text-sm font-medium ${
                      activeTab === 'someday'
                        ? 'border-b-2 border-green-500 text-green-600'
                        : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('someday')}
                  >
                    Someday
                  </button>
                  {overdueBlocks.length > 0 && (
                    <button
                      className={`px-1 py-2 text-sm font-medium ${
                        activeTab === 'overdue'
                          ? 'border-b-2 border-red-500 text-red-600'
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('overdue')}
                    >
                      Overdue
                    </button>
                  )}
                </div>
                {activeTab !== 'overdue' && (
                  <TweekTaskInput onAdd={handleAddTask} />
                )}
                <div className='w-full min-w-60 flex-1 space-y-2 overflow-y-auto'>
                  {filteredBlocks.length > 0 ? (
                    
                    filteredBlocks.map((block) => (
                      <DraggableBlock
                        key={block._id}
                        block={block}
                        onBlockClick={handleOpenModal}
                        handleSave={handleSave}
                      />
                    ))
                  ) : (
                    <p className='mt-4 text-center text-gray-500'>
                      No tasks found
                    </p>
                  )}
                  {/* <button disabled={isButtonDisabled}>Auto Scheduling</button> */}
                  {/* <div></div>
                    {isButtonDisabled?"non premium":"premium user"} */}
                </div>
              </div>
            </div>
            {/* :white_check_mark: Calendar Component */}
            {/* :white_check_mark: Tabs */}
          </div>
        ) : (
          <div className='h-[85vh] w-full'>
            <CalendarMenuView2 />
          </div>
        )}
      </div>
      {/* <div>
          <Button
            onClick={() => {
              setView((prev) => (prev === 1 ? 2 : 1))
            }}
          >
            Click me
          </Button>
        </div> */}
      <div className='z-30 flex w-full items-center justify-start'>
        <div
          className='items-left flex gap-2 text-sm'
          onClick={() => setCalendarView(calendarView === 1 ? 2 : 1)}
        >
          {calendarView === 1 ? (
            <>
              <LayoutList className='h-4 w-4' />
            </>
          ) : (
            <>
              <Calendar className='h-4 w-4' />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
const DraggableBlock = ({ block, onBlockClick, handleSave }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK',
    item: { ...block },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  // console.log(block)
  return (
    <div
      key={block._id}
      ref={drag}
      className={`relative flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border p-2 transition-all hover:bg-note-hover ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      onClick={() => onBlockClick(block)}
    >
      <div className='flex items-center gap-1'>
        {/* :white_check_mark: Task Checkbox */}
        {block.type === 'task' && (
          <Checkbox
            size='sm'
            isSelected={block.isCompleted}
            onValueChange={() =>
              handleSave(
                block._id,
                block?.type ?? 'task',
                block?.isCompleted ?? false,
                block.parentId ?? null,
                block.dueDate ?? null
              )
            }
          />
        )}
        {/* :white_check_mark: Event Link */}
        {block.type === 'event' && <Link className='h-4 w-4 text-gray-400' />}
        {/* :white_check_mark: Task/Event Title */}
        <div>
          <h3 className='text-[14px] font-normal text-foreground opacity-80'>
            {block.title && block.title.length > 25
              ? block.title.slice(0, 32) + '...'
              : block.title || 'Untitled Task'}
          </h3>
        </div>
      </div>
      {block.parentId && <RepeatIcon className='text-[#00A76F]' />}
    </div>
  )
}
export default CalendarMenu
const TweekTaskInput = ({ onAdd }: { onAdd: (title: string) => void }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAdd(inputValue.trim())
      setInputValue('')
      setIsFocused(false)
    }
  }
  return (
    <div
      className={clsx(
        'w-full transform rounded-md border transition-all duration-200 ease-in-out',
        isFocused
          ? 'scale-[1.0001] border-gray-300 bg-background px-4 py-2 shadow-md'
          : 'scale-100 border-gray-300 bg-background px-3 py-1'
      )}
    >
      <input
        type='text'
        placeholder='Add a task...'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          if (!inputValue.trim()) setIsFocused(false)
        }}
        onKeyDown={handleKeyDown}
        className='w-full bg-transparent text-sm placeholder-gray-500 outline-none'
      />
    </div>
  )
}
