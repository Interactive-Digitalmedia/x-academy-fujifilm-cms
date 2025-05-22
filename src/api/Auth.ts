import axios from 'axios'
import { baseUrl } from '../utils/config'

export const deleteAccount = async (reason: string) => {
  const state = localStorage.getItem('global-store')
  let token: string = ''
  try {
    if (state) {
      const stateObject = JSON.parse(state)

      // Extract token if it exists in the state object
      token = stateObject?.state?.user?.token
    } else {
      console.warn('No global store found in localStorage.')
    }
  } catch (error) {
    console.error('Error parsing state from localStorage:', error)
  }
  return axios.delete(baseUrl + `auth/delete-account`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: { reason }
  })
}
