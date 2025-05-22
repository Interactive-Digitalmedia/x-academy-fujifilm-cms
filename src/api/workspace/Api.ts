import { baseUrl } from '@/utils/config'
import axios from 'axios'

// houses all the api's for workspace

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    withCredentials: true,
    'Content-Type': 'application/json'
  }
})

async function getAllFn(url: string, token: string) {
  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

async function getOneFn(url: string, token: string) {
  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

// POST, create a resource
async function createOne<T>(url: string, token: string, payload: T) {
  const response = await axiosInstance.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

// PATCH, edit a resource
async function patchOne<T>(url: string, token: string, payload: T) {
  const response = await axiosInstance.patch(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

// DELETE, delete a resource
async function deleteOne(url: string, token: string) {
  const response = await axiosInstance.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}


export { getAllFn, getOneFn, createOne, deleteOne, patchOne }
