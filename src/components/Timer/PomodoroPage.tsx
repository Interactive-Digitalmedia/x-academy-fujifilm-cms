import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import './pomodoro.css'

const createConfetti = (count = 50) => {
  const confettiContainer = document.createElement('div')
  confettiContainer.className = 'confetti-container'

  // Array of random confetti colors
  const colors = [
    '#f5a623',
    '#ff4757',
    '#1e90ff',
    '#2ed573',
    '#ff6348',
    '#ffa502',
    '#3742fa',
    '#ff6b81'
  ]

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti'

    // Randomly select a color from the array
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.setProperty('--confetti-color', randomColor)

    confetti.style.left = `${Math.random() * 100}%`
    confetti.style.top = `${Math.random() * 100}%`
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`

    confettiContainer.appendChild(confetti)
  }

  document.body.appendChild(confettiContainer)

  setTimeout(() => confettiContainer.remove(), 3000) // Remove confetti after 3 seconds
}

const PomodoroPage = () => {
  const initialTime = 25 * 60 // 25 minutes in seconds
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const navigate = useNavigate() // Initialize the navigate hook
  const [isCompleted, setIsCompleted] = useState(false) // Timer completion state
  // const [timeRecords, setTimeRecords] = useState<string[]>([]) // Recorded times

  useEffect(() => {
    // Get the saved time from localStorage
    const savedStartTime = localStorage.getItem('startTime')
    if (savedStartTime) {
      const elapsed = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000)
      const remainingTime = initialTime - elapsed

      if (remainingTime > 0) {
        setTime(remainingTime)
        setIsRunning(true)
      } else {
        setTime(0)
      }
    }
  }, [])

  useEffect(() => {
    let interval: any
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false)
            localStorage.removeItem('startTime')
            createConfetti()
            return initialTime
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, time])

  useEffect(() => {
    if (isCompleted) {
      createConfetti() // Trigger confetti animation
      setIsCompleted(false) // Reset completion state
    }
  }, [isCompleted])

  // Function to format the time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')} | ${String(seconds).padStart(2, '0')}`
  }

  const handlePlay = () => {
    const startTime = Date.now()
    localStorage.setItem('startTime', startTime.toString()) // Save the start time to localStorage
    setIsRunning(true) // Start the timer
    setIsCompleted(false) // Reset completion state
  }

  const handleStop = () => {
    setIsRunning(false) // Stop the timer
    // setTimeRecords((prevRecords) => [...prevRecords, formatTime(time)]) // Store the formatted time in the array
    setTime(initialTime) // Reset the timer to 25 minutes
    localStorage.removeItem('startTime') // Remove the saved start time
    setIsCompleted(false) // Reset completion state
  }

  const [minutes, seconds] = formatTime(time).split(' | ')

  return (
    <div className='relative flex h-screen flex-col items-center justify-center bg-transparent'>
      <button
        className='absolute right-4 top-4'
        onClick={() => {
          navigate('/home')
        }}
      >
        X
      </button>
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
          <h1 className='text-8xl font-medium text-white'>{minutes}</h1>
          <p className='text-lg text-white opacity-75'>Minutes</p>
        </div>
        <div className='mx-4 h-20 w-[2px] bg-gray-700'></div>
        <div className='text-center'>
          <h1 className='text-8xl font-medium text-white'>{seconds}</h1>
          <p className='text-lg text-white opacity-75'>Seconds</p>
        </div>
      </div>
      <div className='mt-8 flex justify-center space-x-4'>
        <Button
          onClick={handlePlay}
          className='rounded-lg border border-white border-opacity-10 bg-black px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#181818]'
          disabled={isRunning || time === 0}
        >
          Play
        </Button>
        <Button
          onClick={handleStop}
          className='rounded-lg border border-white border-opacity-10 bg-black px-6 py-3 font-bold text-white transition duration-300 hover:bg-[#181818]'
          disabled={!isRunning}
        >
          Stop
        </Button>
      </div>
      {/* Display time records as a list */}
      {/* <ul className='mt-6 space-y-2 text-white'>
        {timeRecords.length > 0 ? (
          timeRecords.map((record, index) => (
            <li key={index} className='rounded-lg bg-white bg-opacity-10 p-3'>
              <p className='text-white'>
                Session {index + 1}: {record}
              </p>
            </li>
          ))
        ) : (
          <p className='text-gray-300'>No records yet</p>
        )}
      </ul> */}
    </div>
  )
}

export default PomodoroPage
