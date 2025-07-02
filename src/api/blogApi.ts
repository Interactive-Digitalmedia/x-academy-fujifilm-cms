import axios from "axios";
import { baseUrl } from "../utils/config";

export function getTokenFromLocalStorage(): string | null {
  try {
    const state = localStorage.getItem("global-store");
    if (!state) return null;
    const stateObject = JSON.parse(state);
    return stateObject?.state?.user?.token ?? null;
  } catch (error) {
    console.error("Error parsing state from localStorage:", error);
    return null;
  }
}

export const uploadBlog = async (payload: any) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }

  try {
    const response = await axios.post(`${baseUrl}blogs`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Should contain saved blog and _id
  } catch (error) {
    console.error("Error uploading blog:", error);
    throw error;
  }
};

export const updateBlog = async (id: string, payload: any) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }

  try {
    const response = await axios.patch(`${baseUrl}blogs/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const getBlogs = async (payload = {}) => {
  try {
    const response = await axios.get(`${baseUrl}blogs/`, { params: payload });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogById = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};
