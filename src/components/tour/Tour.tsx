import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Button } from '@nextui-org/react'
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { getOneFn, createOne } from '@/api/workspace/Api'
import useGlobalStore from '@/state/GlobalState'

const data = [
  {
    title: 'Channels',
    description:
      'Create multiple channels to segregate and group different aspects of your life, ensuring better organization and focus.'
  },
  {
    title: 'Planner',
    description:
      'Designed to achieve peak productivity by allowing you to plan for three key days: today, tomorrow, and the day after tomorrow.'
  },
  {
    title: 'Task',
    description:
      'Efficiently manage your to-do list by breaking down your goals into actionable tasks, helping you stay on track and accomplish more.'
  }
  //Commented for this release
  // {
  //     "title": "Schedule Task on Calendar",
  //     "description": "Easily schedule tasks on your calendar to keep track of deadlines and commitments, ensuring that nothing falls through the cracks."
  // },
]

interface TourProps {
  visible: boolean
}

export default function Tour({ visible }: TourProps) {
  const [count, setCount] = useState<number>(0)
  const [title, setTitle] = useState<string>(data[0].title)
  const [description, setDescription] = useState<string>(data[0].description)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // const [showTourDefault, setShowTourDefault] = useState<boolean>(true)

  const { user } = useGlobalStore((state) => ({
    user: state.user
  }))

  const bearerToken = user?.token as string

  useEffect(() => {
    // Fetch user profile data to get the showTourDefault value
    async function fetchUserProfile() {
      try {
        const response = await getOneFn(
          `/profile/show-tour-default`,
          bearerToken
        ) // Replace with your actual endpoint
        // setShowTourDefault(response.data.showTourDefault)
        setIsOpen(response.data.showTourDefault)

        if (response.data.showTourDefault === true) {
          await createOne(`/profile/update-tour`, bearerToken, {})
          // setIsOpen(response.data.showTourDefault)
        }
        // console.log('default :', response.data.showTourDefault)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    fetchUserProfile()
  }, [])

  const handleNext = () => {
    setCount((prevCount) => {
      const newCount = (prevCount + 1) % data.length
      setTitle(data[newCount].title)
      setDescription(data[newCount].description)
      return newCount
    })
  }

  const handlePrevious = () => {
    setCount((prevCount) => {
      const newCount = (prevCount - 1 + data.length) % data.length
      setTitle(data[newCount].title)
      setDescription(data[newCount].description)
      return newCount
    })
  }

  const handleFinish = () => {
    // Implement finish logic here
    console.log('Finish button clicked')
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {visible ? (
        <Button
          // radius='full'
          // className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
          className='h-[2rem] w-[7.5rem] bg-transparent text-[#F4F4F4] opacity-75'
        >
          <DrawerTrigger>Take a Quick Tour</DrawerTrigger>
        </Button>
      ) : (
        ''
      )}

      <DrawerContent>
        <div className='mx-auto mt-10 flex w-full max-w-sm flex-col items-center'>
          <DrawerHeader className='text-center'>
            <DrawerTitle>Thank you embarking on this journey!</DrawerTitle>
            <DrawerDescription className='text-center'>
              Let's make this conquest worth it!
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className='w-full'>
            <Card className='mb-5 w-full py-4'>
              <CardHeader className='flex flex-col items-center px-4 pb-0 pt-2 text-center'>
                <Image
                  alt='Card background'
                  className='rounded-xl object-cover'
                  src='https://nextui.org/images/hero-card-complete.jpeg'
                  width={270}
                />
              </CardHeader>
              <CardBody className='mt-5 flex justify-center overflow-visible py-2 text-center'>
                <h4 className='text-large font-bold'>{title}</h4>
                <small className='text-default-500'>{description}</small>
              </CardBody>
            </Card>
            {count < data.length - 1 ? (
              <>
                <Button color='primary' variant='solid' onClick={handleNext}>
                  Next
                </Button>
                <Button
                  disabled={count === 0}
                  color='primary'
                  variant='ghost'
                  className={`mb-10 ${count === 0 ? 'disabled-class' : ''}`}
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              </>
            ) : (
              <>
                <DrawerClose asChild>
                  <Button
                    color='primary'
                    variant='solid'
                    onClick={handleFinish}
                  >
                    Finish
                  </Button>
                </DrawerClose>

                <Button
                  color='primary'
                  variant='ghost'
                  className='mb-10'
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              </>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
