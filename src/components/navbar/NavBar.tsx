import { Bell, UserPlus } from 'lucide-react'
import InviteAdminModal from './InviteAdminModal'
import { useDisclosure } from '@nextui-org/react'
import useGlobalStore from '@/state/GlobalState'
import { useEffect } from 'react'

export default function NavBar() {
  const { user } = useGlobalStore()
  useEffect(()=>{
    console.log("here user :", user)
  },[])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <header className="w-full border-b border-gray-200 bg-white px-6 py-2 flex items-center justify-between">
      <h1 className="text-base font-semibold text-black">Dashboard</h1>

      <div className="flex items-center gap-4">
        {/* Invite Button */}
        {user?.userRole==="super admin"?(
             <button
             type="button"
             onClick={onOpen}
             className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:shadow-md transition"
           >
             <UserPlus size={16} />
             Invite
           </button>
        ):(<></>)}
     

        {/* Notification Icon */}
        <button
          type="button"
          className="p-2 rounded-md hover:bg-gray-100 transition"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-gray-700" />
        </button>
      </div>
      <InviteAdminModal isOpen={isOpen} onClose={onOpenChange} />
    </header>
  )
}
