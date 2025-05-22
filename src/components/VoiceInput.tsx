import { Mic } from 'lucide-react'
import { SVGProps, useState, useRef } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { JSX } from 'react/jsx-runtime'
import { sendTranscriptToAPI } from '../api/assistant/assistantApi'
import useGlobalStore from '@/state/GlobalState'
import { deleteTask } from '@/api/task/taskApi'

type T = {
  transcript: string
  sender: string
}

const VoiceInput: React.FC = () => {
  const [userTranscript, setUserTranscript] = useState('')
  const [agentTranscript, setAgentTranscript] = useState('')
  const [chats, setChats] = useState<T[]>([])
  const [listening, setListening] = useState(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [response, setResponse] = useState<any>()
  const [taskId, setTaskId] = useState<string>('')
  const recognitionRef = useRef<any>(null) // Use ref to store the SpeechRecognition instance
  const { user } = useGlobalStore()

  const token = user?.token as string

  const startListening = async () => {
    console.log(userTranscript, agentTranscript, taskId)
    setUserTranscript('')
    setAgentTranscript('')
    setChats([])
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition

    if (!SpeechRecognition) {
      alert(
        "Your browser doesn't support speech recognition. Please try Chrome."
      )
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript

      setUserTranscript(speechToText)
      const chat = {
        transcript: speechToText,
        sender: 'user'
      }
      setChats((prevChats) => [...prevChats, chat])
      // console.log('Code is here 1')
      sendTranscript(speechToText) // Send the transcript to the API
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognitionRef.current = recognition // Store the recognition instance in the ref
    recognition.start()
    setListening(true)
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop() // Stop the recognition if it's active
      setListening(false)
    }
  }

  const sendTranscript = async (transcript: string) => {
    const payload = {
      transcript: transcript,
      date: new Date()
    }
    try {
      const url = '/assistant/task'
      const response = await sendTranscriptToAPI(url, payload, token)
      setResponse(response)
      setTaskId(response.data.taskId)

      let transcript
      if (response.data.response.actionIsCompleted === false) {
        setAgentTranscript(`${response.data.response.agent}`)
        transcript = `${response.data.response.agent}`
        //"Sorry Didnt understand case to handle here"
        if (
          response.data.response.agent
            .toLowerCase()
            .includes("sorry, didn't understand you.")
        ) {
          // Wait for 2 seconds before resetting the dialog
          // console.log('happened')
          setTimeout(() => {
            setConfirm(false) // Close the confirmation dialog
            setUserTranscript('')
            setAgentTranscript('')
            startListening() // Restart listening
          }, 2000)
        }
      } else {
        if (response.data.response.followUpQuestion === false) {
          setAgentTranscript(
            `I have created a task for you to ${response.data.response.name} in channel ${response.data.response.channelName}`
          )
          transcript = `I have created a task for you to ${response.data.response.name} in channel ${response.data.response.channelName}`

          // case where user should confirm if he wants to create this task or undo it, if user clicks undo then the task should be deleted

          setConfirm(true)
        } else {
          setAgentTranscript(
            `Which channel do you want me to create the task in?`
          )
          transcript = `Which channel do you want me to create the task in?`
        }
      }
      const chat = {
        transcript: transcript,
        sender: 'agent'
      }
      setChats((prevChats) => [...prevChats, chat])
    } catch (error) {
      console.error('Error sending transcript:', error)
    }
  }

  const handleUndo = async () => {
    try {
      // Assuming response is the result of the task creation,
      // and it contains the task ID as response?.data.taskId
      const bodyData = {
        taskId: response?.data.taskId // Ensure this holds the correct task ID
      }

      await deleteTask(bodyData) // Pass bodyData to deleteTask

      // Optionally, reset form fields after successful submission
      setUserTranscript('')
      setAgentTranscript('')
      setConfirm(false)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div>
      <Dialog onOpenChange={(open) => !open && stopListening()}>
        {' '}
        {/* Stop listening when the dialog is closed */}
        <DialogTrigger asChild>
          <div
            className='ml-4 flex cursor-pointer items-center justify-center rounded-full border border-border bg-opacity-50 px-10 py-4 shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out hover:border-gray-300 sm:px-4'
            onClick={startListening}
          >
            <Mic />
          </div>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px]'>
          <div className='flex items-center justify-between'>
            <DialogTitle>
              {' '}
              {listening ? 'Listening...' : 'Start Listening'}
            </DialogTitle>
            <div>
              <Button
                variant='ghost'
                className='h-9 w-9'
                onClick={stopListening}
              >
                {' '}
                {/* Stop listening when clicking the close button */}
                <XIcon className='h-5 w-5' />
              </Button>
            </div>
          </div>
          <DialogDescription className='mt-4 max-h-[400px] overflow-auto'>
            <div className='space-y-4 text-sm'>
              {/* <p>{userTranscript}</p>
              <p>{agentTranscript}</p> */}
              {chats.map((chat) => (
                <div>
                  <h1>{chat.sender}</h1>
                  <p>{chat.transcript}</p>
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      {/* are you sure pop up */}
      <Dialog open={confirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Your Task has been created with the following details
            </DialogTitle>
            <DialogDescription>
              <ul className='mt-5'>
                <li>
                  <span>Task name :</span> {response?.data.response.name}{' '}
                </li>
                <li>
                  <span>Task due date :</span> {response?.data.response.dueDate}{' '}
                </li>
                <li>
                  <span>Task channel :</span>{' '}
                  {response?.data.response.channelName}{' '}
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end'>
            <Button
              type='submit'
              onClick={() => {
                setConfirm(false)
              }}
              className='mr-2'
            >
              Confirm
            </Button>
            <Button type='submit' onClick={handleUndo}>
              Undo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  )
}

export default VoiceInput
