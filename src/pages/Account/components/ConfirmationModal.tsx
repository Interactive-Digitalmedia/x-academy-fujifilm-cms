import { useState } from 'react'
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Button
} from '@nextui-org/react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm
}: ConfirmationModalProps) {
  const [reason, setReason] = useState('')
  const [confirmationText, setConfirmationText] = useState('')
  const [loading, setLoading] = useState(false)
  const [customReason, setCustomReason] = useState('')

  const handleDeleteAccount = () => {
    if (confirmationText === 'delete' && (reason || customReason)) {
      setLoading(true)
      onConfirm(reason === 'Other' ? customReason : reason)
      setLoading(false)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <p className=''>
            Deleting your Adoer account will permanently remove all your data,
            including your notes, tasks, and associated records. This action
            cannot be undone.
            <br /> If you have important data, we recommend exporting or saving
            it before proceeding.
          </p>
          <div className='rounded-lg bg-red-500 p-2 text-white'>
            This action is final and cannot be undone.
          </div>
          <p className='text-sm text-gray-600'>
            Select a reason for deleting your account:
          </p>
          <Select
            label='Reason'
            className='w-full'
            onChange={(e) => setReason(e.target.value)}
            // classNames={}
            size='sm'
          >
            <SelectItem key='Privacy concerns' value='Privacy concerns'>
              Privacy concerns
            </SelectItem>
            <SelectItem
              key='Not satisfied with Product'
              value='Not satisfied with Product'
            >
              Not satisfied with Product
            </SelectItem>
            <SelectItem
              key='Found a better alternative'
              value='Found a better alternative'
            >
              Found a better alternative
            </SelectItem>
            <SelectItem key='Too expensive' value='Too expensive'>
              Too expensive
            </SelectItem>
            <SelectItem key='Other' value='Other'>
              Other
            </SelectItem>
          </Select>
          {reason === 'Other' && (
            <Input
              className='mt-2 w-full'
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder='Enter your reason'
            />
          )}

          <p className='mt-4 text-sm text-gray-600'>
            Type "delete" to confirm:
          </p>
          <Input
            className='w-full'
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder='Type "delete" here'
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose} variant='light'>
            Cancel
          </Button>
          <Button
            className='bg-red-500 font-semibold text-white'
            isDisabled={
              confirmationText !== 'delete' ||
              (!reason && !customReason) ||
              loading
            }
            isLoading={loading}
            onPress={handleDeleteAccount}
          >
            Confirm Deletion
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
