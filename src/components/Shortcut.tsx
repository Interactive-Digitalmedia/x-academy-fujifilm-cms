import { useState } from 'react'
import { CircleHelpIcon, Command, CircleX } from 'lucide-react'
import posthog from 'posthog-js'

const Shortcut = () => {
  const [isShortCutOpen, setIsShortCutOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const Icon = isShortCutOpen ? CircleX : CircleHelpIcon

  const toggleShortcut = () => {
    if (!isShortCutOpen) {
      // Step 1: Render the div
      setIsRendered(true)
      posthog.capture('user_clicked_todaypage_shortcut')
      // Step 2: Allow time for animation to trigger
      setTimeout(() => {
        setIsShortCutOpen(true)
      }, 10) // Small delay to trigger the opening animation
    } else {
      // Step 3: Close the popup
      setIsShortCutOpen(false)

      // Step 4: Remove the div after animation completes
      setTimeout(() => {
        setIsRendered(false)
      }, 300) // Match the animation duration (300ms)
    }
  }

  return (
    <div className='fixed bottom-10 right-10 z-50'>
      {/* <div
        className={`flex cursor-pointer items-center gap-1 border bg-white p-2 px-3 ${
          isShortCutOpen
            ? 'h-10 w-[263px] rounded-lg pl-4'
            : 'rounded-3xl p-2 px-3'
        } text-[12px] font-normal text-[#828282] transition-all duration-1000`}
        onClick={() => toggleShortcut()}
      > */}
      <div
        className={`duration-[2000ms] flex cursor-pointer items-center gap-1 border bg-white p-2 px-3 text-[12px] font-normal text-[#828282] transition-all ${isShortCutOpen ? 'rounded-lg' : 'rounded-3xl'}`}
        style={{
          width: isShortCutOpen ? '263px' : '105px'
        }}
        onClick={() => toggleShortcut()}
      >
        <div className='relative flex w-full items-center justify-between'>
          <p>{isShortCutOpen ? 'Hide shortcuts' : 'Shortcuts'}</p>
          <Icon className='absolute right-0' size={18} />
        </div>
      </div>
      {/* pop up */}
      {isRendered && (
        <div
          className={`absolute bottom-14 right-0 w-[263px] rounded-lg border bg-white p-4 transition-all duration-300 ease-in-out ${
            isShortCutOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-10 opacity-0'
          }`}
        >
          <div className='space-y-3'>
            {/* <div className='flex items-center justify-between text-sm text-[#828282]'>
              <p>Create a Task</p>
              <div className='flex items-center gap-1'>
                <Command className='h-[24px] w-[24px] rounded-sm border p-1' />+{' '}
                <div className='flex h-[24px] w-[24px] items-center justify-center rounded-sm border p-1'>
                  J
                </div>
              </div>
            </div> */}
            {/* <hr /> */}
            <div className='flex items-center justify-between text-sm text-[#828282]'>
              <p>Create a Note</p>
              <div className='flex items-center gap-1'>
                <Command className='h-[24px] w-[24px] rounded-sm border p-1' />+{' '}
                <div className='flex h-[24px] w-[24px] items-center justify-center rounded-sm border p-1'>
                  K
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className='mt-4 flex items-center gap-2 text-sm text-gray-500'>
      <label htmlFor='hideShortcuts' className='cursor-pointer'>
        Hide Shortcuts
      </label>
      <button className='ml-auto text-gray-400 hover:text-gray-600'>
        ✖
      </button>
    </div> */}
    </div>
  )
}
export default Shortcut
