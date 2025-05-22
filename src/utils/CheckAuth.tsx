import { Outlet, useNavigate } from 'react-router-dom'
import useGlobalStore from '../state/GlobalState'
import { useEffect } from 'react'

export default function CheckAuth() {
  const { signedIn } = useGlobalStore()
  const navigate = useNavigate()

  const { user } = useGlobalStore()
  const bearerToken = user?.token as string

  function parseJwt(token: string) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload)
  }

  useEffect(() => {
    // if not signed in, redirect to login
    if (!signedIn) {
      navigate('/home')
    }
    if (bearerToken) {
      const decoded = parseJwt(bearerToken)
      const expirationTime = decoded.exp * 1000
      const isTokenValid = Date.now() < expirationTime
      if (!isTokenValid) {
        navigate('/logout')
      }
    }
  }, [signedIn, navigate, bearerToken])

  // prevent rendering outlet if not signed in
  return <>{signedIn && <Outlet />}</>
}
