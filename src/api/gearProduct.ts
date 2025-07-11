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

export const uploadGearProduct = async (payload: any) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }
  try {
    const response = await axios.post(`${baseUrl}gear`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading gear product", error);
    throw error;
  }
};

export const getAllGearProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}gear`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gear products", error);
    throw error;
  }
};

export const updateGearProduct = async (id: string, payload: any) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }
  try {
    const response = await axios.put(`${baseUrl}gear/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating gear product", error);
    throw error;
  }
};

export const deleteGearProduct = async (id: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }
  try {
    const response = await axios.delete(`${baseUrl}gear/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting gear product", error);
    throw error;
  }
};
