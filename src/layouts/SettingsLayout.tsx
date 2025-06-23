import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings/profile'
  },
  {
    title: 'Account',
    href: '/settings/account'
  }
]

const SettingsLayout = () => {
  return (
    <section className='relative h-screen md:mb-0'>
      {/* Main content container */}
      <div className={`hidden space-y-6 pb-16 xs:block md:block `}>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
          <p className='text-muted-foreground'>
            Manage your account settings and set e-mail preferences.
          </p>
        </div>

        <Separator className='h-[1px] w-full bg-foreground bg-opacity-10' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            {/* <SettingsSidebar items={sidebarNavItems} /> */}
          </aside>
          <div className='flex-1 lg:max-w-2xl'>
            <Outlet />
          </div>
        </div>
      </div>

      {/* Absolute positioned button */}
      <Link to={'/'}>
        <Button
          className='text-md absolute flex items-center justify-center xs:bottom--1 xs:left-5 md:bottom-4 md:left-4'
          // variant={'outline'}
        >
          <ChevronLeft className='mr-2' />
          Go Back to Dashboard
        </Button>
      </Link>
    </section>
  )
}

export default SettingsLayout
