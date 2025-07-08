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

export const getTipsAndTricks = async () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }
  try {
    const response = await axios.get(`${baseUrl}community/tips-and-tricks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { status: 500, message: "Something went wrong" };
  }
};

export const createTipsAndTricks = async (payload: {
  name: string;
  items: { title: string; description: string; icon: string }[];
}) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }

  try {
    const response = await axios.post(
      `${baseUrl}community/tips-and-tricks`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;
    return { status: 500, message: "Something went wrong" };
  }
};

export const updateTipsAndTricks = async (
  id: string,
  updateData: {
    name?: string;
    items?: {
      _id?: string; // Include _id for existing items, optional for new ones
      title: string;
      description: string;
      icon: string;
    }[];
  }
) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }

  try {
    const response = await axios.put(
      `${baseUrl}community/tips-and-tricks/${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;
    return { status: 500, message: "Something went wrong" };
  }
};

export const deleteTipsAndTricks = async (id: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }

  try {
    const response = await axios.delete(
      `${baseUrl}community/tips-and-tricks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;
    return { status: 500, message: "Something went wrong" };
  }
};




