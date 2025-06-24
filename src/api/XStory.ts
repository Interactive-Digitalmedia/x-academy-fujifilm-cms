import axios from "axios";
import { baseUrl } from "@/utils/config";

export function getTokenFromLocalStorage(): string | null {
  try {
    const state = localStorage.getItem("global-store");
    if (!state) return null;
    const stateObject = JSON.parse(state);
    return stateObject?.state?.user?.token ?? null;
  } catch (error) {
    console.error("Error parsing token from local storage:", error);
    return null;
  }
}

export const uploadXStory = async (payload: FormData) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await axios.post(`${baseUrl}xStory`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating the X-Story:", error);
    throw error;
  }
};

export const updateXStory = async (id: string, payload: FormData) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await axios.patch(`${baseUrl}xStory/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating the X-Story:", error);
    throw error;
  }
};

export const getAllXStories = async () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Admin token is not available.");
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await axios.get(`${baseUrl}xStory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching X-Stories:", error);
    throw error;
  }
};

export const getXStoryById = async (id: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await axios.get(`${baseUrl}xStory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the X-Story by ID:", error);
    throw error;
  }
};

export const deleteXStory = async (id: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    throw new Error("Authentication token not found.");
  }

  try {
    const response = await axios.delete(`${baseUrl}xStory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting the X-Story:", error);
    throw error;
  }
};
