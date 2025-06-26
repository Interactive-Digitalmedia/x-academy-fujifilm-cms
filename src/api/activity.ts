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

export const uploadActivity = async (payload: any) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }
  try {
    const response = await axios.post(
      `${baseUrl}activity/upload`, //imp
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading the activity", error);
    throw error;
  }
};

export const updateActivity = async (id: string, payload: any) => {
  const token = getTokenFromLocalStorage();
  const res = await axios.put(`${baseUrl}activity/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const getActivities = async () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }
  try {
    const response = await axios.get(`${baseUrl}activity/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the activities", error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${baseUrl}upload-image`, formData);
    return response.data; // returns { message, fileKey, publicUrl }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// export async function createFaq(payload: {
//   name: string;
//   items: { question: string; answer: string }[];
// }) {
//   const res = await fetch(`${baseUrl}faq/`, {
//     //imp
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) throw new Error("Failed to create FAQ");
//   return await res.json(); // Should return { _id: "...", ... }
// }

export const getActivitiesById = async (id: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}activity/${id}` // empty body
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching the billing address", error);
    throw error;
  }
};
export const deleteActivity = async (id: string) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token is not available.");
    return;
  }
  try {
    const response = await axios.delete(
      `${baseUrl}activity/${id}`, //imp
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading the activity", error);
    throw error;
  }
};
