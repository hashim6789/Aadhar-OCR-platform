import { ENV } from "@/configs";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${ENV.SERVER_ORIGIN}/api`, // Replace with your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);

// Utility function to get axios error message
export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (axios.isAxiosError(error) && error.response?.data?.error) {
    return error.response.data.error;
  }
  return fallback;
}
