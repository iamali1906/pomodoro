const API_BASE_URL = import.meta.env.VITE_BASE_URL;

import axios, { AxiosError, AxiosResponse } from "axios";

// Interceptor to include the auth token
axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    console.log("token::::::::", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle 401 (Unauthorized) errors for expired tokens
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized (401) error. Token might be expired.");
      localStorage.removeItem("token");
      window.location.reload();
      return Promise.reject(new Error("Unauthorized (401)"));
    }
    return Promise.reject(error);
  }
);

// GET request
export const getData = async <T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(
      `${API_BASE_URL}${endpoint}`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// POST request
export const postData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(
      `${API_BASE_URL}${endpoint}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// PUT request
export const putData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.put(
      `${API_BASE_URL}${endpoint}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// DELETE request
export const deleteData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.delete(
      `${API_BASE_URL}${endpoint}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
