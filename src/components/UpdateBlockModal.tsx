import { Item } from '@/types'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Checkbox
} from '@nextui-org/react'
import UpdateIcon from './icons/UpdateIcon'

interface UpdateBlockModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedItem?: Item
  handleUpdate?: () => void
  setUdpateAllInstances: (value: boolean) => void
}

function UpdateBlockModal({
  isOpen,
  onOpenChange,
  selectedItem,
  setUdpateAllInstances,
  handleUpdate
}: UpdateBlockModalProps) {
  const closePopup = () => {
    onOpenChange(false)
  }
  // console.log(selectedItem);
  // Determine if this is a recurring task
  //   const isRecurring = selectedItem?.isRecurring

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop='blur'
      placement='center'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className='flex items-center'>
              <div className='flex flex-col items-center gap-1 py-3'>
                <div className='rounded-full border bg-[#D1E4FC] p-4 shadow-large'>
                  <UpdateIcon />
                </div>
                <h1 className='text-[24px] font-semibold capitalize'>
                  Update Recurring {selectedItem?.type}
                </h1>
                <p className='text-center'>
                  Are you sure you want to update this parent{' '}
                  {selectedItem?.type}?
                </p>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-between border-t border-dashed py-3 pl-0 pr-3'>
              <div className='w-full'>
                <div className='flex items-center px-6'>
                  <Checkbox
                    onChange={(e) => {
                      // This will be used to determine whether to delete all instances
                      setUdpateAllInstances(e.target.checked)
                    }}
                    color='default'
                  />
                  <span className='text-[14px] text-gray-500'>
                    This and all other instances.
                  </span>
                </div>
                <div className='flex w-full items-center justify-between pl-3 pr-2'>
                  <Button
                    variant='light'
                    size='sm'
                    onPress={onClose}
                    className='text-gray-500 hover:bg-transparent'
                  >
                    Cancel <span className='text-xs'>(esc)</span>
                  </Button>
                  <Button
                    className='bg-primary text-background'
                    onPress={() => {
                      if (handleUpdate) {
                        handleUpdate()
                      }
                      closePopup()
                    }}
                  >
                    Yes, Confirm
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default UpdateBlockModal
