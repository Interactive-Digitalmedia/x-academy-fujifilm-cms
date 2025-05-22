import { AxiosError } from 'axios'
import useGlobalStore from '@/state/GlobalState'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
// import { useTheme } from '@/utils/ThemeProvider'

// type Theme = 'dark' | 'light' | 'system'

export default function Logout() {
  const { setUser, setSignedIn } = useGlobalStore()
  // const { setTheme } = useTheme()
  useEffect(() => {
    const logoutCleanup = () => {
      setTimeout(() => {
        // reset state
        setUser(null)
        setSignedIn(false)

        // // clear stores except the ones you want to keep
        // const currentTheme = (localStorage.getItem('vite-ui-theme') ||
        //   'system') as Theme

        localStorage.clear()
        sessionStorage.clear()

        // theme settings persist even after logout
        // setTheme(currentTheme)
      }, 500)
    }
    try {
      //also call any server side logout route here e.g. token invalidation, session expiry
      logoutCleanup()
    } catch (err) {
      const error = err as AxiosError

      toast.error('Some error occurred while logging out')
      console.error(error.response)
    }
  }, [setSignedIn, setUser])

  return (
    <div className='absolute inset-0 z-10 grid min-h-screen place-content-center gap-8 bg-background'>
      <Loader size={64} className='mx-auto' strokeWidth={1.25} />
      <h3 className='text-xl font-semibold lg:text-3xl'>Logging out</h3>
    </div>
  )
}
