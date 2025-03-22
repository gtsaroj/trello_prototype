import { ApiError } from "@/helpers";
import { loginUsers } from "@/services";
import { toaster } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Async action for user login
export const userLogin_action = createAsyncThunk(
  "auth/login",
  async (data: Auth.LoginType, thunkApi) => {

    try {
      const response = await loginUsers(data.email, data.password);
      toaster({
        className: " bg-green-50",
        icon: "success",
        message: response.message,
        title: "Successfully login!",
      });
      Cookies.set("refreshToken", response?.data?.refreshToken, {
        expires: response?.data?.expiresAt,
        secure: true,
      });
      Cookies.set("accessToken", response?.data?.accessToken, {
        expires: response?.data?.expiresAt,
        secure: true,
      });
      return response?.data.data;
    } catch (error) {
      if (error instanceof ApiError) {
        toaster({
          className: " bg-red-50",
          icon: "error",
          message: error?.message,
          title: "Error",
        });
        throw thunkApi.rejectWithValue(error.message);
      }
    }
  }
);
