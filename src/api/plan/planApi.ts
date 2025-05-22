import axios from 'axios'
import { baseUrl } from '@/utils/config'
import { getTokenFromLocalStorage } from '@/utils/TokenUtil'

export const expireMyTrial = async () => {
    const token = getTokenFromLocalStorage()
    if (!token) {
      console.error('Token is not available.')
      return
    }
  
    try {
      const response = await axios.patch(
        `${baseUrl}plan/expire-trial`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
  
      return response.data
    } catch (error) {
      console.error('Error expiring trial', error)
      throw error
    }
  }

  export const expireMySubscription = async () => {
    const token = getTokenFromLocalStorage()
    if (!token) {
      console.error('Token is not available.')
      return
    }
  
    try {
      const response = await axios.patch(
        `${baseUrl}plan/expire-subscription`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
  
      return response.data
    } catch (error) {
      console.error('Error expiring subscription', error)
      throw error
    }
  }
  
  export const fetchPlans = async () => {
    const token = getTokenFromLocalStorage()
    if (!token) {
      console.error('Token is not available.')
      return
    }
  
    try {
      const response = await axios.get(
        `${baseUrl}plan/`,// empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
  
      return response.data
    } catch (error) {
      console.error('Error expiring trial', error)
      throw error
    }
  }

  export const getBillingAddress = async () => {
    const token = getTokenFromLocalStorage()
    if (!token) {
      console.error('Token is not available.')
      return
    }
  
    try {
      const response = await axios.get(
        `${baseUrl}plan/get-billing-address`,// empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
  
      return response.data
    } catch (error) {
      console.error('Error fetching the billing address', error)
      throw error
    }
  }


  export const createPaymentLink = async (payload: any) => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.error('Token is not available.');
      return { error: 'Token is not available.' }; // Provide feedback
    }
  
    try {
      const response = await axios.post(
        `${baseUrl}plan/create-payment-link`, // empty body
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        return response.data; // Success response
      } else {
        console.error('Unexpected response status:', response.status);
        return { error: `Unexpected response status: ${response.status}` };
      }
    } catch (error: any) {
      // Check if the error is related to the network
      if (error.response) {
        // HTTP error
        console.error('HTTP error:', error.response.status, error.response.data);
        return { error: `Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}` };
      } 
    }
  };
  
  export const paymentVerify = async (paymentId:string) => {
    const token = getTokenFromLocalStorage();
    if (!token) {
      console.error('Token is not available.');
      return { error: 'Token is not available.' }; // Provide feedback
    }
  
    try {
      const response = await axios.post(
        `${baseUrl}plan/verify`, // empty body
        { paymentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        return response.data; // Success response
      } else {
        console.error('Unexpected response status:', response.status);
        return { error: `Unexpected response status: ${response.status}` };
      }
    } catch (error: any) {
      // Check if the error is related to the network
      if (error.response) {
        // HTTP error
        console.error('HTTP error:', error.response.status, error.response.data);
        return { error: `Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}` };
      } 
    }
  };
  


