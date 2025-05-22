import { Checkbox } from '@nextui-org/react' // Import Checkbox component if applicable
import { Item } from '@/types'
import { useDrop } from 'react-dnd'
import { useBlocks } from '../context/BlocksContext'
import { useEffect, useState } from 'react'
import RepeatIcon from './icons/Block/RepeatIcon'

const HourCells = ({
  // blocks,
  is24Hours,
  activeTabDate,
  selectedHour,
  createDemoBlock,
  handleBlockClick,
  handleTaskCompletion,
  handleMouseDown,
  handleDropOnHourCell
}: any) => {
  const [currentActiveDate, setCurrentActiveDate] = useState<Date>(new Date())

  useEffect(() => {
    if (activeTabDate) {
      setCurrentActiveDate(new Date(activeTabDate))
    }
  }, [activeTabDate])
  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: 'BLOCK',
  //   drop: (draggedItem) => {
  //     console.log(`Dropped item:`, draggedItem)
  //     // handleDropOnHourCell(draggedItem, hour);
  //   },
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver()
  //   })
  // }))

  const { blocks } = useBlocks()

  return (
    <section
      className='hour-cells-container flex h-full w-full flex-col overflow-y-auto'
      // ref={drop}
    >
      {Array(24)
        .fill(0)
        .map((_, i) => {
          let hourLabel
          if (is24Hours) {
            hourLabel = i < 10 ? `0${i}:00` : `${i}:00`
          } else {
            const period = i < 12 ? 'AM' : 'PM'
            const hour12 = i % 12 || 12
            hourLabel = `${hour12}:00 ${period}`
          }

          const now = new Date()
          const currentMinutes = now.getMinutes()
          const minuteOffset = (currentMinutes / 60) * 100

          const selectedDate = new Date(currentActiveDate)
          const isCurrentDay =
            now.getFullYear() === selectedDate.getFullYear() &&
            now.getMonth() === selectedDate.getMonth() &&
            now.getDate() === selectedDate.getDate()

          const isCurrentHour = isCurrentDay && i === now.getHours()
          // const selectedDateString = selectedDate.toLocaleDateString('en-CA')

          const blocksForThisHour = blocks?.filter((block: Item) => {
            if (!block?.startTime || !block?.endTime) return false

            const blockStart = new Date(block?.startTime)
            const blockEnd = new Date(block?.endTime)

            if (isNaN(blockStart.getTime()) || isNaN(blockEnd.getTime()))
              return false

            // const blockStartDateString = blockStart.toLocaleDateString('en-CA')
            // if (blockStartDateString !== selectedDateString) return false

            return i === blockStart.getHours()
          })

          // const [{ isOver }, drop] = useDrop(
          //   () => ({
          //     accept: 'BLOCK',
          //     drop: (draggedItem) => {
          //       console.log(`Dropped item on hour ${i}:`, draggedItem, selectedDate)
          //       handleDropOnHourCell(draggedItem, i, selectedDate) // Pass the hour index
          //     },
          //     collect: (monitor) => ({
          //       isOver: !!monitor.isOver()
          //     })
          //   }),
          //   [i]
          // )
          const [{ isOver }, drop] = useDrop(
            () => ({
              accept: 'BLOCK',
              drop: (draggedItem) => {
                console.log(
                  `Dropped item on hour ${i}:`,
                  draggedItem,
                  currentActiveDate
                )
                handleDropOnHourCell(draggedItem, i, currentActiveDate)
              },
              collect: (monitor) => ({
                isOver: !!monitor.isOver()
              })
            }),
            [i, currentActiveDate] // ← add currentActiveDate here!
          )
          return (
            <div
              className={`hour-cell relative flex h-[4rem] cursor-pointer gap-0 transition-all duration-300 ease-in-out ${
                selectedHour === i
                  ? 'rounded-lg border border-blue-300 bg-blue-200 shadow-md'
                  : 'rounded-lg hover:bg-blue-50 hover:shadow-sm'
              } ${isOver ? 'bg-green-300' : 'hover:bg-calendar_hours_hover'}`}
              key={i}
              onClick={() => {
                createDemoBlock(i)
              }}
              ref={drop}
            >
              <div className='time relative w-20 min-w-10 border-r border-border pe-2 pt-0 text-right text-xs tracking-wide text-muted-foreground'>
                {hourLabel}
              </div>

              {isCurrentHour && (
                <div
                  className='absolute left-[4.6rem] right-0 z-40 h-[2px] bg-red-500'
                  style={{ top: `${minuteOffset}%` }}
                >
                  <div
                    className='absolute left-[-5px] z-20 h-3 w-3 rounded-full bg-red-500'
                    style={{ transform: 'translateY(-40%)' }}
                  ></div>
                </div>
              )}

              <div className='relative w-full min-w-80 border-t border-border pt-2 text-left text-xs tracking-wide text-muted-foreground'>
                {blocksForThisHour
                  ?.slice(0, 7)
                  .map((block: Item, index: number) => {
                    // console.log(block)

                    const blockStart = block.startTime
                      ? new Date(block.startTime)
                      : new Date(0)
                    const blockEnd = block.endTime
                      ? new Date(block.endTime)
                      : new Date(0)

                    const blockStartMinutes = blockStart.getMinutes()
                    const totalDuration =
                      blockEnd.getTime() - blockStart.getTime()

                    const topOffset = (blockStartMinutes / 60) * 100
                    const heightPercentage =
                      (totalDuration / (60 * 60 * 1000)) * 100

                    const totalBlocks = Math.min(blocksForThisHour.length, 7)
                    const gap = 0.5
                    const availableWidth = 100 - 1 - (totalBlocks - 1) * gap
                    const blockWidth = availableWidth / totalBlocks
                    const leftOffset = 1 + index * (blockWidth + gap)
                    const isCompact = heightPercentage <= 50
                    return (
                      <div
                        className={`absolute z-20 block flex cursor-pointer p-2 transition-all duration-300 ${
                          block.type === 'event'
                            ? `rounded-md shadow-md ${
                                block.sourceMetadata?.status === 'declined'
                                  ? 'border border-blue-500 bg-white text-blue-500 line-through'
                                  : block.sourceMetadata?.status === 'tentative'
                                    ? 'border border-dashed border-white bg-[#039be5]/30 bg-[url("/tentativePattern.svg")] bg-cover bg-no-repeat text-white'
                                    : 'bg-[#039be5] text-white'
                              }`
                            : 'rounded-lg border-l-[4px] border-blue-500 bg-[#d2f1f7] text-black shadow-sm hover:shadow-lg'
                        }`}
                        style={{
                          top: `${topOffset}%`,
                          height: `${heightPercentage}%`,
                          width: `${blockWidth}%`,
                          left: `${leftOffset}%`,
                          opacity:
                            block.type === 'task' && block.isCompleted
                              ? 0.5
                              : 1,
                          backgroundColor: block.metaData?.customColor || ''
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBlockClick(block)
                        }}
                        key={block._id}
                      >
                        <div
                          className={`flex w-full ${isCompact && 'items-center gap-1'}`}
                        >
                          {block.type === 'task' && (
                            <div className='left-1 top-1'>
                              <Checkbox
                                isSelected={block.isCompleted}
                                onValueChange={() =>
                                  handleTaskCompletion(block)
                                }
                                className='border-black text-black'
                                color='primary'
                                size={isCompact ? 'sm' : 'md'}
                              />
                            </div>
                          )}

                          <div
                            className={`flex ${isCompact ? 'flex-row items-center gap-1' : 'flex-col'} `}
                          >
                            <p
                              className={`text-sm font-medium leading-tight ${
                                block.type === 'task' && block.isCompleted
                                  ? 'line-through'
                                  : ''
                              }`}
                              style={{
                                fontSize:
                                  heightPercentage <= 25 ? '10px' : '12px',
                                lineHeight: heightPercentage <= 25 ? '1' : '1.2'
                              }}
                            >
                              {block?.title}
                            </p>
                            <p
                              className='text-xs opacity-80'
                              style={{
                                fontSize:
                                  heightPercentage <= 25 ? '10px' : '12px',
                                lineHeight: heightPercentage <= 25 ? '1' : '1.2'
                              }}
                            >
                              {blockStart
                                .toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: !is24Hours
                                })
                                .toLowerCase()}{' '}
                              -{' '}
                              {blockEnd
                                .toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: !is24Hours
                                })
                                .toLowerCase()}
                            </p>
                          </div>
                        </div>
                        {block.sourceMetadata ? (
                          <div className='mr-2'>
                            <img
                              src='/googleCalendar.webp'
                              alt='google calendar'
                              className='h-4 w-4'
                            />
                          </div>
                        ) : (
                          ''
                        )}

                        {block.parentId && block.type === 'task' && (
                          <RepeatIcon className='text-[#00A76F]' />
                        )}
                        {/* {block.parentId && <RepeatIcon className='text-white' /> } */}

                        <div
                          className='resizer absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize'
                          onMouseDown={(e) => handleMouseDown(e, block, index)}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}
    </section>
  )
}

export default HourCells
