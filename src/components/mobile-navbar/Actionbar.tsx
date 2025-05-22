import { Link, useLocation } from 'react-router-dom'
import useDeviceDetect from '../../hooks/useDeviceDetect'
import IconContainer from './IconContainer'
import HomeIcon from '../icons/HomeIcon'
import { cn } from '@/lib/utils'
import posthog from 'posthog-js'
import { Compass } from 'lucide-react'
import { CircleDotDashed } from 'lucide-react'
import { User } from 'lucide-react'

export default function Actionbar() {
  const isMobile = useDeviceDetect()
  const location = useLocation()

  interface IconData {
    icon: React.ElementType

    link: string
    name: string
  }

  const iconData: IconData[] = [
    {
      icon: HomeIcon,
      link: '/test',
      name: 'home'
    },

    {
      icon: Compass,
      link: '/discover',
      name: 'discover'
    },
    {
      icon: CircleDotDashed,
      link: '/community',
      name: 'community'
    },
    {
      icon: User,
      link: '/test',
      name: 'profile'
    }
  ]

  const isActive = (path: string) => {
    // Remove leading slash for comparison
    const currentPath = location.pathname.slice(1)
    const iconPath = path.replace('/', '')
    return currentPath === iconPath
  }

  return (
    <>
      {isMobile ? (
        <div className='fixed inset-x-0 bottom-0 z-50 flex items-center justify-around bg-black/40 px-4 py-2 shadow-lg backdrop-blur-md sm:px-6'>
          {iconData.map((icon, index) => (
            <Link
              key={index}
              to={icon.link}
              className={cn(
                'rounded-md transition-all duration-200 ease-in-out',
                isActive(icon.link) ? 'text-white' : 'text-zinc-300'
              )}
              onClick={() =>
                posthog.capture(`user_clicked_mobile_${icon.name}`)
              }
            >
              <IconContainer IconComponent={icon.icon} />
              <span className=''>{icon.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
