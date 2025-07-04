import axios from "axios";
import { baseUrl } from "../utils/config";
interface FaqItem {
  question: string;
  answer: string;
}

interface CreateFaqPayload {
  name: string;
  faqType?: string; // "specific-event" or "general"
  items: FaqItem[];
}

interface UpdateFaqPayload {
  name?: string;
  items: {
    question?: string;
    answer?: string;
  }[];
}

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
export const getFaq = async () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }

  try {
    const response = await axios.get(
      `${baseUrl}faq/`, // empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching the billing address", error);
    throw error;
  }
};

export const createFaq = async (data: CreateFaqPayload) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }

  try {
    const response = await axios.post(`${baseUrl}faq/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating FAQ", error);
    throw error;
  }
};

export const updateFaq = async (id: string, data: UpdateFaqPayload) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }

  try {
    const response = await axios.put(`${baseUrl}faq/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating FAQ", error);
    throw error;
  }
};