import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const ModalTour = () => {
  const driverObj = driver({
    showProgress: true,

    popoverClass: 'driverjs-theme',
    nextBtnText: 'Next',
    prevBtnText: 'Previous',
    doneBtnText: 'Done',

    showButtons: ['next', 'previous'],

    steps: [
      {
        element: '#taskcardsection',
        popover: {
          title: 'Section',
          description: `Manage your tasks: start with "To Do", move to "In Progress",and finish with "Completed"`,
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '#cal',
        popover: {
          title: 'Schedule on Calendar',
          description:
            'Block time on your calendar to schedule tasks and stay on track.',
          align: 'center'
        }
      },
      {
        element: '#repeat',
        popover: {
          title: 'Recurring Tasks',
          description:
            'Set tasks to recur with custom frequency to fit your routine.',
          align: 'center'
        }
      }
    ]
  })

  const handleHelpClick = () => {
    driverObj.drive()
  }

  return (
    <button onClick={handleHelpClick} className='z-10'>
      {/* <Info height='20px' className='opacity-75' /> */}i
    </button>
  )
}

export default ModalTour
