import axios from "axios";
import { baseUrl } from "../utils/config";
import { SupportTicket } from "@/types";

// Helper to get token
function getTokenFromLocalStorage(): string | null {
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

// Create a support ticket (user)
export const createSupportTicket = async (data: Partial<SupportTicket>) => {
  const token = getTokenFromLocalStorage();
  if (!token) return { status: 401, message: "Token not available" };

  try {
    const res = await axios.post(`${baseUrl}support-ticket`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response?.data ?? { status: 500, message: "Something went wrong" };
  }
};

// Get all tickets (admin)
export const getAllSupportTickets = async (params?: {
  status?: string;
  type?: string;
  userId?: string;
  page?: number;
  limit?: number;
}) => {
  const token = getTokenFromLocalStorage();
  if (!token) return { status: 401, message: "Token not available" };

  try {
    const res = await axios.get(`${baseUrl}support-ticket`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return res.data;
  } catch (error: any) {
    return error.response?.data ?? { status: 500, message: "Something went wrong" };
  }
};

// Get ticket by ID (admin)
export const getSupportTicketById = async (id: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) return { status: 401, message: "Token not available" };

  try {
    const res = await axios.get(`${baseUrl}support-ticket/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response?.data ?? { status: 500, message: "Something went wrong" };
  }
};

// Update ticket (admin)
export const updateSupportTicket = async (
  id: string,
  updateData: Partial<SupportTicket>
) => {
  const token = getTokenFromLocalStorage();
  if (!token) return { status: 401, message: "Token not available" };

  try {
    const res = await axios.put(`${baseUrl}support-ticket/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response?.data ?? { status: 500, message: "Something went wrong" };
  }
};

// Delete ticket (admin)
export const deleteSupportTicket = async (id: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) return { status: 401, message: "Token not available" };

  try {
    const res = await axios.delete(`${baseUrl}support-ticket/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response?.data ?? { status: 500, message: "Something went wrong" };
  }
};
