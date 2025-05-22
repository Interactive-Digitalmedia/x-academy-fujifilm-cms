import axios from 'axios'
import { baseUrl } from '@/utils/config'
import { getTokenFromLocalStorage } from '@/utils/TokenUtil'

export const getWorkspace = async () => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.get(`${baseUrl}workspace`, {
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

export const getSpaces = async (id: string) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.get(`${baseUrl}workspace/${id}/channel`, {
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
export const getSingleSpace = async (id: string, channelId: string) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.get(
      `${baseUrl}workspace/${id}/channel/${channelId}`,
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

export const createSpace = async (
  workspaceId: string,
  title: string,
  description?: string
) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }
  try {
    const response = await axios.post(
      `${baseUrl}workspace/${workspaceId}/channel`,
      {
        name: title,
        description: description
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error creating space:', error)
    throw Error
  }
}
export const updateSpace = async (
  workspaceId: string,
  channelId: string,
  title: string,
  description?: string
) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }
  try {
    const response = await axios.patch(
      `${baseUrl}workspace/${workspaceId}/channel/${channelId}`,
      {
        name: title,
        description: description
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error creating space:', error)
    throw Error
  }
}
export const deleteSpace = async (workspaceId: string, channelId: string) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }
  try {
    const response = await axios.delete(
      `${baseUrl}workspace/${workspaceId}/channel/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error deleting channel:', error)
    throw Error
  }
}

export const sendChannelInvite = async (email: string, channelId: string) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }
  const payload = { email, channelId }
  try {
    const response = await axios.post(
      `${baseUrl}workspace/channel-invite/send`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Error Sending Invitation', error)
    const errorMessage =
      error.response?.data?.message ||
      'Failed to send invitation. Please try again.'

    throw new Error(errorMessage)
  }
}

export const acceptChannelInvite = async (
  inviteToken: string,
  channelId: string
) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }
  try {
    const response = await axios.post(
      `${baseUrl}workspace/channel-invite/accept?token=${inviteToken}&channelId=${channelId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Error Sending Invitation', error)
    const errorMessage =
      error.response?.data?.message ||
      'Failed to send invitation. Please try again.'

    throw new Error(errorMessage)
  }
}

export const removeUserFromChannel = async (
  userId: string,
  channelId: string
) => {
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }
  try {
    const response = await axios.delete(
      `${baseUrl}workspace/channel-invite/remove`,
      {
        data: { userId, channelId },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Error Removing user', error)
    const errorMessage =
      error.response?.data?.message ||
      'Failed to Remove user. Please try again.'

    throw new Error(errorMessage)
  }
}

export const getBlocksByParent = async (
  id: string,
  channelId: string,
  parentId: string,
) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.get(
      `${baseUrl}workspace/${id}/channel/${channelId}/${parentId}`,
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
