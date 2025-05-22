import { useState, useEffect } from 'react'
// import { CircularProgress } from '@nextui-org/react'
import './pomodoro.css'
import { Play, Maximize2 } from 'lucide-react'
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { motion } from 'framer-motion'
// import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Function to create a confetti effect
// const createConfetti = (count = 50) => {
//   const confettiContainer = document.createElement('div')
//   confettiContainer.className = 'confetti-container'

//   const colors = [
//     '#f5a623',
//     '#ff4757',
//     '#1e90ff',
//     '#2ed573',
//     '#ff6348',
//     '#ffa502',
//     '#3742fa',
//     '#ff6b81'
//   ]

//   for (let i = 0; i < count; i++) {
//     const confetti = document.createElement('div')
//     confetti.className = 'confetti'

//     const randomColor = colors[Math.floor(Math.random() * colors.length)]
//     confetti.style.setProperty('--confetti-color', randomColor)

//     confetti.style.left = `${Math.random() * 100}%`
//     confetti.style.top = `${Math.random() * 100}%`
//     confetti.style.transform = `rotate(${Math.random() * 360}deg)`

//     confettiContainer.appendChild(confetti)
//   }

//   document.body.appendChild(confettiContainer)
//   setTimeout(() => confettiContainer.remove(), 3000) // Remove confetti after 3 seconds
// }

const Pomodoro = () => {
  const initialTime = 25 * 60 // 25 minutes in seconds
  const [time, setTime] = useState(initialTime) // Timer value in seconds
  const [isRunning, setIsRunning] = useState(false) // Is the timer running?
  const [isCompleted, setIsCompleted] = useState(false) // Timer completion state
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const targetTime = localStorage.getItem('targetTime')
    ? parseInt(localStorage.getItem('targetTime')!)
    : undefined

  useEffect(() => {
    if (targetTime !== undefined) {
      const remainingTime = Math.max(
        0,
        Math.floor((targetTime - Date.now()) / 1000)
      )
      if (remainingTime > 0) {
        setTime(remainingTime)
        setIsRunning(true)
      } else {
        setTime(initialTime)
        setIsCompleted(true)
      }
    }
  }, [])

  useEffect(() => {
    let interval: any
    if (isRunning && targetTime !== undefined) {
      interval = setInterval(() => {
        const currentTime = Date.now()
        const remainingTime = Math.max(
          0,
          Math.floor((targetTime - currentTime) / 1000)
        )

        if (remainingTime <= 0) {
          setIsRunning(false)
          setIsCompleted(true)
          localStorage.removeItem('targetTime')
          setTime(initialTime)
        } else {
          setTime(remainingTime)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, targetTime])

  useEffect(() => {
    if (isCompleted) {
      // createConfetti() // Trigger confetti animation
      setIsCompleted(false) // Reset completion state
    }
  }, [isCompleted])

  const handlePlay = () => {
    const startTime = Date.now()
    const newTargetTime = startTime + initialTime * 1000 // Calculate target time in milliseconds
    localStorage.setItem('targetTime', newTargetTime.toString()) // Save the target time to localStorage
    setIsRunning(true)
    setIsCompleted(false)
  }

  const handleStop = () => {
    setIsRunning(false)
    setTime(initialTime) // Reset the timer to 25 minutes
    localStorage.removeItem('targetTime') // Remove the saved target time
    setIsCompleted(false)
  }

  const handleToggle = () => {
    if (isRunning) {
      handleStop()
    } else {
      handlePlay()
    }
  }

  // Calculate percentage of remaining time
  // const percentage = (time / initialTime) * 100

  // Function to format the time as MM:SS
  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  const ref = useRef(null)
  // const isInView = useInView(ref, { once: true })

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className='h-screen max-w-fit bg-[#6541B1]'
        placement='top-center'
        style={{
          backgroundImage:
            'radial-gradient(circle at left bottom, rgba(101, 65, 177, 0.5) -29%, rgba(0, 0, 0, 0) 57%)',
          backgroundColor: 'black'
        }}
      >
        <ModalContent className='!m-0 max-w-full'>
          {() => (
            <>
              <ModalBody className='items-center justify-center'>
                <div className='text-center'>
                  <h1 className='text-gradient mb-4 text-5xl font-medium'>
                    Pomodoro Timer
                  </h1>
                  <p className='text-xl text-white opacity-75'>
                    Focus on your task with this Pomodoro timer.
                  </p>
                </div>
                <div className='mt-8 flex items-center'>
                  <div className='text-center'>
                    <h1 className='text-8xl font-medium text-white'>
                      {formatTime(time).split(':')[0]}
                    </h1>
                    <p className='text-lg text-white opacity-75'>Minutes</p>
                  </div>
                  <div className='mx-4 h-20 w-[2px] bg-white'></div>
                  <div className='text-center'>
                    <h1 className='text-8xl font-medium text-white'>
                      {formatTime(time).split(':')[1]}
                    </h1>
                    <p className='text-lg text-white opacity-75'>Seconds</p>
                  </div>
                </div>
                <div className='mt-8 flex justify-center'>
                  <Button
                    onClick={handleToggle}
                    className='rounded-3xl border border-white border-opacity-10 bg-[#D9D9D9] bg-opacity-65 px-12 py-3 font-bold text-white transition duration-300 hover:bg-[#181818]'
                  >
                    {isRunning ? 'Reset' : 'Play'}
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className='relative row-span-1 h-[13rem] rounded-3xl border border-border bg-[#6541B1] p-4 text-center md:col-span-2'
      style={{
        backgroundImage:
          'radial-gradient(circle at left bottom, rgba(101, 65, 177, 0.5) -29%, rgba(0, 0, 0, 0) 57%)',
        backgroundColor: 'black'
      }}>
        <button className='absolute right-4 z-10 text-white' onClick={onOpen}>
          <Maximize2 size={13} />
        </button>
        <div className='relative flex items-center justify-center'>
          {/* Conditionally render the orbits and play button based on the timer state */}
          {!isRunning && (
            <div className='orbit-container mt-[-2rem]'>
              <div className='orbit'></div>
              <div className='orbit orbit2'></div>
              <button
                onClick={handleToggle}
                className='absolute flex items-center justify-center rounded-full bg-transparent p-2 text-white'
                disabled={time === 0} // Disable button if time is 0
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Play size={70} fill='white' />
              </button>
            </div>
          )}
        </div>

        {/* Show timer and stop button when isRunning is true */}
        {isRunning ? (
          <div className='flex flex-col items-center justify-center' ref={ref}>
            <h1 className='mt-5 text-4xl font-medium text-white'>
              {formatTime(time)}
            </h1>
            <motion.circle cx='100' cy='100' r='80' custom={1}>
              <div className='line-container'>
                <div className='line'></div>

                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
              </div>
            </motion.circle>
            <Button
              onClick={handleToggle}
              className='mt-4 rounded-3xl bg-[#D9D9D9] bg-opacity-65 px-[2rem] py-0 font-bold text-white'
            >
              Stop
            </Button>
          </div>
        ) : (
          <div className='mb-4 mt-[-2rem] flex items-center justify-center'>
            <span className='mb-2 text-md font-semibold text-white opacity-55'>
              Focus Timer
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default Pomodoro
