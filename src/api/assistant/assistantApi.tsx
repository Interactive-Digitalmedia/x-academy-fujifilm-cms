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

  export const sendTranscriptToAPI = async (url: string, payload: object, token: string) => {
    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  }
  export const getCaptures = async (url: string, token: string) => {
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  }

  export const saveCaptures = async (url: string, payload: object, token: string) => {
    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  }

  export const deleteCapture = async (url: string, payload: object, token: string) => {
    const response = await axiosInstance.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  }