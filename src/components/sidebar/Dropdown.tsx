import {
  // Cloud,
  CreditCard,
  // Keyboard,
  LifeBuoy,
  LogOut,
  // Palette,
  // TreePine,
  // Mail,
  // MessageSquare,
  // Plus,
  // PlusCircle,
  Settings,
  User
  // UserPlus,
  // Users,
  // Cloudy,
  // GraduationCap,
  // AudioLines,
  // Sun,
  // Moon
} from 'lucide-react'

// import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuPortal,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
// import { ChevronDown } from 'lucide-react'
// import { useTheme } from '../../utils/ThemeProvider'
import posthog from 'posthog-js'
// import Tour from '../tour/Tour'

interface NavProps {
  isCollapsed?: boolean
}

export function Dropdown({ }: NavProps) {
  // console.log(isCollapsed, 'Line 36')
  // const handleThemeChange = async (type: string) => {
  //   localStorage.setItem('theme', type)
  //   window.location.reload()
  // }
  // const { getTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex cursor-pointer items-center justify-center'>
          {/* {getTheme() == 'dark' ? (
            <img
              src='/images/Adoer-Black-Logo.png'
              alt='adoer logo'
              className='h-9 w-9'
            />
          ) : (
            <img
              src='/images/logo/adoer-logo.svg'
              alt='adoer logo light'
              className='h-9 w-9'
              onClick={() => posthog.capture('user_clicked_adoerIcon')}
            />
          )} */}
          <Settings className='h-6 w-6 stroke-1 transition-transform duration-300' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='ml-4 mt-2 w-64 border border-border bg-card/95 backdrop-blur-sm'>
        <DropdownMenuLabel className='text-foreground opacity-75'>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='text-foreground opacity-75'>
          <Link to='/settings/profile'>
            <DropdownMenuItem
              onClick={() => posthog.capture('user_clicked_profile')}
            >
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            disabled
            onClick={() => posthog.capture('user_clicked_billing')}
          >
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <Link to='/settings/account'>
            <DropdownMenuItem
              onClick={() => posthog.capture('user_clicked_setting')}
            >
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem disabled>
            <Keyboard className='mr-2 h-4 w-4' />
            <span>Keyboard shortcuts</span> */}
          {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
          {/* </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup className='text-foreground opacity-75'>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='focus-within:text-accent-foreground hover:text-accent-foreground focus:hover:text-accent-foreground focus-visible:text-accent-foreground data-[state=open]:text-accent-foreground'>
              <Palette className='mr-2 h-4 w-4' />
              <span>Change Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <div onClick={() => setTheme('light')}>
                  <DropdownMenuItem>Light</DropdownMenuItem>
                </div>
                <div onClick={() => setTheme('dark')}>
                  <DropdownMenuItem>Dark</DropdownMenuItem>
                </div>
                <div onClick={() => setTheme('system')}>
                  <DropdownMenuItem>System</DropdownMenuItem>
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup> */}
        <a
          href='https://forms.gle/brLdsKpMPAmSTHcc9'
          target='_blank'
          rel='noopener noreferrer'
        >
          <DropdownMenuItem
            className='text-foreground opacity-75'
            onClick={() => posthog.capture('user_clicked_feedbackform')}
          >
            <LifeBuoy className='mr-2 h-4 w-4' />
            <span>Submit Feedback</span>
          </DropdownMenuItem>
        </a>
        {/* <DropdownMenuItem> */}
        {/* <div className='flex hover:bg-slate-100'>
          <Cloud className='ml-2 mt-2 h-4 w-4 text-foreground opacity-75' /> */}
        {/* <span>API</span> */}
        {/* <Tour visible={true} /> */}
        {/* </DropdownMenuItem> */}
        {/* </div> */}
        <DropdownMenuSeparator />
        <Link to='/logout'>
          <DropdownMenuItem
            className='text-foreground opacity-75'
            onClick={() => posthog.capture('user_clicked_logout')}
          >
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
