import { Outlet, useNavigate } from 'react-router-dom'
import useGlobalStore from '../state/GlobalState'
import { useEffect } from 'react'

export default function CheckAuthLogin() {
  const { signedIn } = useGlobalStore()
  const navigate = useNavigate()
  useEffect(() => {
    // if already signed in, redirect to dashboard
    if (signedIn) {
      navigate('/')
    }
  }, [signedIn, navigate])

  return <>{!signedIn && <Outlet />}</>
}
