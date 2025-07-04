import axios from 'axios'
import { baseUrl } from '../utils/config'

export function getTokenFromLocalStorage(): string | null {
    try {
      const state = localStorage.getItem('global-store')
      if (!state) return null
      const stateObject = JSON.parse(state)
      return stateObject?.state?.user?.token ?? null
    } catch (error) {
      console.error('Error parsing state from localStorage:', error)
      return null
    }
  }

export const createInvite = async (payload: any) => {
  console.log("payload :", payload)
    const token = getTokenFromLocalStorage()
    if (!token) {
      console.error('Token is not available.')
      return
    }
    try {
      const response = await axios.post(
        `${baseUrl}admin/create-invite`,
        payload, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('Error Sending Invite', error)
      throw error
    }
  }
  