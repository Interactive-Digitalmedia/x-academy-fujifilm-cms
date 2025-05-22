import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button
} from '@nextui-org/react'

interface PriorityDropdownProps {
  customColor: string | null
  setCustomColor: (value: string) => void
  buttonSize?: 'sm' | 'md' | 'lg'
  type?: string | null
}

const priorityOptions = [
  { color: '#3B82F6' }, // Blue
  { color: '#29A383' }, // Green
  { color: '#FEA000' }, // Yellow
  { color: '#5B5BD6' }, // Purple
  { color: '#d2f1f7' }, // Light Blue
  { color: '#EF5DA8' }, // Pink
  { color: '#F55555' }, // Red
  { color: '#B8BAF8' }, // Lavender
  { color: '#ACDEC8' }, // Light Green
  { color: '#FF0000' } // Bright Red
]

const CustomColorDropDown = ({
  customColor,
  setCustomColor,
  buttonSize = 'md',
  type
}: PriorityDropdownProps) => {
  // Check if customColor is provided, otherwise set a default based on type
  const colorForType =
    type === 'task' ? '#d2f1f7' : type === 'event' ? '#3B82F6' : undefined
  const selectedColor = customColor || colorForType

  const selectedOption = priorityOptions.find(
    (opt) => opt.color === selectedColor
  )
  const iconColor = selectedOption?.color || '#0D70FE'

  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <Button className='gap-1 bg-secondary' size={buttonSize}>
          <div
            className='h-[14px] w-[14px] rounded-full border'
            style={{ backgroundColor: iconColor }}
          />
          Color
        </Button>
      </PopoverTrigger>

      <PopoverContent className='flex max-w-44 flex-row flex-wrap gap-2 p-4'>
        {priorityOptions.map((option, index) => {
          const isSelected = selectedColor === option.color
          return (
            <div
              key={index}
              onClick={() => setCustomColor(option.color)}
              className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full ${isSelected ? 'border' : ''}`}
              style={{
                borderColor: isSelected ? option.color : undefined
              }}
            >
              <div
                className='h-4 w-4 rounded-full'
                style={{ backgroundColor: option.color }}
              />
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

export default CustomColorDropDown
