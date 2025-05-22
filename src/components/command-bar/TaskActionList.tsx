import React from 'react'
import EnterIcon from '../icons/EnterIcon'

import CreateTaskIcon from '../icons/CreateTaskIcon'
import CreateNoteIcon from '../icons/CreateNoteIcon'
import ShareLinkIcon from '../icons/ShareLinkIcon'
import TalkIcon from '../icons/TalkIcon'
interface ActionItem {
  icon: React.ReactNode
  text: string
}

interface TaskActionListProps {}

const TaskActionList: React.FC<TaskActionListProps> = () => {
  const actions: ActionItem[] = [
    { icon: <CreateTaskIcon className='h-8 w-7' />, text: 'Create Task' },
    { icon: <CreateNoteIcon className='h-7 w-7' />, text: 'Create Note' },
    { icon: <ShareLinkIcon className='h-7 w-7' />, text: 'Save Link' },
    { icon: <TalkIcon className='h-7 w-7' />, text: 'Talk' }
  ]

  return (
    <nav className='flex max-w-full flex-col items-start max-md:ml-2.5'>
      {actions.map((action, index) => (
        <div
          key={index}
          className={`flex h-12 w-full items-center gap-10 ${
            index === 0 ? 'bg-zinc-200' : 'hover:bg-zinc-200'
          }`}
        >
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-10'>
              <div className='ml-10 flex items-center'>{action.icon}</div>
              <div className='font-semibold'>{action.text}</div>
            </div>
            {index === 0 && (
              <span className='mr-20 text-xs text-blue-500'>
                <EnterIcon className='h-8' />
              </span> // Additional icon or label
            )}
          </div>
        </div>
      ))}
    </nav>
  )
}

export default TaskActionList
