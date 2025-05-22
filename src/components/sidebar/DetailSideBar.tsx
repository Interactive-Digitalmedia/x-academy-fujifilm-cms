import useDeviceDetect from '@/hooks/useDeviceDetect'
import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import {
  ChevronRight,
  EllipsisVertical,
  Headphones,
  Trash2,
  X
} from 'lucide-react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip
} from '@nextui-org/react'
import toast from 'react-hot-toast'
// import { deleteTaskNew, postCreateTask, updateTask } from '@/api/task/taskApi'
import posthog from 'posthog-js'
import SelectDate from './SelectDate'
import {
  postCreateNote,
  updateNote,
  updateParentRecurringNote,
  updateRecurringNote
} from '@/api/note/noteApi'
import { NotesProvider } from '@/hooks/use-notes'
import { ChannelType, Item } from '@/types'
import { useFullscreen } from '@/hooks/useFullScreen'
import DeleteModal from '@/pages/Channel1/Components/DeleteModal'
import UpdateBlockModal from '../UpdateBlockModal'

interface DetailSideBarProps {
  isOpen: boolean
  onClose: () => void
  selectedTask?: Item
  isMaximized?: boolean
  setIsMaximized?: (value: boolean) => void
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

function DetailSideBar({
  selectedTask,
  setRefresh,
  isOpen,
  onClose,
  isMaximized
}: DetailSideBarProps) {
  const { elementRef, isFullscreen, toggleFullscreen } = useFullscreen()
  const updatedAt = new Date()
  const isMobile = useDeviceDetect()
  const [task, setTask] = useState<Item>({
    _id: '',
    title: '',
    content: '',
    userId: '',
    parentId: '',
    priority: null,
    pinned: false,
    isCompleted: false,
    channelId: [],
    dueDate: new Date().toISOString(),
    isRecurring: false,
    recurrence: {},
    startTime: null,
    endTime: null
  })
  const [errorName, setErrorName] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [showUnsavedChanges, setShowUnsavedChanges] = useState('')
  const [hasTriedToClose, setHasTriedToClose] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(
    null
  )
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [updateAllInstances, setUdpateAllInstances] = useState(false)

  useEffect(() => {
    if (selectedTask) {
      //   console.log('date format :', new Date(selectedTask.dueDate))
      // console.log('', selectedTask)
      setTask((prevTask) => ({
        ...prevTask,
        title: selectedTask.title,
        content: selectedTask.content,
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate
      }))
      handleTaskChange('priority', selectedTask.priority)
      //   setDate(new Date(data.dueDate))
      //   handleCalenderSelect(dt)
      if (selectedTask.dueDate) {
        const dt = new Date(selectedTask.dueDate)
        handleTaskChange('dueDate', dt.toLocaleDateString('en-CA'))
      }
    }
  }, [selectedTask, isOpen])

  const formatDate = (date: Date) => {
    if (!date) {
      return DateTime.now().toFormat("d LLLL yyyy '·' h:mm a")
    }
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return DateTime.fromJSDate(date).toFormat("d LLLL yyyy '·' h:mm a")
  }
  const validateTask = () => {
    if (!task?.title) {
      // console.log('here')
      setErrorName('Task title cannot be empty.')
      return false
    }
    setErrorName(null)
    return true
  }

  const detectChanges = () => {
    if (
      !task.title &&
      !task.content &&
      !task.priority &&
      !task.dueDate
      // !selectedChannel
    ) {
      setHasChanges(false)
      //   setShowText('');
      setShowUnsavedChanges('')
    } else {
      const formattedSelectedDueDate = selectedTask?.dueDate
        ? new Date(selectedTask.dueDate).toLocaleDateString('en-CA')
        : ''

      const isModified =
        selectedTask?.title !== task?.title ||
        selectedTask?.content !== task?.content ||
        selectedTask?.priority !== task?.priority ||
        formattedSelectedDueDate !== task?.dueDate

      // const isChannelModified =
      //   selectedTask?.channelId?.[0] !== selectedChannel?._id
      setHasChanges(isModified)
      setShowUnsavedChanges('')
      setHasTriedToClose(false)
    }
  }

  useEffect(() => {
    detectChanges()
  }, [task, selectedChannel])

  // const deleteFn = async () => {
  //   try {
  //     if (selectedTask) {
  //       // console.log('data :', task._id)
  //       await deleteNote(selectedTask._id)
  //       // posthog.capture('user_deleted_a_task')
  //       // console.log('Note Deleted Successfully:', response)
  //       toast.success('Task Deleted Successfully')
  //       closePopup()
  //     }
  //     //   setCreateTask(false)
  //     {
  //       setRefresh && setRefresh((prev: any) => !prev)
  //     }
  //     // closePopup()
  //     // setTitle('')
  //     // setContent('')
  //   } catch (error) {
  //     console.error('Error saving note:', error)
  //   }
  // }

  const handleDeleteRefresh = () => {
    closePopup()
    {
      setRefresh && setRefresh((prev: any) => !prev)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        hasChanges &&
        (event.ctrlKey || event.metaKey) &&
        event.key === 'Enter'
      ) {
        event.preventDefault()
        handleUpdate()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [task, hasChanges])

  const handleSaveTask = async () => {
    // console.log('called')
    if (!validateTask()) {
      console.log('here :', errorName)
      return // Exit the function if validation fails
    }
    if (selectedTask) {
      try {
        // console.log(task, 'Existing Task Edited')

        const payload = {
          // taskId: selectedTask._id,
          title: task.title,
          content: task.content,
          priority: task.priority,
          dueDate: task.dueDate,
          isRecurring: task.isRecurring,
          parentId: selectedTask.parentId
        }

        // await updateNote(payload, selectedTask._id)
        console.log(payload);
        
        if (updateAllInstances) {
          // console.log("parent");        
          if ('dueDate' in payload) {
            delete payload.dueDate
            delete payload.isRecurring
          }
          await updateParentRecurringNote(payload, selectedTask.parentId)
        } else if (payload.parentId && payload.dueDate) {
          // console.log("instances");  
          await updateRecurringNote(payload, payload.parentId, payload.dueDate)
        } else {
          await updateNote(payload, selectedTask._id)
          // console.log("non-recurring");  
        }
        posthog.capture('user_updated_task')
        // console.log('Task Updated Successfully:', response)
        toast.success('Task Updated Successfully')
        // resetTask()
        // setCreateTask(false)
        setUdpateAllInstances(false)
        setHasChanges(false)
        setShowUnsavedChanges('')
        if (setRefresh) {
          setRefresh((prev: any) => !prev)
        }
      } catch (error) {
        console.error('Error saving task:', error)
      }
    } else {
      // console.log('handle save is called')
      try {
        // console.log('new :', task)
        await postCreateNote(task)
        posthog.capture('user_created_task')
        // console.log('Task Created Successfully:', response)
        // resetTask()
        // setCreateTask(false)
        setHasChanges(false)
        setShowUnsavedChanges('')
        if (setRefresh) {
          setRefresh((prev: any) => !prev)
        }
      } catch (error) {
        console.error('Error saving task:', error)
      }
    }
  }

  const handleTaskChange = (field: string, value: any) => {
    setTask((prevTask) => ({
      ...prevTask,
      [field]: value
    }))
  }

  // const handleKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
  //     e.preventDefault()
  //     handleSaveTask()
  //   }
  // }
  const closePopup = () => {
    if (isMobile && hasChanges) {
      handleSaveTask()
      onClose()
      setIsDeleting(false)
    } else {
      if (hasChanges && !hasTriedToClose) {
        setShowUnsavedChanges('You have unsaved changes')
        setHasTriedToClose(true)
        return
      }
      setTimeout(() => {
        onClose()
        setHasTriedToClose(false)
        setIsDeleting(false)
      }, 300)
    }
  }

  const handleUpdate = () => {
    if (selectedTask?.parentId || selectedTask?.isRecurring) {
      setIsUpdateModalOpen(true)
    } else {
      handleSaveTask()
    }
  }
  const handleModalUpdate = () => {
    handleSaveTask()
  }

  return (
    <>
      {isOpen && (
        <div
          ref={elementRef}
          className={`${isFullscreen && 'animate-modalIn'} z-50 flex flex-col bg-background px-3 py-2 ${isMaximized ? 'w-full' : 'w-1/4'} ${isMobile ? 'h-screen max-h-screen overflow-y-auto rounded-none' : 'rounded-2xl'} ${showUnsavedChanges ? 'border-b-4 border-red-600' : ''}`}
        >
          <div
            className={`relative flex h-full flex-shrink animate-modalIn flex-col max-md:flex-col ${isFullscreen && 'mx-auto w-1/2'}`}
          >
            <div className='mt-2 items-center text-center'>
              <p className='text-sm font-extralight text-[#A9A9A9]'>
                {formatDate(updatedAt)}
              </p>
            </div>
            <div
              className={`flex h-10 ${isFullscreen ? 'justify-end' : 'justify-between'}`}
            >
              {!isFullscreen && (
                <div onClick={() => closePopup()} className='cursor-pointer'>
                  {showUnsavedChanges ? (
                    <X size={21} className='cursor-pointer stroke-1' />
                  ) : (
                    <ChevronRight size={21} className='stroke-1' />
                  )}
                </div>
              )}
              <div className='flex items-center gap-3'>
                {!isMobile &&
                  (isFullscreen ? (
                    <X
                      onClick={toggleFullscreen}
                      className='hidden cursor-pointer stroke-1'
                    />
                  ) : (
                    <Tooltip content='Focus mode'>
                      <Headphones
                        size={20}
                        onClick={toggleFullscreen}
                        className='hidden cursor-pointer stroke-1'
                      />
                    </Tooltip>
                  ))}

                {!isFullscreen && (
                  <div className='flex items-center gap-5'>
                    <Dropdown>
                      <DropdownTrigger>
                        {/* <Button variant='bordered'>Open Menu</Button> */}
                        <EllipsisVertical
                          size={20}
                          className='cursor-pointer stroke-1'
                        />
                      </DropdownTrigger>
                      <DropdownMenu aria-label='Static Actions'>
                        <DropdownItem
                          key='delete'
                          className='cursor-pointer text-red-500 data-[hover]:bg-red-500 data-[hover]:text-white'
                          onPress={() => setIsDeleteModalOpen(true)}
                        >
                          <div className='flex gap-2'>
                            <Trash2 size={20} className='stroke-1' />
                            Delete
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    {isDeleting && isMobile ? (
                      <div className='flex cursor-pointer items-center gap-2 text-gray-500'>
                        <button
                          onClick={() => setIsDeleting(false)}
                          className='rounded-[8px] bg-gray-200 px-4 py-2 text-[12px]'
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setIsDeleteModalOpen(true)
                            posthog.capture(
                              'user_clicked_notespage_createNotes_deleteIcon_delete'
                            )
                          }}
                          className='rounded-[8px] border-red-600 bg-red-600 px-4 py-2 text-[12px] text-white'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      hasChanges &&
                      isMobile && (
                        <div>
                          <button
                            className='w-full rounded-[8px] bg-[#1877F2] px-4 py-2 text-[12px] text-white'
                            onClick={() => {
                              handleSaveTask()
                            }}
                          >
                            Save
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className='flex h-full flex-col justify-between'>
              {task && (
                <div className='flex h-full flex-col gap-3'>
                  <input
                    type='text'
                    className='w-full whitespace-nowrap bg-transparent text-2xl font-semibold tracking-tighter focus:outline-none'
                    placeholder='Untitled'
                    value={task.title}
                    onChange={(e) => {
                      handleTaskChange('title', e.target.value)
                    }}
                    // onKeyDown={handleKeyDown}
                  />
                  {!isFullscreen && (
                    <NotesProvider>
                      <SelectDate
                        task={selectedTask}
                        setTask={setTask}
                        selectedChannel={selectedChannel}
                        setSelectedChannel={setSelectedChannel}
                      />
                    </NotesProvider>
                  )}
                  <textarea
                    // className='resize-none bg-transparent text-base font-medium text-neutral-500 focus:outline-none'
                    className={`flex resize-none bg-transparent text-base focus:outline-none ${isFullscreen && 'scrollbar-hide'} ${isMobile ? 'h-full' : 'h-full'}`}
                    placeholder='Add Description'
                    value={task.content}
                    onChange={(e) =>
                      handleTaskChange('content', e.target.value)
                    }
                    // rows={20}
                    // onKeyDown={handleKeyDown}
                  />{' '}
                </div>
              )}
            </div>
            {!isMobile && (
              <div className='mb-1 flex flex-col items-center justify-center gap-1'>
                {isDeleting ? (
                  <div className='m-1 flex flex-wrap items-center gap-2 text-gray-500'>
                    <Button
                      onPress={() => setIsDeleting(false)}
                      className='w-auto'
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        setIsDeleteModalOpen(true)
                        posthog.capture(
                          'user_clicked_notespage_createNotes_deleteIcon_delete'
                        )
                      }}
                      className='flex w-auto items-center gap-1 border-red-600 bg-red-600 text-white'
                    >
                      <Trash2 size={16} />
                      Proceed to Delete
                    </Button>
                  </div>
                ) : hasChanges ? (
                  // <div className='flex w-full items-center justify-center rounded-[8px] border border-dashed border-[#1877F2]'>
                  <button
                    className='m-1 w-full rounded-[8px] bg-primary px-10 py-2 text-[14px] text-white'
                    onClick={() => {
                      handleUpdate()
                    }}
                  >
                    Save Task (Ctrl ⌘ + Enter)
                  </button>
                ) : // </div>
                null}
                {showUnsavedChanges && (
                  <span className='text-start text-xs text-red-600'>
                    {showUnsavedChanges}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {selectedTask && (
        <DeleteModal
          selectedItem={selectedTask}
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          handleDeleteRefresh={handleDeleteRefresh}
        />
      )}
      <UpdateBlockModal
        isOpen={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        setUdpateAllInstances={setUdpateAllInstances}
        handleUpdate={handleModalUpdate}
      />
    </>
  )
}

export default DetailSideBar
