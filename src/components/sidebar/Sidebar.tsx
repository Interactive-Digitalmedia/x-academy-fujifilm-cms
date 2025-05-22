const CHANNEL_NAME_MAX_LEN = 17
import { Link, useLocation } from 'react-router-dom'
import { LockKeyhole, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import gift from '/public/images/GiftCard.svg'

import { Button } from '@/components/ui/button'

interface NavProps {
  isCollapsed: boolean
  links: {
    url: any
    title: string
    label?: string
    icon: React.ElementType
    isActive: boolean
    variant: 'default' | 'ghost'
  }[]
}

export default function Sidebar({ links, isCollapsed }: NavProps) {
  const location = useLocation()
  const isSettingPage = location.pathname.includes('/settings')
  const [isSearchModalOpen, setIsSsearchModalOpen] = useState(false)
  const [openModal, setOpenModal] = useState<string | null>(null)

  const handleClick = (title: string) => {
    if (title === 'Search ⌘+k') {
      setIsSsearchModalOpen(true)
    } else {
      posthog.capture(`user_clicked_${title}`)
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSsearchModalOpen(true)
        // Open modal globally using `Cmd + M` or `Ctrl + M`
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <>
      <div
        data-collapsed={isCollapsed}
        className={`group flex min-h-screen flex-col justify-between gap-4 px-2 py-3 ${!isCollapsed ? 'min-w-[215px]' : ''} transition-all duration-500 ease-in-out`}
      >
        <TooltipProvider>
          <nav
            className={`flex w-full min-w-full flex-col gap-1 ${isCollapsed && 'mt-6 items-center'} `}
          >
            {links.map((link, index) => {
              const isSearch = link.title === 'Search ⌘+k'
              const linkContent = (
                <>
                  <link.icon
                    className={
                      isCollapsed ? 'h-4 w-4 cursor-pointer' : 'mr-2 h-4 w-4'
                    }
                  />
                  {!isCollapsed && link.title}
                  {!link.isActive && !isCollapsed && (
                    <LockKeyhole className='ml-2 h-3 w-3' />
                  )}
                  {link.label && !isCollapsed && (
                    <span
                      className={cn(
                        'ml-auto',
                        link.variant === 'default' &&
                          'text-background dark:text-white'
                      )}
                    >
                      {link.label}
                    </span>
                  )}
                </>
              )

              return isCollapsed ? (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    {isSearch ? (
                      <button
                        onClick={() => handleClick(link.title)}
                        className={cn(
                          buttonVariants({
                            variant: link.variant,
                            size: 'icon'
                          }),
                          'h-9 w-9 rounded-full border-1 bg-background shadow-large',
                          link.variant === 'default' &&
                            'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                          !link.isActive && 'text-zinc-300'
                        )}
                      >
                        {linkContent}
                        <span className='sr-only'>{link.title}</span>
                      </button>
                    ) : (
                      <Link
                        to={link.isActive ? link.url.toLowerCase() : '#'}
                        className={cn(
                          buttonVariants({
                            variant: link.variant,
                            size: 'icon'
                          }),
                          'h-9 w-9',
                          link.variant === 'default' &&
                            'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                          !link.isActive && 'text-zinc-300'
                        )}
                        onClick={() => handleClick(link.title)}
                      >
                        {linkContent}
                        <span className='sr-only'>{link.title}</span>
                      </Link>
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    side='right'
                    className='z-50 flex items-center gap-4'
                  >
                    {link.title}
                    {link.label && (
                      <span className='ml-auto text-muted-foreground'>
                        {link.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : isSearch ? (
                <button
                  key={index}
                  onClick={() => handleClick(link.title)}
                  className={cn(
                    'duration-150',
                    buttonVariants({ variant: link.variant, size: 'sm' }),
                    link.variant === 'default'
                      ? 'dark:hover:bg-muted dark:hover:text-white'
                      : 'text-muted-foreground hover:bg-black hover:text-white',
                    'w-full justify-start text-left',
                    !link.isActive && 'text-zinc-300'
                  )}
                >
                  {linkContent}
                </button>
              ) : (
                <Link
                  id={link.title}
                  key={index}
                  to={link.isActive ? link.url.toLowerCase() : '#'}
                  className={cn(
                    'duration-150',
                    buttonVariants({ variant: link.variant, size: 'sm' }),
                    link.variant === 'default'
                      ? 'dark:hover:bg-muted dark:hover:text-white'
                      : 'text-muted-foreground hover:bg-black hover:text-white',
                    'justify-start',
                    !link.isActive && 'text-zinc-300'
                  )}
                >
                  {linkContent}
                </Link>
              )
            })}
          </nav>
        </TooltipProvider>
        <div className='flex flex-col items-center justify-center'>
          <div
            onClick={() => setOpenModal('billing')}
            className={`logo-adoer mb-4 flex h-9 w-9 cursor-pointer flex-col items-center justify-center rounded-lg transition-colors`}
          >
            <img src={gift} alt='Gift' />
          </div>
          <div
            className={`logo-adoer mb-4 flex h-9 w-9 flex-col items-center justify-center rounded-lg transition-colors`}
          >
            <ModeToggle />
          </div>
          <div
            className={`logo-adoer mb-4 flex h-9 w-9 flex-col items-center justify-center rounded-lg transition-colors ${
              isSettingPage ? 'bg-black text-white' : 'text-foreground'
            }`}
          >
            <Link to='/settings'>
              <Settings className='h-6 w-6 stroke-1 transition-transform duration-300' />
            </Link>
            {/* <Dropdown isCollapsed={isCollapsed} /> */}
          </div>
        </div>
      </div>
      <BillingModal
        isOpen={openModal === 'billing'}
        onClose={() => setOpenModal(null)}
      />
      <NotesProvider>
        <SearchModal
          isOpen={isSearchModalOpen}
          onOpenChange={setIsSsearchModalOpen}
        />
      </NotesProvider>
    </>
  )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createOne } from '@/api/workspace/Api'
import useGlobalStore from '@/state/GlobalState'
import { AxiosError } from 'axios'
// import { Dropdown } from './Dropdown'
import posthog from 'posthog-js'
import { ModeToggle } from '@/utils/ModeToggle'
import SearchModal from '../searchModal/SearchModal'
import { NotesProvider } from '@/hooks/use-notes'
import BillingModal from '../modal/BillingModal'
// import { ModeToggle } from '../ui/mode-toggle'

export function AddNewChannelDialog({
  children,
  handleChannelChange
}: {
  children: React.ReactNode
  handleChannelChange?: (id: string) => void
}) {
  const { user, workspace, setWorkspace } = useGlobalStore()
  const [open, setOpen] = useState<boolean>(false)

  const [channelName, setChannelName] = useState<string>('Enter channel name')

  // you can even add a channel from here, let's house it here for now
  const onSubmit = async () => {
    if (channelName == '') {
      toast.error('Area name cannot be empty')
      return
    }
    if (channelName.length > CHANNEL_NAME_MAX_LEN) {
      toast.error(
        `Area name cannot be greater than ${CHANNEL_NAME_MAX_LEN} chars`
      )
      return
    }
    if (!user) return // 🔴 this check is gettin old, should be somewhere global and should even be reflected in types

    const postUrl = `/workspace/${workspace?.workspaceId}/channel`
    const bearerToken = user?.token
    const payload = { name: channelName }

    // add new channel
    try {
      const response = await createOne<typeof payload>(
        postUrl,
        bearerToken,
        payload
      )
      toast.success('New channel created!')

      // console.log(response.data)
      // update data in context for re-render
      const newChannels = workspace?.channels
      newChannels?.push(response.data)
      setWorkspace({ ...workspace, channels: newChannels })
      handleChannelChange && handleChannelChange(response.data._id)
      setOpen(false) // close dialog after task creation is successful
    } catch (error) {
      const err = error as AxiosError
      const toastMessage =
        // @ts-expect-error custom error code
        err?.response?.data?.message || 'Unknown error. Check console'
      toast.error(toastMessage.toString())
      // console.log(err)
    }
  }
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className='border border-border bg-popover sm:max-w-[425px]'
        // is triggering the POST req twice when
        // onKeyDown={(e) => {
        //   if (e.key == 'Enter') {
        //     onSubmit()
        //   }
        // }}
      >
        <DialogHeader className='mb-4'>
          <DialogTitle>Add a new channel</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className=''>
            {/* <Label htmlFor='name' className='text-right'>
              Name
            </Label> */}
            <Input
              id='name'
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value)
              }}
              className='w-full border border-border bg-transparent'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            size={'sm'}
            onClick={onSubmit}
            className='button-standard'
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
