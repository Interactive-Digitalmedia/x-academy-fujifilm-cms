import { Label } from '@/components/ui/label'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import RepeatIcon from './icons/Block/RepeatIcon'
import { Item, Recurrence } from '@/types'

type RecurringOptionsProps = {
  recurrence: Recurrence
  setRecurrence: React.Dispatch<React.SetStateAction<Recurrence>>
  selectedBlockForSidebar: Item
}

export function RecurringOptions({
  recurrence,
  setRecurrence,
  selectedBlockForSidebar
}: RecurringOptionsProps) {
  const [showRecurringOptions, setShowRecurringOptions] = useState(false)

  useEffect(() => {
    setShowRecurringOptions(false)
  }, [selectedBlockForSidebar])

  const weekdays = [
    { id: 'monday', label: 'M' },
    { id: 'tuesday', label: 'T' },
    { id: 'wednesday', label: 'W' },
    { id: 'thursday', label: 'T' },
    { id: 'friday', label: 'F' },
    { id: 'saturday', label: 'S' },
    { id: 'sunday', label: 'S' }
  ]

  const handleFrequencyChange = (type: NonNullable<Recurrence['type']>) => {
    setRecurrence((prev) => ({
      ...prev,
      type: prev.type === type ? null : type
    }))
  }
  const handleDayToggle = (day: string, isChecked: boolean) => {
    setRecurrence((prevRecurrence) => {
      const currentDays = prevRecurrence.daysOfWeek ?? []
      const updatedDays = isChecked
        ? [...currentDays, day]
        : currentDays.filter((d) => d !== day)

      return { ...prevRecurrence, daysOfWeek: updatedDays }
    })
  }

  return (
    <div className='relative'>
      <Button
        onPress={() => setShowRecurringOptions((prev) => !prev)}
        className='bg-secondary capitalize'
        startContent={
          <RepeatIcon
            className={` ${recurrence.type || selectedBlockForSidebar.parentId ? 'text-[#00A76F]' : 'text-[#FF3E3E]'} `}
          />
        }
        isDisabled={!!selectedBlockForSidebar.parentId}
        size='sm'
      >
        {selectedBlockForSidebar.parentId
          ? 'Repeating'
          : recurrence.type || 'Does not repeat'}
      </Button>

      {showRecurringOptions && (
        <div className='absolute left-0 right-0 z-50 mt-2 w-[312px] space-y-4 rounded-lg border border-border bg-background px-4 py-5 shadow-lg'>
          <div className='flex gap-2'>
            <Button
              size='sm'
              //   variant={
              //     recurrence.recurrenceType === 'daily' ? 'solid' : 'ghost'
              //   }
              onPress={() => handleFrequencyChange('daily')}
              className={cn(
                'border',
                recurrence.type === 'daily'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'bg-transparent text-disable'
              )}
            >
              Daily
            </Button>
            <Button
              size='sm'
              onPress={() => handleFrequencyChange('weekly')}
              className={cn(
                'border',
                recurrence.type === 'weekly'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'bg-transparent text-disable'
              )}
            >
              Weekly
            </Button>
            <Button
              size='sm'
              onPress={() => handleFrequencyChange('monthly')}
              className={cn(
                'border',
                recurrence.type === 'monthly'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'bg-transparent text-disable'
              )}
            >
              Monthly
            </Button>
            <Button
              size='sm'
              onPress={() => handleFrequencyChange('yearly')}
              className={cn(
                'border',
                recurrence.type === 'yearly'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'bg-transparent text-disable'
              )}
            >
              Yearly
            </Button>
          </div>

          <div className='flex w-full items-center justify-between'>
            <Label htmlFor='recurrenceInterval'>Frequency</Label>
            <Input
              id='recurrenceInterval'
              type='number'
              min={1}
              max={99}
              value={recurrence.interval?.toString() || ''}
              onChange={(e) => {
                const val = e.target.value
                setRecurrence({
                  ...recurrence,
                  interval: val === '' ? 0 : parseInt(val)
                })
              }}
              size='sm'
              className='w-max'
            />
          </div>

          {recurrence.type === 'weekly' && (
            <div>
              <div className='flex flex-wrap justify-between gap-2'>
                {weekdays.map((day) => (
                  <Button
                    key={day.id}
                    size='sm'
                    onPress={() =>
                      handleDayToggle(
                        day.id,
                        !recurrence.daysOfWeek?.includes(day.id)
                      )
                    }
                    className={cn(
                      'flex h-7 w-7 min-w-2 max-w-7 items-center justify-center rounded-full border text-xs',
                      recurrence.daysOfWeek?.includes(day.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-secondary-foreground'
                    )}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* {recurrence.recurrenceType === 'monthly' && (
            <div>
              <Label htmlFor='recurrenceDayOfMonth'>Day of month</Label>
              <Input
                id='recurrenceDayOfMonth'
                type='number'
                min={1}
                max={31}
                value={recurrence.recurrenceDayOfMonth?.toString() || ''}
                onChange={(e) =>
                  setRecurrence({
                    ...recurrence,
                    recurrenceDayOfMonth: parseInt(e.target.value) || 1
                  })
                }
                className='border-gray-700 bg-gray-800'
              />
            </div>
          )} */}

          {/* {recurrence.recurrenceType === 'yearly' && (
            <div className='space-y-2'>
              <div>
                <Label htmlFor='recurrenceMonth'>Month</Label>
                <Select
                  value={(recurrence.recurrenceMonth || 1).toString()}
                  onValueChange={(val) =>
                    setRecurrence({
                      ...recurrence,
                      recurrenceMonth: parseInt(val)
                    })
                  }
                >
                  <SelectTrigger className='w-full border-gray-700 bg-gray-800'>
                    <SelectValue placeholder='Select month' />
                  </SelectTrigger>
                  <SelectContent className='border-gray-700 bg-gray-800'>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {new Date(0, i).toLocaleString('default', {
                          month: 'long'
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor='recurrenceDayOfYear'>Day of month (DD)</Label>
                <Input
                  id='recurrenceDayOfYear'
                  placeholder='DD'
                  value={
                    recurrence.recurrenceDayOfYear
                      ? recurrence.recurrenceDayOfYear.split('-')[1]
                      : ''
                  }
                  onChange={(e) =>
                    setRecurrence((prev) => ({
                      ...prev,
                      recurrenceDayOfYear: `${
                        prev.recurrenceDayOfYear?.split('-')[0] ||
                        new Date().toISOString().slice(5, 7)
                      }-${e.target.value.padStart(2, '0')}`
                    }))
                  }
                  className='w-24 border-gray-700 bg-gray-800'
                />
              </div>
            </div>
          )} */}

          <div className='flex items-center justify-between'>
            <Label htmlFor='endsOn'>End Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    'justify-star w-max bg-transparent text-left font-normal',
                    !recurrence.endsOn && 'text-disable'
                  )}
                >
                  {recurrence.endsOn ? (
                    format(new Date(recurrence.endsOn), 'dd-MM-yyyy')
                  ) : (
                    <CalendarDays />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className='mr-4 w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={
                    recurrence.endsOn ? new Date(recurrence.endsOn) : undefined
                  }
                  onSelect={(date) =>
                    setRecurrence({
                      ...recurrence,
                      endsOn: date ? date.toISOString() : null
                    })
                  }
                  initialFocus
                  className='z-100'
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  )
}
