import useGlobalStore from '@/state/GlobalState'
import posthog from 'posthog-js'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'

export default function GoogleLoginRedirect() {
  const location = useLocation()
  const { setSignedIn, setUser , setShowLoginModal} = useGlobalStore()

  useEffect(() => {
    function getDataFromParamsAndRedirect() {
      // run on component mount
      toast.loading('Logging in', { duration: 2000 })
      setShowLoginModal(false)
      setTimeout(() => {
        const params = new URLSearchParams(location.search)

        const userId = params.get('userId')
        const fullname = params.get('fullname')
        const googleUID = params.get('googleUID')
        const token = params.get('token')

        if (userId && fullname && googleUID && token) {
          posthog.identify(
            googleUID,  // Replace 'distinct_id' with your user's unique identifier
            { name: fullname } // optional: set additional person properties
          );
          setUser({ userId, fullname, googleUID, token })
        }

        setSignedIn(true)

        // navigate('/')
      }, 1500)
    }

    getDataFromParamsAndRedirect()
    return () => {}
  }, [location.search, setSignedIn, setUser])

  return <></>
}
