import axios from "axios";
import { baseUrl } from "../utils/config";

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

export const uploadImage = async (file: File): Promise<{ publicUrl: string }> => {
  const token = getTokenFromLocalStorage();
  if (!token) throw new Error("No auth token found");

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${baseUrl}upload-image`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // expected: { publicUrl }
};
