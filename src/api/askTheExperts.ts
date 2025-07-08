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

export const getAskTheExperts = async () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }
  try {
    const response = await axios.get(`${baseUrl}community/ask-to-experts/`, {
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

export const getAskTheExpertsById = async (id: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return { status: 401, message: "Token not available" };
  }
  try {
    const response = await axios.get(
      `${baseUrl}community/ask-to-experts/${id}`,
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
