import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar
} from '@nextui-org/react'
import { Search, ChevronDown, User, UserRound, Settings } from 'lucide-react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import { useState } from 'react'
import { useTheme } from '@/utils/ThemeProvider'
import { Sun, Moon, Bell } from 'lucide-react'
import useGlobalStore from '@/state/GlobalState'
// type Props = {}

const NavBar = () => {
  const { signedIn, setShowLoginModal } = useGlobalStore()
  const { setMode, mode } = useTheme()
  // const { setMode, mode } = useTheme()
  const [search, setSearch] = useState<string>('')
  const [city, setCity] = useState<string>('Bangalore')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  // Get current location to determine active route
  const location = useLocation()
  const currentPath = location.pathname

  // Function to determine if a path is active
  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') {
      return true
    }
    // For other paths, check if current path starts with this path (for nested routes)
    return path !== '/' && currentPath.startsWith(path)
  }


  return (
    <>
      <nav className='fixed top-0 z-40 flex min-h-16 w-full items-center justify-between gap-10 bg-white/60 px-6 backdrop-blur-md dark:bg-black/30'>
        {/* Navigation Items */}
        <div className='align-center flex'>
          <div className='flex items-center gap-6'>
            <RouterLink to='/'>
              <div className='w-24 overflow-hidden md:h-16 md:w-32'>
                {/* <img
                  src={whiteLogo}
                  className='mt-[2px] hidden h-[100%] w-[100%] dark:block'
                  alt='Logo Dark'
                /> */}
                {/* <img
                  src={blackLogo}
                  className='mt-[2px] block h-[100%] w-[100%] dark:hidden'
                  alt='Logo Light'
                /> */}
              </div>
            </RouterLink>

            <ul className='hidden items-center gap-6 md:flex'>
              <li>
                <RouterLink
                  to='/'
                  className={`text-sm ${
                    isActive('/')
                      ? 'font-semibold text-black dark:text-white'
                      : 'text-muted-light font-normal'
                  }`}
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <div className='flex items-end'>
                  <RouterLink
                    to='/discover'
                    className={`text-sm ${
                      isActive('/discover')
                        ? 'font-semibold text-black dark:text-white'
                        : 'text-muted-light font-normal'
                    }`}
                  >
                    Discover
                  </RouterLink>
                </div>
              </li>
              <li>
                <div className='flex items-end'>
                  <RouterLink
                    to='/community'
                    className={`text-sm ${
                      isActive('/community')
                        ? 'font-semibold text-black dark:text-white'
                        : 'text-muted-light font-normal'
                    }`}
                  >
                    Community
                  </RouterLink>
                </div>
              </li>
              <li>
                <RouterLink
                  to='/shop'
                  className={`nav-pill ${isActive('/shop') ? 'font-semibold' : 'opacity-80'}`}
                >
                  Shop
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          {/* Location Dropdown */}
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant='light'
                  className='min-w-0 bg-transparent px-1 text-fuji-blue'
                  endContent={
                    <ChevronDown size={16} className='ml-1 text-fuji-blue' />
                  }
                >
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='Location selection'
                selectedKeys={[city]}
                selectionMode='single'
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0]
                  setCity(selected as string)
                }}
              >
                <DropdownItem key='bangalore'>Bangalore</DropdownItem>
                <DropdownItem key='mumbai'>Mumbai</DropdownItem>
                <DropdownItem key='delhi'>Delhi</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Search */}
          <div className='relative hidden items-center md:flex'>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              classNames={{
                base: 'max-w-full w-64',
                mainWrapper: 'h-full',
                input: 'text-sm pl-14 text-foreground',
                inputWrapper:
                  'h-10 bg-transparent rounded-[8px] border dark:border-[#565656] border-[#CCCCCC]'
              }}
              placeholder='Search'
              size='sm'
              startContent={<Search size={18} className='text-gray-400' />}
              type='search'
            />
          </div>
          <button
            className='icon-button'
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          >
            {mode === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>


          {signedIn && (<>
            <button className='icon-button'>
            <UserRound size={15} />
          </button>

          <Popover placement='bottom-end' showArrow>
            <PopoverTrigger>
              <Button size='sm' className='icon-button rounded-full'>
                <Bell size={14} />
              </Button>
            </PopoverTrigger>

            <PopoverContent className='notification-card w-[300px]'>
              {/* Search + Settings */}
              <div className='flex w-full gap-3'>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search'
                  size='sm'
                  type='search'
                  startContent={<Search size={18} className='text-gray-400' />}
                  classNames={{
                    base: 'flex-1',
                    inputWrapper:
                      'h-8 bg-transparent rounded-[8px] border border-[#CCCCCC] dark:border-[#565656]'
                    // input: 'text-sm pl-10'
                  }}
                />
                <button onClick={() => {}} className=''>
                  <Settings size={18} />
                </button>
              </div>

              {/* Filter Chips */}
              <div className='mt-4 flex w-full gap-2'>
                <Button
                  size='sm'
                  // variant={showUnreadOnly ? 'ghost' : 'solid'}
                  // className='px-4'
                  className={`btn-toggle ${
                    showUnreadOnly ? 'btn-toggle-inactive' : 'btn-toggle-active'
                  }`}
                  onClick={() => setShowUnreadOnly(false)}
                >
                  All Notifications
                </Button>
                <Button
                  size='sm'
                  // variant={showUnreadOnly ? 'solid' : 'ghost'}
                  // className='px-4'
                  className={`btn-toggle ${
                    showUnreadOnly ? 'btn-toggle-active' : 'btn-toggle-inactive'
                  }`}
                  onClick={() => setShowUnreadOnly(true)}
                >
                  Unread
                </Button>
              </div>

              {/* Notification List */}
              <div className='mt-4 max-h-60 w-full overflow-y-auto'>
               
              </div>
            </PopoverContent>
          </Popover>
          </>)}
        
          {/* Login Button */}
          {!signedIn && (
             <div>
             <Button
               className='normal-btn'
               onPress={() => {setShowLoginModal(true)}}
               startContent={<User size={18} />}
             >
               Log in
             </Button>
           </div>
          )}
         
        </div>
      </nav>
  
    </>
  )
}

export default NavBar
