import { ApiError } from "@/helpers";
import { registerUser } from "@/services";
import { toaster } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Async action for user registration
export const userRegister_action = createAsyncThunk(
  "auth/register",
  async (data: Auth.User, thunkApi) => {
    const loading = toaster({
      icon: "loading",
      message: "Loading...",
    });
    try {
      const response = await registerUser(data);
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
    } finally {
      toast.dismiss(loading);
    }
  }
);
