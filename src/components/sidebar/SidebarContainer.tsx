import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom'
import './sidebar.css'
import HomeIcon from '../icons/HomeIcon'
import PlannerIcon from '../icons/PlannerIcon'
import NotesIcon from '../icons/NotesIcon'
// import useGlobalStore from '@/state/GlobalState'
// import CaptureIcon from '../icons/CaptureIcon'
// import TaskIcon from '../icons/TaskIcon'
import { useState } from 'react'
import { Search } from 'lucide-react'

// import { CalendarDays } from 'lucide-react'
export default function SidebarContainer() {
  // const { user } = useGlobalStore()
  // const bearerToken = user?.token as string

  // const [isEarlyAccess, setIsEarlyAccess] = useState<boolean>(false)

  // function parseJwt(token: string) {
  //   const base64Url = token.split('.')[1]
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  //   const jsonPayload = decodeURIComponent(
  //     window
  //       .atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  //       })
  //       .join('')
  //   )
  //   return JSON.parse(jsonPayload)
  // }

  // useEffect(() => {
  //   const decoded = parseJwt(bearerToken)
  //   // console.log("decoded :", decoded)
  //   setIsEarlyAccess(decoded.isEarlyAccess)
  // }, [bearerToken])

  const pages = [
    {
      title: 'Search ⌘+k',
      icon: Search,
      isActive: true,
      url: 'Search'
    },
    {
      title: 'Home',
      icon: HomeIcon,
      isActive: true,
      url: ''
    },
    {
      title: 'Calendar',
      icon: PlannerIcon,
      isActive: true,
      url: 'calendar'
    },
    // {
    //   title: 'Link',
    //   icon: PlannerIcon,
    //   isActive: true,
    //   url: 'link'
    // },
    // {
    //   title: 'Spaces',
    //   icon: TaskIcon,
    //   isActive: true,
    //   url: 'spaces'
    // },
    // {
    //   title: 'Notes',
    //   icon: NotesIcon,
    //   isActive: true,
    //   url: 'notes'
    // },
    {
      title: 'Notes',
      icon: NotesIcon,
      isActive: true,
      url: 'channel'
    }
  ]
  const location = useLocation() // get current page, eg: /planner

  //code for collapsing sidebar
  // const [isCollapsed, setIsCollapsed] = useState(localStorage.getItem('isCollapsed') === 'true')
  const [isCollapsed] = useState(true)
  // const handleSidebarCollapse = async (isCollapsed: boolean) => {
  //   localStorage.setItem('isCollapsed', JSON.stringify(isCollapsed));
  //   setIsCollapsed(isCollapsed);
  // }

  return (
    <>
      {/* {!channels ? (
        <h3>Loading channels</h3>
      ) : ( */}
      <>
        <div className='sidebar-container'>
          {/* <div
              className='toggle-button'
              onClick={() => handleSidebarCollapse(!isCollapsed)}
            >
              <div className={`icon ${isCollapsed ? 'collapsed' : ''}`}>
                <ArrowLeftToLine />
              </div>
            </div> */}
          <Sidebar
            isCollapsed={isCollapsed}
            links={pages
              // .filter(({ title }) => !(title === 'Calendar' && !isEarlyAccess))
              .map(({ title, icon, isActive, url }) => ({
                title,
                icon,
                label: '',
                isActive,
                url,
                variant:
                  (url === 'channel' &&
                    location.pathname.includes('channel')) ||
                  (url === 'calendar' && location.pathname.includes('calendar'))
                    ? 'default'
                    : location.pathname === `/${url.toLowerCase()}`
                      ? 'default'
                      : 'ghost'
              }))}
            // channels={channels?.map(({ _id: id, name, isActive }) => ({
            //   id,
            //   title: capitalizeAllFirstLetters(name),
            //   label: '',
            //   icon: Hash,
            //   variant: channelId == id ? 'default' : 'ghost',
            //   isActive
            // }))}
          />
        </div>
      </>
      {/* )} */}
    </>
  )
}
