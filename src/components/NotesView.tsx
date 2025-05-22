import { NotesViewList } from '@/pages/Channel1/Components/NotesViewList'
import { useNotes } from '@/hooks/use-notes'

import { Plus } from 'lucide-react'
// import { useBlocks } from './context/BlocksContext'

const NotesView = () => {
  const {
    setSelectedBlockForSidebar,
    editCreateDown,
    setEditCreateDown,
    setNoteSidebarView
  } = useNotes()

  const handleOpenSidebar = () => {
    setSelectedBlockForSidebar(null)
    setNoteSidebarView(true)
  }
  return (
    <div className='flex flex-col gap-2'>
      <button onClick={handleOpenSidebar}>
        <div className='mt-4 flex cursor-pointer items-center gap-2 rounded-lg border-1 px-2 py-2 text-primary'>
          <Plus size={20} />
          <p className='text-sm'>Create New Note</p>
        </div>
      </button>

      <NotesViewList
        activeCreator={editCreateDown}
        setActiveCreator={setEditCreateDown}
      />
    </div>
  )
}

export default NotesView
