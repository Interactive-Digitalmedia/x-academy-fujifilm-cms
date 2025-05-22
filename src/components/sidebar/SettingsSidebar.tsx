import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import useDeviceDetect from '../../hooks/useDeviceDetect'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SettingsSidebar({ items }: SidebarNavProps) {
  const location = useLocation()
  const isMobile = useDeviceDetect()

  return (
    <>
      {isMobile ? (
        <div className='ml-3 flex space-x-2 overflow-x-auto border-gray-200'>
          {items.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link key={item.href} to={item.href}>
                <button
                  className={`flex-grow px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                    isActive
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-600'
                  }`}
                >
                  {item.title}
                </button>
              </Link>
            )
          })}
        </div>
      ) : (
        <nav className='relative flex h-full flex-col'>
          {' '}
          {/* Set height to full to use 100% height */}
          <div className='flex flex-grow flex-col space-y-1'>
            {items.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={'ghost'}
                    className={`text-md w-full justify-start text-left transition-colors duration-300 ${
                      isActive ? '!bg-foreground !text-background' : ''
                    } `}
                  >
                    {item.title}
                  </Button>
                </Link>
              )
            })}
          </div>
          {/* <Link to={'/planner'}>
         <Button
           className='text-md absolute bottom-0 left-0 flex w-full items-center justify-center border border-solid border-black bg-white text-black'
           variant={'outline'}
         >
           <ChevronLeft className='mr-2' />
           Go Back to Dashboard
         </Button>
       </Link> */}
        </nav>
      )}
    </>
  )
}
