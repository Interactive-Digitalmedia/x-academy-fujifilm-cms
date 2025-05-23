import { Outlet } from 'react-router-dom'
import NavBar from '@/components/navbar/NavBar'
import Sidebar from '@/components/sidebar/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="relative h-screen w-full bg-gray-100">
      {/* Sidebar fixed from top left */}
      <div className="fixed top-0 left-0 z-50 h-screen w-64">
        <Sidebar />
      </div>

      {/* Main container shifted right by sidebar width */}
      <div className="ml-64 flex flex-col h-screen">
        <NavBar />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
