import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  BarChart,
  HelpCircle,
  Settings
} from 'lucide-react'
import Logo from '/images/logo/logo.webp'
import { Divider } from '@nextui-org/react'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Partners', path: '/partners', icon: Users },
    { name: 'Blogs', path: '/blogs', icon: BookOpen },
    { name: 'Analytics', path: '/analytics', icon: BarChart },
    { name: 'Support', path: '/support', icon: HelpCircle },
    { name: 'Settings', path: '/settings', icon: Settings }
  ]

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col justify-between py-3">
      <div>
        {/* Logo */}
        <div className="mb-1 flex justify-center items-center">
          <img src={Logo} className="h-[34px]" alt="Logo" />
        </div>

        <Divider className="mb-4" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map(({ name, path, icon: Icon }) => {
            const active = location.pathname.startsWith(path)
            return (
              <Link
                key={name}
                to={path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon size={18} />
                {name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 text-xs text-gray-400">© 2025 XAcademy</div>
    </aside>
  )
}
