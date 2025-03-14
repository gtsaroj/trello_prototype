import axios, { AxiosInstance } from "axios";
export const makeRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ensure this is set correctly in the environment file
});
