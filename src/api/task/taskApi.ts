import axios from 'axios'
import { baseUrl } from '@/utils/config'
import { getTokenFromLocalStorage } from '@/utils/TokenUtil'

export const postCreateTask = async (bodyData: any) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.post(`${baseUrl}task`, bodyData, {
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

export const deleteTask = async (bodyData: any) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.delete(`${baseUrl}task/delete-task`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: bodyData // Pass the body data here
    })

    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}

export const getOverDueTasks = async (baseDate: string) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.get(`${baseUrl}task/overdue?baseDate=${baseDate}`, {
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

export const getTasksByDate = async (date: string) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.get(`${baseUrl}task/fetch-tasks?date=${date}`, {
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

export const updateTask = async (bodyData: any) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.post(`${baseUrl}task/update-task`, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}

export const deleteTaskNew = async (_id: string) => {
  // Retrieve the global store state from localStorage
  const token = getTokenFromLocalStorage()
  if (!token) {
    console.error('Token is not available.')
    return
  }

  try {
    // Make the POST API call with the token in the headers and the body data
    const response = await axios.delete(`${baseUrl}task/delete-task/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    return response.data
  } catch (error) {
    console.error('Error deleting task api', error)
    throw error
  }
}
