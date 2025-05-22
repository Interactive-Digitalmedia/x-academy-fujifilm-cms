import { useEffect } from 'react'
import useGlobalStore from '@/state/GlobalState'

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.warn('⚠️ Token parsing failed:', e)
    return null
  }
}

export default function useAuthValidator() {
  const { user, setSignedIn } = useGlobalStore()

  useEffect(() => {
    if (!user?.token) {
      console.info('🔒 No token found — setting signedIn = false')
      setSignedIn(false)
      return
    }

    const decoded = parseJwt(user.token)
    if (!decoded) {
      console.warn('⚠️ Invalid token format — setting signedIn = false')
      setSignedIn(false)
      return
    }

    if (!decoded.exp) {
      console.warn('⚠️ Token has no expiration (`exp`) — setting signedIn = false')
      setSignedIn(false)
      return
    }

    const expirationTime = decoded.exp * 1000
    if (Date.now() >= expirationTime) {
      console.warn('🔓 Token expired — setting signedIn = false')
      setSignedIn(false)
    } else {
      console.log('✅ Token valid — setting signedIn = true')
      setSignedIn(true)
    }
  }, [user, setSignedIn])
}
