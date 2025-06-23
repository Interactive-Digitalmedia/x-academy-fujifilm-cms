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

export const createAmbassadors = async (payload: any) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }

  try {
    const response = await axios.post(`${baseUrl}ambassadors/`, payload, {
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

export const getAmbassadors = async () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }

  try {
    const response = await axios.get(`${baseUrl}ambassadors/`, {
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

export const getAmbassadorsByUsername = async (username: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }

  try {
    const response = await axios.get(
      `${baseUrl}ambassadors/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { status: 500, message: "Something went wrong" };
  }
};

export const updateAmbassador = async (id: string, payload: any) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }

  try {
    const response = await axios.put(`${baseUrl}ambassadors/${id}/`, payload, {
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
