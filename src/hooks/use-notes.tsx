import {
  deleteNote,
  fetchJunk,
  fetchNotes,
  junkNote,
  postCreateNote,
  updateNote,
  updateRecurringNote,
  deleteSpecificRecurringNote,
  deleteAllRecurringNote,
  updateParentRecurringNote
} from '@/api/note/noteApi'
import {
  getBlocksByParent,
  getSpaces,
  getWorkspace
} from '@/api/space/spaceApi'
import { ChannelType, Item } from '@/types'
import { AxiosError } from 'axios'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'

type Recurrence = {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly' | null
  interval: number
  daysOfWeek?: string[]
  dayOfMonth?: number | null
  month?: number | null
  endsOn?: string | null
  excludedDates?: string[] | null
}

type CreateNoteData = {
  _id: string
  title: string
  content: string
  date: string
  startTime: string
  endTime: string
  type: 'task' | 'event' | 'note'
  priority: string
  pinned: boolean
  isCompleted: boolean
  color: string
  channelId?: string
  parentId?: string
  isRecurring?: boolean
  recurrence?: Recurrence
  customColor?: string
}

interface NotesContextType {
  notes: Item[]
  selectedComponent: Item | null
  selectedBlockForSidebar: Item | null
  setNotes: (note: Item[]) => void
  refresh: boolean
  setSelectedComponent: (note: Item | null) => void
  setSelectedBlockForSidebar: (note: Item | null) => void
  //   updateNote: (id: string, data: Partial<Item>) => void
  deleteFn: (id: string) => void
  deleteSpecificRecurrenceFn: (parentId: string, occurrenceDate: string) => void
  deleteAllRecurrenceFn: (parentId: string) => void
  junkFn: (isJunk: boolean, id: string) => void
  toggleCheck: (id: string) => void
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  handleSaveTaskOrEvent: (data: any) => Promise<Item> | undefined
  handleUpdateTaskOrEvent: (
    data: any,
    showToast?: boolean,
    isUpdateAll?: boolean
  ) => Promise<Item> | undefined
  editCreateDown: string | null
  setEditCreateDown: (id: string | null) => void
  setSearchQuery: (data: string) => void
  searchQuery: string

  setChanneListRefresh: React.Dispatch<React.SetStateAction<boolean>>
  workspaceId: string
  // setWorkspaceId: React.Dispatch<React.SetStateAction<string>>
  channel: any
  // setChannel: React.Dispatch<React.SetStateAction<any>>
  searchResults: Item[]
  setSidebarView: React.Dispatch<React.SetStateAction<boolean>>
  setNoteSidebarView: React.Dispatch<React.SetStateAction<boolean>>
  setRefreshParent: React.Dispatch<React.SetStateAction<boolean>>
  sidebarView: boolean
  noteSidebarView: boolean
  parentBlock: Item | null
  childBlocks: Item[]
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export function NotesProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [notes, setNotes] = useState<Item[]>([])
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const [selectedComponent, setSelectedComponent] = useState<Item | null>(null)
  const { channelId, parentId } = useParams()
  const [refresh, setRefresh] = useState<boolean>(false)
  const [editCreateDown, setEditCreateDown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [workspaceId, setWorkspaceId] = useState<string>('')
  const [channel, setChannel] = useState<ChannelType | null>(null)
  const [ChannelListRefresh, setChanneListRefresh] = useState<boolean>(false)
  const [selectedBlockForSidebar, setSelectedBlockForSidebar] =
    useState<Item | null>(null)
  const [sidebarView, setSidebarView] = useState<boolean>(false)
  const [noteSidebarView, setNoteSidebarView] = useState<boolean>(false)
  const [parentBlock, setParentBlock] = useState<Item | null>(null)
  const [childBlocks, setChildBlocks] = useState<Item[]>([])
  const [refreshParent, setRefreshParent] = useState<boolean>(false)

  //   const [junkData, setJunkData] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspace = await getWorkspace()

        // const spaces = await getSpaces(workspace[0]?._id)
        // console.log(spaces)
        // setSpacesData(spaces)
        if (workspace?.length > 0) {
          setWorkspaceId(workspace[0]?._id) // storing work space id in state
          const spaces = await getSpaces(workspace[0]?._id)
          // console.log(spaces)

          setChannel(spaces)
          // console.log(spaces);
        }
        // else {
        //   // toast.error('Workspace not found')
        // }
      } catch (error) {
        const err = error as AxiosError
        const toastMessage =
          // @ts-expect-error custom error code
          err?.response?.data?.message || 'Unknown err. Check console'
        toast.error(toastMessage.toString())
      }
    }
    fetchData()
  }, [ChannelListRefresh])

  useEffect(() => {
    if (parentId) return
    const fetchData = async () => {
      try {
        const pathname = location.pathname
        // console.log(pathname)
        if (searchQuery && searchQuery.length < 3) return

        let response
        if (pathname.includes('/channel/junk')) {
          response = await fetchJunk()
          //   setJunkData(response.notes.length)
        } else if (channelId) {
          response = await fetchNotes({ channelId, query: searchQuery })
        } else if (
          pathname.startsWith('/channel') ||
          pathname === '/calendar'
        ) {
          response = await fetchNotes({ query: searchQuery })
        }
        if (response) {
          setNotes(response.notes)

          setParentBlock(null)
        }
        if (searchQuery && response) {
          setSearchResults(response.notes)
          setParentBlock(null)
        } else if (searchQuery === '') {
          setSearchResults([])
        }
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }

    fetchData()
  }, [channelId, refresh, location.pathname, searchQuery])

  const fetchBlocks = async () => {
    if (!workspaceId || !channelId || !parentId) {
      console.log('Missing required parameters')
      return
    }

    try {
      const response = await getBlocksByParent(workspaceId, channelId, parentId)
      // console.log('Fetched Blocks:', response)
      if (response) {
        setParentBlock(response.parentNote)
        setChildBlocks(response.childNotes)
        setNotes(response.childNotes)
      }
    } catch (error) {
      console.error('Error fetching blocks:', error)
    }
  }
  useEffect(() => {
    if (parentId && workspaceId && channelId) {
      fetchBlocks()
    }
  }, [parentId, workspaceId, channelId, refreshParent])

  const formatDateToUTC = (dateString: string): string => {
    const localDate = new Date(dateString)

    return `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`
  }

  const handleSaveTaskOrEvent = async (data: CreateNoteData) => {
    if (!data.title) {
      toast.error('Title is required')
      return
    }
    try {
      //   console.log('Received Data:', data)

      let payload: any = {
        title: data.title,
        content: data.content,
        type: data.type,
        channelId: data.channelId ?? channelId,
        isRecurring: data.isRecurring,
        customColor: data.customColor
      }
      if (data.isRecurring && data.recurrence) {
        payload.recurrence = {
          type: data.recurrence.type,
          interval: data.recurrence.interval,
          daysOfWeek: data.recurrence.daysOfWeek ?? [],
          dayOfMonth: data.recurrence.dayOfMonth ?? null,
          month: data.recurrence.month ?? null,
          endsOn: data.recurrence.endsOn ?? null,
          excludedDates: data.recurrence.excludedDates ?? null
        }
      }
      if (data.parentId) {
        payload = {
          ...payload,
          parentId: data.parentId
        }
      }

      // If it's a task, add task-specific fields
      if (data.type === 'task') {
        payload = {
          ...payload,
          dueDate: formatDateToUTC(data.date),
          priority: data.priority,
          isCompleted: data.isCompleted ?? false,
          startTime: timeStringToTimestamp(data.startTime, new Date(data.date)),
          endTime: timeStringToTimestamp(data.endTime, new Date(data.date))
        }
      }

      // If it's an event, add event-specific fields
      if (data.type === 'event') {
        payload = {
          ...payload,
          dueDate: formatDateToUTC(data.date),
          startTime: timeStringToTimestamp(data.startTime, new Date(data.date)),
          endTime: timeStringToTimestamp(data.endTime, new Date(data.date)),
          color: data.color
        }
      }

      //   console.log('Payload:', payload)

      const response: any = await postCreateNote(payload)

      console.log(`${data.type} Created Successfully:`, response)
      console.log(selectedBlockForSidebar)
      if (selectedBlockForSidebar?._id === '') {
        setSelectedBlockForSidebar(response.note.response)
      }

      toast.success(`${data.type} Created Successfully`)
      setRefresh((prev) => !prev)
      setEditCreateDown(null)
      //   handleCollapse()
      return response?.note?.response
    } catch (error) {
      console.error(`Error saving ${data.type}:`, error)
    }
  }

  function timeStringToTimestamp(timeString: string, date = new Date()) {
    if (!timeString) return null
    // Extract hours, minutes, and AM/PM from the string
    const [time, period] = timeString.split(' ')
    // eslint-disable-next-line prefer-const
    let [hours, minutes] = time.split(':').map(Number)

    // Convert 12-hour format to 24-hour format
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0

    // Set the hours and minutes on the provided date
    date.setHours(hours, minutes, 0, 0) // Set hours, minutes, seconds, and milliseconds

    return date // Returns a Date object
  }

  const isISODateString = (str: string) => {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(str)
  }

  // function removeDateFromId(idWithDate: string): string {
  //   return idWithDate.split('_')[0]
  // }

  const handleUpdateTaskOrEvent = async (
    data: CreateNoteData,
    showToast?: boolean,
    isUpdateAll?: boolean
  ) => {
    try {
      console.log('Received Data:', data)
      if (!data._id && !data.title) {
        toast.error('Title is required')
        return
      }
      // console.log('update :', data)
      // console.log('update :', isUpdateAll)

      let payload: any = {
        title: data.title,
        content: data.content,
        type: data.type,
        channelId: data.channelId ?? channelId,
        pinned: data.pinned,
        isRecurring: data.isRecurring,
        customColor: data.customColor
        // recurrenceType: data.recurrenceType,
        // recurrenceInterval: data.recurrenceInterval,
        // recurrenceDays: data.recurrenceDays,
        // recurrenceDayOfMonth: data.recurrenceDayOfMonth,
        // recurrenceMonth: data.recurrenceMonth,
        // recurrenceDayOfYear: data.recurrenceDayOfYear,
        // recurrenceEnd: data.recurrenceEnd
      }
      if (data.recurrence) {
        payload.recurrence = {
          type: data.recurrence.type,
          interval: data.recurrence.interval,
          daysOfWeek: data.recurrence.daysOfWeek ?? [],
          dayOfMonth:
            parseInt(formatDateToUTC(data.date).split('-')[2], 10) ?? null,
          month: parseInt(formatDateToUTC(data.date).split('-')[1], 10) ?? null,
          endsOn: data.recurrence.endsOn ?? null,
          excludedDates: data.recurrence.excludedDates ?? []
        }
      }
      if (data.parentId && !isUpdateAll) {
        payload = {
          ...payload,
          parentId: data.parentId
        }
      }

      // If it's a task, add task-specific fields
      if (data.type === 'task') {
        payload = {
          ...payload,
          ...(data.date && { dueDate: formatDateToUTC(data.date) }),
          ...(data.priority && { priority: data.priority }),
          isCompleted: data.isCompleted ?? false,

          startTime: isISODateString(data.startTime)
            ? data.startTime
            : timeStringToTimestamp(data.startTime, new Date(data.date)),
          endTime: isISODateString(data.endTime)
            ? data.endTime
            : timeStringToTimestamp(data.endTime, new Date(data.date))
        }
      }

      // If it's an event, add event-specific fields
      if (data.type === 'event') {
        payload = {
          ...payload,
          dueDate: formatDateToUTC(data.date),
          startTime: isISODateString(data.startTime)
            ? data.startTime
            : timeStringToTimestamp(data.startTime, new Date(data.date)),
          endTime: isISODateString(data.endTime)
            ? data.endTime
            : timeStringToTimestamp(data.endTime, new Date(data.date)),
          color: data.color
        }
      }

      // console.log('Payload:', payload)
      let response
      if (isUpdateAll) {
        // Remove dueDate from payload if it exists
        if ('dueDate' in payload) {
          delete payload.dueDate
          delete payload.isRecurring
        }
        if (data.parentId) {
          response = await updateParentRecurringNote(payload, data.parentId)
          // console.log('All update from instances')
        } else {
          // console.log('All update from parent')
          response = await updateParentRecurringNote(payload, data?._id)
        }
      } else if (payload.isRecurring && payload.parentId) {
        // console.log('Specific update')
        response = await updateRecurringNote(
          payload,
          payload.parentId,
          payload.dueDate
        )
      } else {
        // console.log("normal update");
        response = await updateNote(payload, data._id)
      }

      console.log(`${data.type} Updated Successfully:`, response)
      if (response.overridden && selectedBlockForSidebar) {
        setSelectedBlockForSidebar(response.overridden)
      }
      // console.log(showToast)
      if (!showToast) {
        toast.success(`${data.type} Updated Successfully`)
      }

      setRefresh((prev) => !prev)
      setEditCreateDown(null)
      if (parentId) {
        setRefreshParent((prev) => !prev)
      }
      return response.note
      //   handleCollapse()
      //   handleCancelEdit()
    } catch (error) {
      console.error(`Error saving ${data.type}:`, error)
    }
  }

  //   const updateNote = (id: string, data: Partial<Item>) => {
  //     // console.log('in hook', notes)

  //     setNotes((prev) =>
  //       prev.map((note) => (note._id === id ? { ...note, ...data } : note))
  //     )
  //   }

  const junkFn = async (isJunk: boolean, selectedTaskId: string) => {
    try {
      if (selectedTaskId) {
        const payload = {
          isJunk: isJunk
        }
        const response = await junkNote(payload, selectedTaskId)
        // posthog.capture('user_deleted_a_task')
        console.log('Junked Successfully:', response)
        toast.success(`${isJunk ? 'Junked' : 'Restored'} Successfully`)
        setRefresh((prev) => !prev)
        setRefreshParent((prev) => !prev)
        // closePopup()
      }
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }
  const deleteFn = async (selectedTaskId: string) => {
    try {
      if (selectedTaskId) {
        const response = await deleteNote(selectedTaskId)
        // posthog.capture('user_deleted_a_task')
        console.log('Deleted Successfully:', response)
        toast.success('Deleted Successfully')
        setRefresh((prev) => !prev)
        // closePopup()
      }
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  const deleteSpecificRecurrenceFn = async (
    parentId: string,
    occurrenceDate: string
  ) => {
    try {
      if (parentId) {
        console.log(parentId, occurrenceDate)
        const response = await deleteSpecificRecurringNote(
          parentId,
          occurrenceDate
        )
        // posthog.capture('user_deleted_a_task')
        console.log('Deleted Successfully:', response)
        toast.success('Deleted Successfully')
        setRefresh((prev) => !prev)
        // closePopup()
      }
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }
  const deleteAllRecurrenceFn = async (parentId: string) => {
    try {
      if (parentId) {
        // console.log(parentId)
        const response = await deleteAllRecurringNote(parentId)
        // posthog.capture('user_deleted_a_task')
        console.log('Deleted Successfully:', response)
        toast.success('Deleted Successfully')
        setRefresh((prev) => !prev)
        // closePopup()
      }
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  const toggleCheck = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note._id === id ? { ...note, checked: !note.isCompleted } : note
      )
    )
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        // updateNote,
        refresh,
        setNotes,
        junkFn,
        deleteFn,
        toggleCheck,
        setSelectedComponent,
        selectedComponent,
        setRefresh,
        handleSaveTaskOrEvent,
        handleUpdateTaskOrEvent,
        setEditCreateDown,
        editCreateDown,
        setSearchQuery,
        searchQuery,
        setChanneListRefresh,
        channel,
        workspaceId,
        searchResults,
        selectedBlockForSidebar,
        setSelectedBlockForSidebar,
        sidebarView,
        setSidebarView,
        setRefreshParent,
        parentBlock,
        childBlocks,
        deleteSpecificRecurrenceFn,
        deleteAllRecurrenceFn,
        noteSidebarView,
        setNoteSidebarView
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
}
