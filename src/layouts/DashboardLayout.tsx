// src/components/layouts/DashboardLayout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import './DashboardLayout.css'
import NavBar from '@/components/navbar/NavBar'

export default function DashboardLayout() {
  const location = useLocation()
  const isDiscoverRoute = location.pathname.startsWith('/discover')
  const isActivityRoute = location.pathname.startsWith('/activity')

  return (
    <>
      {/* Only show NavBar if not in Discover section */}
      {!isDiscoverRoute && !isActivityRoute && (
        <div>
          <NavBar />
        </div>
      )}

      <div className={`flex h-screen bg-background`}>
        <div className={`w-full`}>
          <Outlet />
          <div>
          </div>
        </div>
      </div>
    </>
  )
}
