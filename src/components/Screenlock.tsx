import React, { useEffect, useState, ReactNode } from 'react'

interface ScreenLockProps {
  children: ReactNode
}

const ScreenLock: React.FC<ScreenLockProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1000)
    }

    handleResize() // Check on initial render
    window.addEventListener('resize', handleResize) // Check on resize

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isDesktop) {
    return (
      <div
        style={{
          textAlign: 'center',
          fontSize: '24px',
          color: '#333',
          backgroundImage: 'url("/images/phone-lock.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      ></div>
    )
  }

  return <>{children}</>
}

export default ScreenLock
