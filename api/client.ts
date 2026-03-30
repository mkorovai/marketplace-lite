// axios
import axios, { AxiosError, AxiosInstance } from 'axios';

// store
import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = 'https://dummyjson.com';
let isLoggingOut = false;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await axiosInstance.get<T>(endpoint);
  return response.data;
}

export async function apiPost<T>(endpoint: string, data?: any): Promise<T> {
  const response = await axiosInstance.post<T>(endpoint, data);
  return response.data;
}
