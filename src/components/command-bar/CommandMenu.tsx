import { fetchNotes } from '@/api/note/noteApi'
// import { useNotes } from '@/hooks/use-notes'
import { Item } from '@/types'
import { Checkbox, Link } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
// import TaskActionList from './TaskActionList'

interface CommandMenuProps {
  isOpen: boolean
  onClose: () => void
}

const NotePopup: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(isOpen)
  // const { searchResults, searchQuery, setSearchQuery } = useNotes()
  const inputAreaRef = useRef<HTMLInputElement>(null)
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery && searchQuery.length < 3) return
        setLoading(true)

        let response = await fetchNotes({ query: searchQuery })

        if (searchQuery && response) {
          setSearchResults(response.notes)
          setLoading(false)
        } else if (searchQuery === '') {
          setSearchResults([])
        }
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }

    fetchData()
  }, [searchQuery])

  useEffect(() => {
    // console.log('1')
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup()
      }
    }

    if (isOpen) {
      setIsVisible(true) // Start transition when opening
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  // useEffect(() => {
  //   console.log('2')
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault()
  //       setIsVisible((isVisible) => !isVisible)
  //     }
  //   }
  //   document.addEventListener("keydown", down)
  //   return () => document.removeEventListener("keydown", down)
  // }, [])

  const closePopup = () => {
    setIsVisible(false) // Trigger exit transition
    setTimeout(onClose, 300) // Delay unmounting by the transition duration (300ms)
  }
  useEffect(() => {
    if (inputAreaRef.current) {
      inputAreaRef.current.focus()
      inputAreaRef.current.select()
    }
  }, [isOpen])

  const truncateWords = (text: string, wordLimit: number) => {
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <div
        ref={popupRef}
        className={`flex w-full max-w-4xl transform flex-col rounded-custom bg-zinc-100 transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <section className='flex flex-col rounded-none text-center text-xl font-semibold tracking-tighter text-zinc-600'>
          <div className='flex w-full flex-col rounded-[25px] bg-zinc-100 py-5 max-md:max-w-full'>
            <header className='ml-6 flex gap-6 self-start text-xl font-bold tracking-tighter text-neutral-500 max-md:ml-2.5'>
              <img
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/d7064adaaafec8217c38817d7be09e99d5173cd71b4d09ceb3fe475c564a8262?placeholderIfAbsent=true&apiKey=a84b5e229ec542c4aeb292f79e8429f3'
                alt=''
                className='aspect-square w-[55px] shrink-0 object-contain'
              />
              <input
                ref={inputAreaRef}
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full self-stretch border-none bg-transparent text-2xl font-bold tracking-tighter text-zinc-800 focus:outline-none max-md:max-w-full'
                placeholder='Search...'
                aria-label='New Task'
                // onKeyDown={handleKeyDown}
              />
            </header>
            <hr className='mt-4 min-h-[1px] w-full border border-solid border-gray-300 max-md:max-w-full' />
            {/* <TaskActionButton /> */}
            {/* <TaskActionList /> */}
            <div className='mb-4 mt-6 h-[70vh] space-y-4 overflow-y-auto p-4'>
              {/* <Lists
                activeCreator={editCreateDown}
                setActiveCreator={setEditCreateDown}
              /> */}

              {loading ? (
                <p className='text-center text-gray-500'>Loading...</p>
              ) : searchQuery.length > 0 && searchResults.length === 0 ? (
                <p className='text-center text-gray-500'>No results found.</p>
              ) : (
                searchResults.map((note) => (
                  <div className='cursor-pointer rounded-lg border border-gray-200 transition-shadow hover:shadow-sm'>
                    <div
                      className='flex w-[90%] items-center justify-between gap-2 p-4'
                      // onClick={() => handleStartEdit(note._id)}
                    >
                      <div className='flex items-center justify-between gap-2'>
                        {note.isCompleted !== undefined && (
                          <button
                            // onClick={() => handleToggleCheck(note._id)}
                            className='mt-1 flex-shrink-0 text-gray-400 hover:text-gray-600'
                          >
                            {note.type === 'task' && (
                              <Checkbox
                                isSelected={note.isCompleted}
                                // onValueChange={() =>
                                //   handleSave(
                                //     note._id,
                                //     note?.type ?? 'task',
                                //     note?.isCompleted ?? false
                                //   )
                                // }
                              ></Checkbox>
                            )}
                          </button>
                        )}

                        {note.type == 'event' && (
                          <Link className='mt-1 h-4 w-4 flex-shrink-0 text-gray-400' />
                        )}

                        <div className=''>
                          <h3 className='text-[15px] font-medium'>
                            {truncateWords(note.title, 20)}
                          </h3>
                          {note.content && (
                            <p className='mt-1 text-sm text-gray-600'>
                              {truncateWords(note.content, 20)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>,
    document.body
  )
}

export default NotePopup
