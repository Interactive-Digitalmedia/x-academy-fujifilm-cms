import { baseUrl } from '@/utils/config'
import axios from 'axios'

export const fetchUserByIds = async (userIds: string[]) => {
  // Retrieve the global store state from localStorage
  const state = localStorage.getItem('global-store')

  let token = null

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

  // Ensure you have a token before making the request
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.post(
      `${baseUrl}profile/retrieveUsersByIds`,
      { userIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error creating task api', error)
    throw error
  }
}
