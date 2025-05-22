import { fetchNotes, search } from '@/api/note/noteApi'
import { Item } from '@/types'
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from '@nextui-org/react'
import { ChevronDown, Link, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import RepeatIcon from '../icons/Block/RepeatIcon'
import { useNavigate } from 'react-router-dom'

interface DeleteModalProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function SearchModal({ isOpen, onOpenChange }: DeleteModalProps) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const tabs = ['Event', 'Task', 'Note']
  const [results, setResults] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [createType, setCreateType] = useState('task')

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  const fetchInitialResults = async () => {
    try {
      const response = await fetchNotes({ limit: 10 })
      const data = response?.notes || []
      setResults(data)
      if (data.length > 0) setHoveredItem(data[0])
    } catch (error) {
      console.error('Failed to fetch initial notes:', error)
    }
  }

  useEffect(() => {
    const handler = async () => {
      if (query && query.length < 3) return
      if (query.trim() || activeFilter) {
        try {
          setLoading(true)
          let response = await search({
            query: query.trim(),
            filter: activeFilter ? activeFilter.toLowerCase() : undefined
          })
          const data = response?.notes || []
          setResults(data)
          if (data.length > 0) setHoveredItem(data[0])
          else {
            setHoveredItem(null)
          }
        } catch (error) {
          console.error('Search failed:', error)
        } finally {
          setLoading(false)
        }
      } else {
        fetchInitialResults()
      }
    }
    handler()
  }, [query, activeFilter])

  useEffect(() => {
    if (!query) fetchInitialResults()
  }, [isOpen])

  const handleClick = async (item: Item) => {
    if (onOpenChange) onOpenChange(false)

    if (item.type === 'note') {
      navigate(`/channel/${item._id}`)
    } else if (item.isRecurring) {
      navigate(`/calendar/repeating/${item._id}`)
    } else {
      navigate(`/calendar/${item._id}`)
      // setSelectedBlockForSidebar(item)
      // setSidebarView(true)
    }
  }
  const handleFilterClick = (filter: string) => {
    if (filter) {
      setActiveFilter(filter.toLowerCase())
      setCreateType(filter.toLowerCase())
    }
    // if (activeFilter === filter.toLowerCase()) {
    //   setActiveFilter(null)
    // } else {
    // }
  }

  const handleClearFilter = () => {
    setActiveFilter(null)
  }

  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery || !text) return text

    try {
      const regex = new RegExp(
        `(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
        'gi'
      )
      return text.replace(
        regex,
        '<span class="text-blue-500 font-semibold">$1</span>'
      )
    } catch (e) {
      return text
    }
  }

  const handleCreateNewClick = () => {
    if (onOpenChange) onOpenChange(false)

    const itemType = createType || activeFilter

    if (itemType === 'task' || itemType === 'event') {
      navigate('/calendar', {
        state: {
          createNew: true,
          title: query,
          type: itemType,
          hour: new Date().getHours()
        }
      })
    } else {
      navigate('/channel', {
        state: {
          createNew: true,
          title: query,
          type: 'note'
        }
      })
    }
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date()
    const tomorrow = new Date()

    yesterday.setDate(today.getDate() - 1)
    tomorrow.setDate(today.getDate() + 1)

    const isSameDate = (d1: Date, d2: Date) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()

    if (isSameDate(date, today)) return 'Today'
    if (isSameDate(date, yesterday)) return 'Yesterday'
    if (isSameDate(date, tomorrow)) return 'Tomorrow'

    return date.toLocaleDateString('en-GB')
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop='blur'
      placement='center'
      className='h-[80vh] w-screen max-w-[80%] overflow-hidden rounded-xl shadow-lg'
      hideCloseButton
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-4'>
              {/* Search Input */}
              <div className='flex w-full items-center'>
                <Input
                  startContent={<Search size={20} />}
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search notes, tasks, or events...'
                  className='w-full'
                  radius='lg'
                />
              </div>

              {/* Category Tabs */}
              <div className='flex gap-3'>
                {tabs.map((tab, index) => (
                  <div className='relative'>
                    <button
                      key={index}
                      className={`relative rounded-full border border-border px-4 text-[12px] text-gray-600 transition hover:bg-gray-200 ${
                        activeFilter === tab.toLowerCase()
                          ? 'bg-gray-200 font-semibold'
                          : 'bg-background'
                      } flex items-center justify-center gap-1`}
                      onClick={() => handleFilterClick(tab)}
                    >
                      {tab}
                    </button>
                    {activeFilter === tab.toLowerCase() && (
                      <div className='absolute -right-1 -top-1 cursor-pointer rounded-full bg-gray-500 p-[2px]'>
                        <X
                          size={12}
                          className='stroke-2 text-white'
                          onClick={(e) => {
                            e.stopPropagation()
                            handleClearFilter()
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ModalHeader>

            <ModalBody className='overflow-hidden pt-0'>
              <div className='flex h-[62vh] w-full gap-6'>
                {/* Left Panel: Scrollable List */}
                <div className='w-1/2 overflow-y-auto border-r border-border pr-2'>
                  <div className='space-y-3'>
                    {results?.map((item, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredItem(item)}
                        onClick={() => handleClick(item)}
                        className='flex cursor-pointer justify-between rounded-lg border border-border px-4 py-3 shadow-sm transition hover:bg-note-hover'
                      >
                        <div className='flex items-center'>
                          {item?.type == 'event' && (
                            <Link className='mr-2 h-4 w-4 flex-shrink-0 text-gray-400' />
                          )}
                          {item?.type === 'task' && (
                            <Checkbox
                              size='sm'
                              isSelected={item?.isCompleted}
                              // onValueChange={() =>
                              //   handleSave({
                              //     _id: item._id,
                              //     type: item?.type ?? 'task',
                              //     isCompleted: !item.isCompleted
                              //   })
                              // }
                            ></Checkbox>
                          )}
                          <div>
                            {item.title && (
                              <h4
                                className='truncate text-sm font-semibold text-foreground'
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(
                                    item?.title?.slice(0, 50) +
                                      (item?.title?.length > 50 ? '...' : ''),
                                    query
                                  )
                                }}
                              />
                            )}
                            {/* {item.title.slice(0, 50)}
                              {item.title.length > 60 && '...'}
                              
                            </h4> */}
                            {item.content && (
                              <p
                                className='truncate text-xs text-gray-500'
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(
                                    item?.content?.slice(0, 66) +
                                      (item?.content?.length > 60 ? '...' : ''),
                                    query
                                  )
                                }}
                              />
                            )}
                            {/* {item.content.slice(0, 66)}
                              {item.content.length > 60 && '...'}
                            </p> */}
                          </div>
                        </div>
                        <div className='flex flex-col items-end gap-1'>
                          {(item?.dueDate ||
                            (item?.type === 'note' && item?.createdAt)) && (
                            <span className='text-[10px] text-gray-400'>
                              {item?.dueDate && formatDate(item?.dueDate)}
                              {item?.type === 'note' &&
                                item?.createdAt &&
                                `${formatDate(item?.createdAt)}`}
                            </span>
                          )}
                          {item?.parentId && (
                            <RepeatIcon className='text-[#00A76F]' />
                          )}
                        </div>
                      </div>
                    ))}
                    {results?.length === 0 && !loading && (
                      <>
                        <p className='text-sm text-gray-500'>
                          No results found.
                        </p>
                        <div className='flex w-full cursor-pointer items-center rounded-lg border border-border pl-4 pr-3 shadow-sm transition hover:bg-note-hover'>
                          <button
                            onClick={handleCreateNewClick}
                            className='flex w-[90%] py-3'
                          >
                            <h4 className='truncate text-sm font-semibold text-foreground'>
                              Create new '{query}'
                            </h4>
                          </button>

                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                variant='bordered'
                                size='sm'
                                className='flex h-7 items-center gap-1 rounded-full border px-2 text-[12px]'
                              >
                                {createType?.charAt(0)?.toUpperCase() +
                                  createType?.slice(1)}
                                <ChevronDown size={15} />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label='Create Type'
                              onAction={(key) => setCreateType(key as string)}
                              selectedKeys={[createType]}
                              selectionMode='single'
                            >
                              <DropdownItem key='task'>Task</DropdownItem>
                              <DropdownItem key='event'>Event</DropdownItem>
                              <DropdownItem key='note'>Note</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </>
                    )}
                    {loading && (
                      <p className='text-sm text-gray-400'>Searching...</p>
                    )}
                  </div>
                </div>

                {/* Right Panel: Scrollable Card */}
                <div className='w-1/2'>
                  <Card className='border-bg flex h-[62vh] flex-col border p-5 shadow-md'>
                    {hoveredItem ? (
                      <>
                        <h2
                          className='mb-2 text-lg font-semibold text-foreground'
                          dangerouslySetInnerHTML={{
                            __html: highlightText(hoveredItem?.title, query)
                          }}
                        />
                        <div
                          className='scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent overflow-y-auto whitespace-pre-wrap pr-2 text-sm text-foreground'
                          dangerouslySetInnerHTML={{
                            __html: highlightText(hoveredItem?.content, query)
                          }}
                        />
                      </>
                    ) : (
                      <h2 className='mb-2 text-lg font-semibold text-foreground'>
                        Hover over an item to preview it
                      </h2>
                    )}
                  </Card>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default SearchModal
