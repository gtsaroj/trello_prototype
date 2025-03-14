import { ApiError } from "@/helpers";
import { registerUser } from "@/services";
import Cookies from "js-cookie";

import { toaster } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userRegister_action = createAsyncThunk(
  "register",
  async (data: Auth.User, thunkApi) => {
    try {
      const response = await registerUser(data);
      Cookies.set("refreshToken", response?.data?.refreshToken, {
        expires: response?.data?.expiresAt,
        secure: true,
      });
      Cookies.set("accessToken", response?.data?.accessTokent, {
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
        throw thunkApi?.rejectWithValue(error);
      }
    }
  }
);
