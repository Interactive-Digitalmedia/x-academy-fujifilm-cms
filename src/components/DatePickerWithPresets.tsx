import { addDays, format } from 'date-fns'
import { cn } from '@/lib/utils'
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
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

// for select due date
export default function DatePickerWithPresets({
  date,
  setDate,
  isRecurring,
  type
}: {
  date?: Date | undefined
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
  isRecurring?: boolean
  type: string
}) {
  // const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)

  return (
    <Popover
      open={open}
      onOpenChange={(e) => {
        setOpen(e)
      }}
    >
      <PopoverTrigger asChild>
        {/* {children} */}
        <Button
          disabled={isRecurring}
          variant={'outline'}
          className={cn(
            `w-full justify-start bg-popover-muted text-left font-normal disabled:cursor-not-allowed`,
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={-40}
        className='flex w-auto flex-col space-y-2 bg-popover-muted p-2'
      >
        <Select
          onValueChange={(value) =>
            setDate && setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger className='bg-popover-muted'>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent className='bg-popover-muted' position='popper'>
            <SelectItem value='0'>Today</SelectItem>
            <SelectItem value='1'>Tomorrow</SelectItem>
            <SelectItem value='3'>In 3 days</SelectItem>
            <SelectItem value='7'>In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          {type === 'recur' ? (
            <Calendar
              mode='single'
              selected={date}
              onSelect={(e) => {
                setDate && setDate(e)
                setOpen(false)
              }}
              fromDate={new Date()}
            />
          ) : (
            <Calendar
              mode='single'
              selected={date}
              onSelect={(e) => {
                setDate && setDate(e)
                setOpen(false)
              }}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
