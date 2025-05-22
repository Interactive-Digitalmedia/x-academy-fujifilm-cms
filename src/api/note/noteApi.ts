import axios from 'axios'
import { baseUrl } from '@/utils/config'

export const postCreateNote = async (bodyData: any) => {
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
    const response = await axios.post(`${baseUrl}note/create-note`, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error creating task api', error)
    throw error
  }
}

export const deleteNote = async (_id: string) => {
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
    const response = await axios.delete(`${baseUrl}note/delete-note/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}


export const deleteSpecificRecurringNote = async (
  parentId: string,
  occurrenceDate: string
) => {
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
    const response = await axios.delete(
      `${baseUrl}note/${parentId}/occurrences/${occurrenceDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}
export const deleteAllRecurringNote = async (parentId: string) => {
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
    const response = await axios.delete(`${baseUrl}note/${parentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}

export const updateNote = async (bodyData: any, _id: string) => {
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
    const response = await axios.patch(
      `${baseUrl}note/update-note/${_id}`,
      bodyData, // Body data as second argument
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}

export const updateGoogleCalendarEvent = async (
  eventId: string,
  updateData: any
) => {
  const state = localStorage.getItem('global-store')
  let token = null

  try {
    if (state) {
      const stateObject = JSON.parse(state)
      token = stateObject?.state?.user?.token
    } else {
      console.warn('No global store found in localStorage.')
    }
  } catch (error) {
    console.error('Error parsing state from localStorage:', error)
  }

  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    const response = await axios.patch(
      `${baseUrl}v2/calendar/event/${eventId}`, // Assuming this matches your backend route
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error updating Google Calendar event:', error)
    throw error
  }
}

// update specific recurrence
export const updateRecurringNote = async (
  bodyData: any,
  parentId: string,
  date: string
) => {
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
    const response = await axios.patch(
      `${baseUrl}note/${parentId}/occurrences/${date}`,
      bodyData, // Body data as second argument
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}
export const updateParentRecurringNote = async (
  bodyData: any,
  parentId: string,
) => {
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
    const response = await axios.patch(
      `${baseUrl}note/${parentId}`,
      bodyData, // Body data as second argument
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}

export const junkNote = async (bodyData: any, _id: string) => {
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
    const response = await axios.patch(
      `${baseUrl}note/junk-note/${_id}`,
      bodyData, // Body data as second argument
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}

export const fetchNotes = async (bodyData?: any) => {
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
    const response = await axios.get(`${baseUrl}note`, {
      params: bodyData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error creating task api', error)
    throw error
  }
}
export const fetchJunk = async () => {
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
    const response = await axios.get(`${baseUrl}note/get-junk`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error creating task api', error)
    throw error
  }
}

export const search = async (bodyData?: any) => {
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
    const response = await axios.get(`${baseUrl}note/search`, {
      params: bodyData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error in search api', error)
    throw error
  }
}

export const fetchBlockesById = async ({
  id,
  includeChildren = false
}: {
  id: string
  includeChildren?: boolean
}) => {
  const state = localStorage.getItem('global-store')
  let token = null

  try {
    if (state) {
      const stateObject = JSON.parse(state)
      token = stateObject?.state?.user?.token
    } else {
      console.warn('No global store found in localStorage.')
    }
  } catch (error) {
    console.error('Error parsing state from localStorage:', error)
  }

  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    const response = await axios.get(
      `${baseUrl}note/${id}${includeChildren ? '?parentId=true' : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error in fetchBlockesById:', error)
    throw error
  }
}
