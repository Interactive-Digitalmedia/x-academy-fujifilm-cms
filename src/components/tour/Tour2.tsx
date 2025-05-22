// tour.tsx
import { useEffect } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import './Tour2.css'
import { getOneFn, createOne } from '@/api/workspace/Api'
import useGlobalStore from '@/state/GlobalState'
import posthog from 'posthog-js'
import useDeviceDetect from '@/hooks/useDeviceDetect'

const Tour2 = () => {
  const { user } = useGlobalStore((state) => ({
    user: state.user
  }))
  const isMobile = useDeviceDetect()

  const bearerToken = user?.token as string

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await getOneFn(
          `/profile/show-tour-default`,
          bearerToken
        ) // Replace with your actual endpoint

        // Track the event of fetching the user profile
        posthog.capture('User Profile Fetched', {
          showTourDefault: response.data.showTourDefault
        })

        if (response.data.showTourDefault === true) {
          const response1 = await getOneFn(
            `/profile/check-user-type`,
            bearerToken
          )
          if (response1.data.success === true) {
            await createOne(`/profile/update-tour`, bearerToken, {})
            // Track the event of starting the tour
            posthog.capture('Tour Started', {})

            // Set up the driver.js tour
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href =
              'https://cdn.jsdelivr.net/npm/driver.js/dist/driver.min.css'
            document.head.appendChild(link)

            const driverObj = driver({
              showProgress: true,
              popoverClass: 'driverjs-theme',
              nextBtnText: 'Next',
              prevBtnText: 'Previous',
              doneBtnText: 'Done',

              steps: [
                {
                  element: '#Tasks',
                  popover: {
                    title: 'Tasks',
                    description:
                      'You can create multiple tabs to segregate your tasks',
                    side: 'bottom',
                    align: 'center'
                  }
                },
                {
                  element: '#recur',
                  popover: {
                    title: 'Recurring Tasks',
                    description:
                      'Set up recurring tasks to automate your schedule and ensure consistent progress'
                  }
                },
                {
                  element: '#createNewChannel',
                  popover: {
                    title: 'Create Channel',
                    description:
                      'Create channels to organize and focus on different aspects of your life'
                  }
                },
                {
                  element: '#createTask',
                  popover: {
                    title: 'Create Task',
                    description:
                      'Break down goals into tasks to stay on track and accomplish more.'
                  }
                },
                {
                  element: '#taskCard',
                  popover: {
                    title: 'Drag and drop',
                    description:
                      'Drag and drop tasks effortlessly from one section to another.',
                    side: 'bottom',
                    align: 'center'
                  }
                },
                {
                  element: '#Planner',
                  popover: {
                    title: 'Planner',
                    description:
                      'Become more productive by planning your bandwidth visually for next 3 days',
                    side: 'bottom',
                    align: 'center'
                  }
                }
                // {
                //   element: '#Calendar',
                //   popover: {
                //     title: 'Calendar',
                //     description:
                //       'Schedule tasks on your calendar to track deadlines and commitments.'
                //   }
                // }
              ]
            })

            driverObj.drive()
            return () => {
              document.head.removeChild(link)
            }
          }

          // Track the completion of the tour
          // driverObj.setConfig({
          //   onClose: () => {
          //     posthog.capture('Tour Closed', {});
          //   },
          // });

          // Clean up: remove the link element when the component unmounts
        }

        console.log('default :', response.data.showTourDefault)
      } catch (error) {
        console.error('Error fetching user profile:', error)
        // Track the event of an error occurring
        posthog.capture('Error Fetching User Profile', { error: error })
      }
    }
    {
      isMobile ? '' : fetchUserProfile()
    }
  }, [bearerToken])

  return null
}

export default Tour2
