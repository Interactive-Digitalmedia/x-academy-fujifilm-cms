import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import TaskForm from '@/pages/Today/components/TaskForm'

interface TaskPopupProps {
  isOpen: boolean
  onClose: () => void
  task?: {
    _id: string
    name: string
    description: string
    priority: string
    dueDate: string
  }
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}
const TaskPopup: React.FC<TaskPopupProps> = ({
  isOpen,
  onClose,
  task,
  setRefresh
}) => {
  const popupRef1 = useRef<HTMLDivElement>(null) // Separate ref for the TaskForm container
  const popupRef2 = useRef<HTMLDivElement>(null) // Separate ref for the AI action bar
  const [isVisible, setIsVisible] = useState<boolean>(isOpen) // Track visibility for animation

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef1.current &&
        !popupRef1.current.contains(event.target as Node) &&
        popupRef2.current &&
        !popupRef2.current.contains(event.target as Node)
      ) {
        closePopup()
      }
    }

    if (isOpen) {
      setIsVisible(true) // Start transition when opening
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (task) {
      // console.log('due date :', task.dueDate)
      setIsVisible(isOpen)
    }
  }, [])

  const closePopup = () => {
    // console.log('Close Popup is triggered', isOpen)
    setIsVisible(false) // Trigger exit transition
    setTimeout(onClose, 300) // Delay unmounting by the transition duration (300ms)
  }

  if (!isOpen && !isVisible) return null // Return null after transition ends

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-2 bg-black bg-opacity-50 backdrop-blur-xs transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Task Form Container */}
      <div
        ref={popupRef1}
        className={`flex w-full max-w-2xl transform flex-col items-center justify-center rounded-custom bg-white p-3 transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <TaskForm
          data={task}
          setCreateTask={closePopup}
          setRefresh={setRefresh}
        />
      </div>

      {/* AI Action Bar Container */}
      {/* <div
        ref={popupRef2}
        className={`flex w-full max-w-2xl transform flex-col items-center justify-center rounded-custom bg-white p-3 transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        AI action bar
      </div> */}
    </div>,
    document.body
  )
}

interface TaskButtonProps {
  icon: string
  label: string
  onClick?: () => void
}

export const TaskButton: React.FC<TaskButtonProps> = ({
  icon,
  label,
  onClick
}) => {
  return (
    <button
      className='my-auto flex min-w-[64px] items-center justify-center gap-2 self-stretch rounded-lg border border-solid border-gray-300 p-2'
      onClick={onClick}
    >
      <img
        loading='lazy'
        src={icon}
        alt=''
        className='my-auto aspect-square w-4 shrink-0 self-stretch object-contain'
      />
      <span className='my-auto self-stretch'>{label}</span>
    </button>
  )
}

// interface ButtonProps {
//   onClick: () => void
//   variant: 'primary' | 'secondary'
//   children: React.ReactNode
// }

// const Button: React.FC<ButtonProps> = ({ onClick, variant, children }) => {
//   const baseClasses =
//     'flex z-0 flex-col flex-1 shrink justify-center p-1 text-sm whitespace-nowrap rounded-xl basis-4 min-h-[56px]'
//   const variantClasses =
//     variant === 'primary'
//       ? 'text-white bg-blue-600 border border-blue-600 border-dashed'
//       : 'text-zinc-800 bg-gray-200'

//   return (
//     <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
//       <div className='w-full overflow-hidden rounded-xl px-4 py-4 max-md:px-5'>
//         {children}
//       </div>
//     </button>
//   )
// }

export default TaskPopup

// const SmallContainer = () => {
//   return <div>chiru</div>
// }
