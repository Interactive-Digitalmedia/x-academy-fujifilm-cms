import React, { useState } from 'react'
import clsx from 'clsx'
import { useBlocks } from '../context/BlocksContext'
import { useNotes } from '@/hooks/use-notes'
import { Item } from '@/types'
import { useDrag } from 'react-dnd'
import { Checkbox } from '@nextui-org/react'
import { Link } from 'lucide-react'
import RepeatIcon from './icons/Block/RepeatIcon'

const TaskView = () => {
  const { blocks, setBlocks, selectedDate } = useBlocks()

  const {
    handleUpdateTaskOrEvent,
    notes,
    setSelectedBlockForSidebar,
    setSidebarView,
    handleSaveTaskOrEvent,
    setNoteSidebarView
  } = useNotes()

  const [activeTab, setActiveTab] = useState<'myDay' | 'overdue' | 'someday'>(
    'myDay'
  )

  const today = new Date(selectedDate ?? new Date())
  today.setHours(0, 0, 0, 0)

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

  const handleOpenModal = (block: Item) => {
    setSelectedBlockForSidebar(block)
    setSidebarView(true)
    setNoteSidebarView(false)
  }

  const handleSave = (
    noteId: string,
    noteType: string,
    isSelected: boolean
  ) => {
    const data = { _id: noteId, isCompleted: !isSelected, type: noteType }

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
    handleUpdateTaskOrEvent(data)
  }

  return (
    <div className='flex h-[70vh] w-full flex-col items-center justify-center gap-3 px-2'>
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
      {activeTab !== 'overdue' && <TweekTaskInput onAdd={handleAddTask} />}
      <div className='h-full w-full min-w-60 flex-1 space-y-2 overflow-y-auto'>
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
          <p className='mt-4 text-center text-gray-500'>No tasks found</p>
        )}
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
  console.log(block)

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
        {/* ✅ Task Checkbox */}
        {block.type === 'task' && (
          <Checkbox
            size='sm'
            isSelected={block.isCompleted}
            onValueChange={() =>
              handleSave(
                block._id,
                block?.type ?? 'task',
                block?.isCompleted ?? false
              )
            }
          />
        )}

        {/* ✅ Event Link */}
        {block.type === 'event' && <Link className='h-4 w-4 text-gray-400' />}

        {/* ✅ Task/Event Title */}
        <div>
          <h3 className='text-[14px] font-normal text-foreground opacity-80'>
            {block.title && block.title.length > 25
              ? block.title.slice(0, 25) + '...'
              : block.title || 'Untitled Task'}
          </h3>
        </div>
      </div>
      {block.parentId && <RepeatIcon className='text-[#00A76F]' />}
    </div>
  )
}

export default TaskView

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
