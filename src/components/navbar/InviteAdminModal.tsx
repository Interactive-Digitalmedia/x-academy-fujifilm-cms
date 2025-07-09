import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { createInvite } from '@/api/Invite'
import toast from 'react-hot-toast'

interface InviteAdminModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InviteAdminModal({ isOpen, onClose }: InviteAdminModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'superAdmin' | 'admin' | 'eventManager'| 'contentManager'>('admin')

  const handleCreateInvite = async () => {
    const payload ={
      email : email,
      userRole: role
    }
    try {
      const response = await createInvite(payload) // Assuming your API accepts a role parameter
      toast.success('Invite sent successfully!')
      console.log(response)
      onClose()
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Something went wrong while sending invite.'
      toast.error(errorMessage)
      console.error('Invite error:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-left">
          Empower Your Admin Panel
          <p className="text-sm font-normal text-gray-500">
            Invite other admins to manage users and permissions.
          </p>
        </ModalHeader>

        <ModalBody className="space-y-6">
          <div>
            <p className="text-sm font-semibold mb-1">Invite Admin</p>
            <div className="flex gap-2 items-center mb-4">
              <Input
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button isIconOnly color="primary" className="rounded-full" onPress={handleCreateInvite}>
                <Send size={16} />
              </Button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
              <Select
                selectedKeys={[role]}
                onChange={(e) => setRole(e.target.value as 'superAdmin' | 'admin' | 'eventManager'| 'contentManager')}
              >
                {/* <SelectItem key="super admin" value="super admin">
                  Super Admin
                </SelectItem> */}
                <SelectItem key="admin" value="admin">
                  Admin
                </SelectItem>
                <SelectItem key="content manager" value="content manager">
                Content Manger
                </SelectItem>
                <SelectItem key="event manager" value="event manager">
                  Event Manager
                </SelectItem>
              </Select>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
