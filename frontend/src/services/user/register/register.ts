import { ApiError } from "@/helpers";
import { makeRequest } from "@/makeRequest";
import axios from "axios";

export const registerUser = async (
  data: Auth.User
): Promise<Api.Response<Auth.AuthResponse>> => {
  try {
    const response = await makeRequest({
      method: "post",
      url: "auth/register",
      data: { ...data },
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
  }
};
