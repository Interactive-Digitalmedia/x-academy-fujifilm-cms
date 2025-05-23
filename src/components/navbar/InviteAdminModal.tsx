import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Button,
  } from '@nextui-org/react'
  import { Send} from 'lucide-react'
  import { useState } from 'react'
  import { createInvite } from '@/api/Invite'
  import toast from 'react-hot-toast'

  interface InviteAdminModalProps {
    isOpen: boolean
    onClose: () => void
  }
  
  export default function InviteAdminModal({ isOpen, onClose }: InviteAdminModalProps) {
    const [email, setEmail] = useState('')
    // const [role, setRole] = useState<'view' | 'edit' | 'admin'>('view')
    // const contributors = [
    //   { name: 'Rohit Bhagat', email: 'rohit@interactivedigitalmedia.in', role: 'OWNER', isYou: true }
    // ]

    const handleCreateInvite = async () => {
        try {
          const response = await createInvite(email)
          toast.success('Invite sent successfully!')
          console.log(response)
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
            </div>
  
         
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
  