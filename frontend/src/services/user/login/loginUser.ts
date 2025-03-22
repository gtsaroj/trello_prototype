import { ApiError } from "@/helpers";
import { makeRequest } from "@/makeRequest";
import { toaster } from "@/utils";
import axios from "axios";
import toast from "react-hot-toast";

export const loginUsers = async (
  email: string,
  password: string
): Promise<Api.Response<Auth.AuthResponse>> => {
  const loading = toaster({
    icon: "loading",
    message: "Loading...",
  });
  try {
    const response = await makeRequest({
      method: "post",
      url: "users/login",
      data: { email, password, role: "authenticatedUser" },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error?.response?.status || 500;
      const message = error?.response?.data?.message;
      const errorMessage = error?.response?.data?.error;
      throw new ApiError(statusCode, message, errorMessage, false);
    }
    throw new ApiError(500);
  } finally {
    toast.dismiss(loading);
  }
};
