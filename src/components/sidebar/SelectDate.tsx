import React, { useEffect } from 'react'
// import PriorityDropdown from './PriorityDropdown'
import { useState } from 'react'
// importing for datePicker
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
// import SelectChannelDropdown from '@/pages/Channel1/Components/SelectChannelDropdown'
import { ChannelType, Item } from '@/types'
import { useNotes } from '@/hooks/use-notes'
import { Button } from '@nextui-org/react'
import DueDateIcon from '../icons/Block/DueDateIcon'
import PriorityDropdown from '@/pages/Channel1/Components/PriotityDropdown'

// interface Task {
//   name: string
//   description: string
//   priority: string
//   dueDate: string
//   channelId: string[]
// }
interface SelectDateProps {
  selectedDate?: Date
  task?: Item
  setTask: React.Dispatch<React.SetStateAction<Item>>
  selectedChannel: ChannelType | null
  setSelectedChannel: React.Dispatch<React.SetStateAction<ChannelType | null>>
}

const SelectDate: React.FC<SelectDateProps> = ({
  selectedDate,
  task,
  setTask,
  // selectedChannel,
  setSelectedChannel
}) => {
  const [selectedDateOption, setSelectedDateOption] = useState<string>('Today')
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  // const [isDeleting, setIsDeleting] = useState(false)
  // const [errorName, setErrorName] = useState<string | null>(null)
  // const [disable, setDisable] = useState<boolean>(true)

  const [isOpen, setIsOpen] = useState(false)
  // const [isPriorityOpen, setIsPriorityOpen] = useState(false)
  const { channel } = useNotes()

  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const nextDay = new Date(today)
    nextDay.setDate(today.getDate() + 2)

    const formattedToday = today.toISOString().split('T')[0]
    const formattedTomorrow = tomorrow.toISOString().split('T')[0]
    const formattedNextDay = nextDay.toISOString().split('T')[0]
    const formattedSelectedDate = selectedDate?.toISOString().split('T')[0]
    if (formattedSelectedDate === formattedToday) {
      setSelectedDateOption('Today')
    } else if (formattedSelectedDate === formattedTomorrow) {
      setSelectedDateOption('Tomorrow')
    } else if (formattedSelectedDate === formattedNextDay) {
      setSelectedDateOption('Day After Tomorrow')
    } else {
      {
        selectedDate && setSelectedDateOption(format(selectedDate, 'MMM d'))
      }
    }

    setDate(selectedDate)
    {
      selectedDate &&
        handleTaskChange('dueDate', selectedDate.toISOString().split('T')[0])
    }
  }, [selectedDate])

  useEffect(() => {
    if (task) {
      // console.log('date format :', new Date(task.dueDate))
      // console.log('task form due date :', task.dueDate)
      setTask((prevTask) => ({
        ...prevTask,
        priority: task.priority,
        dueDate: task.dueDate
      }))
      handleTaskChange('priority', task.priority)
      if (task.dueDate) {
        const dt = new Date(task.dueDate)
        setDate(dt)
        handleCalenderSelect(dt)
        handleTaskChange('dueDate', dt.toLocaleDateString('en-CA'))
      }
      if (task) {
        const matchedChannel = channel?.find((ch: ChannelType) =>
          (task.channelId as string[])?.includes(ch._id)
        )
        setSelectedChannel(matchedChannel || null)
      } else {
        setSelectedChannel(null)
      }
    }
  }, [task, channel])

  const handleTaskChange = (field: string, value: any) => {
    setTask((prevTask) => ({
      ...prevTask,
      [field]: value
    }))
  }
  useEffect(() => {
    setSelectedPriority(task?.priority || null)
  }, [task])

  const handleDateChange = (dateOption: string) => {
    setSelectedDateOption(dateOption)
    setIsOpen(false)
  }

  const handlePriorityChange = (priority: string) => {
    console.log('pp :', priority)
    setSelectedPriority(priority)
    handleTaskChange('priority', priority)
    // setIsPriorityOpen(false)
  }

  // const updateDueDate = async(option: string) => {
  //   const newDate = new Date()

  //   switch (option) {
  //     case 'Today':
  //       setDate(newDate)
  //       break
  //     case 'Tomorrow':
  //       newDate.setDate(newDate.getDate() + 1)
  //       setDate(newDate)
  //       break
  //     case 'Dayafter':
  //       newDate.setDate(newDate.getDate() + 2)
  //       setDate(newDate)
  //       break
  //   }
  //   handleDateChange(option)
  // }

  const updateDueDate = async (option: string) => {
    const newDate = new Date()

    switch (option) {
      case 'Today':
        setDate(newDate)
        handleTaskChange('dueDate', newDate.toISOString().split('T')[0])
        break
      case 'Tomorrow':
        newDate.setDate(newDate.getDate() + 1)

        setDate(newDate)
        handleTaskChange('dueDate', newDate.toISOString().split('T')[0])
        break
      case 'Dayafter':
        newDate.setDate(newDate.getDate() + 2)
        setDate(newDate)
        handleTaskChange('dueDate', newDate.toISOString().split('T')[0])
        break
    }
    handleDateChange(option)
  }

  // const handleCalenderSelect = (newDate: Date | undefined) => {
  //   if (newDate) {
  //     setDate(newDate)
  //     setSelectedDateOption(format(newDate, 'MMM d'))
  //     handleTaskChange('dueDate', newDate.toISOString().split('T')[0])
  //     setIsOpen(false)
  //   }
  // }

  const handleCalenderSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setSelectedDateOption(format(newDate, 'MMM d'))

      handleTaskChange('dueDate', format(newDate, 'yyyy-MM-dd'))

      setIsOpen(false)
    }
  }
  // const getBorderColor = (priority: string) => {
  //   switch (priority) {
  //     case 'high':
  //       return 'border-[#F43E5F] border-1.5 text-[#F43E5F]'
  //     case 'medium':
  //       return 'border-[#EFC000] border-1.5 text-[#EFC000]'
  //     case 'low':
  //       return 'border-green-500 border-1.5 text-green-500'
  //     default:
  //       return 'border-1 border-gray-300'
  //   }
  // }

  // useEffect(() => {
  //   setDisable(!task?.name.trim())
  // }, [task?.name])

  return (
    <div className='z-1 w-full max-w-[680px] rounded-lg'>
      <div className='my-2 w-full items-center gap-4 whitespace-nowrap text-center text-sm font-medium text-foreground'>
        <div className='flex gap-3'>
          {/* Date Button */}
          <div className=''>
            {/* <button
              className='my-auto flex min-w-[60px] items-center justify-center gap-2 self-stretch rounded-lg border border-solid border-border p-2'
              onClick={() => {
                setIsOpen(() => !isOpen)
                setIsPriorityOpen(false)
              }}
            >
              {selectedDateOption}
            </button> */}
            <Button
              // className='bg-[#F5F5F5]'
              onPress={() => {
                setIsOpen(() => !isOpen)
                // setIsPriorityOpen(false)
              }}
              className='bg-secondary'
              // size={buttonSize}
              startContent={<DueDateIcon className='text-[#FF5A00]' />}
            >
              {selectedDateOption}
            </Button>
            {isOpen && (
              <ul className='border-grey-300 absolute z-10 mt-2 w-40 rounded-lg border bg-background p-2 shadow-md'>
                <li
                  onClick={() => {
                    updateDueDate('Today')
                  }}
                  className='block w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 hover:text-black'
                >
                  Today
                </li>
                <li
                  onClick={() => {
                    updateDueDate('Tomorrow')
                  }}
                  className='block w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 hover:text-black'
                >
                  Tomorrow
                </li>
                <li
                  onClick={() => {
                    updateDueDate('Dayafter')
                  }}
                  className='block w-full rounded-md px-3 py-2 text-left hover:bg-gray-100 hover:text-black'
                >
                  Day After
                </li>
                <li>
                  <Popover>
                    <PopoverTrigger>
                      <button className='flex w-auto gap-2 rounded-md px-3 py-2 hover:bg-gray-100 hover:text-black'>
                        <CalendarIcon />

                        <span>Pick a date</span>
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      side='right'
                      align='start'
                      className='xs:right-[7rem] relative bottom-[1rem] right-[9rem] z-[100] w-auto p-0 md:right-0'
                    >
                      <Calendar
                        mode='single'
                        selected={date}
                        onSelect={handleCalenderSelect}
                        initialFocus
                        className='z-100'
                      />
                    </PopoverContent>
                  </Popover>
                </li>
              </ul>
            )}
          </div>
          {/* Priority Button */}
          {/* <div>
            <button
              className={`my-auto flex min-w-[64px] items-center justify-center gap-2 self-stretch rounded-lg border border-solid p-2 capitalize ${selectedPriority && getBorderColor(selectedPriority)}`}
              onClick={() => {
                setIsPriorityOpen(!isPriorityOpen)
                setIsOpen(false)
              }}
            >
              {selectedPriority
                ? selectedPriority
                : task?.priority
                  ? task.priority
                  : 'Priority'}
            </button>
            {isPriorityOpen && (
              <div className=''>
                <ul className='border-grey-300 left- top- absolute z-20 mt-2 w-40 rounded-lg border bg-background p-2 shadow-md'>
                  <li
                    onClick={() => handlePriorityChange('high')}
                    className='flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-gray-100 hover:text-black'
                  >
                    High
                    <div className='h-4 w-4 rounded-full border-[1.5px] border-dashed border-[#F43E5F] bg-opacity-90'></div>
                  </li>
                  <li
                    onClick={() => handlePriorityChange('medium')}
                    className='flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-gray-100 hover:text-black'
                  >
                    Medium
                    <div className='h-4 w-4 rounded-full border-[1.5px] border-dashed border-[#EFC000] bg-opacity-90'></div>
                  </li>
                  <li
                    onClick={() => handlePriorityChange('low')}
                    className='flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-gray-100 hover:text-black'
                  >
                    Low
                    <div className='h-4 w-4 rounded-full border-[1.5px] border-dashed border-green-500 bg-opacity-90'></div>
                  </li>
                </ul>
              </div>
            )}
          </div> */}

          <PriorityDropdown
            priority={selectedPriority ?? task?.priority ?? undefined}
            setPriority={(value) => {
              handlePriorityChange(value)
            }}
          />

          {/* <SelectChannelDropdown
            channels={channel}
            selectedChannel={selectedChannel}
            onSelect={setSelectedChannel}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default SelectDate
