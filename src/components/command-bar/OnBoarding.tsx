import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import img from '../../../public/images/onBoardingOne.png'
import LeftArrowIcon from '../icons/LeftArrowIcon'

interface CommandMenuProps {
  isOpen: boolean
  onClose: () => void
}

const OnBoardingPopup: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    console.log('1')
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

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 transition-opacity duration-300 ${isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <div
        ref={popupRef}
        className={`flex h-[660px] w-[960px] transform flex-col p-12 transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <section className='flex rounded-3xl bg-white'>
          <img src={img} className='w-[480px h-[660px] w-1/2 rounded-l-3xl' />
          <div className='flex w-1/2 flex-col justify-between px-10 py-12'>
            <div className=''>
              <p className='text-base font-medium leading-normal text-gray-300'>
                Step 0/6
              </p>
              <h1 className='text-4xl font-extrabold'>Let's get started</h1>
              <p className='text-sm text-gray-400'>
                Select a color for the app and customise it.
              </p>
            </div>
            <div className='flex gap-3 px-2'>
              <button className='flex h-12 w-1/4 items-center justify-center rounded-xl border'>
                <LeftArrowIcon />
              </button>
              <button className='w-3/4 rounded-xl bg-blue-600 text-white'>
                Continue
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>,
    document.body
  )
}

export default OnBoardingPopup
