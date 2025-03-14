import { ApiError } from "@/helpers";
import { loginUser } from "@/services";
import Cookies from "js-cookie";

import { toaster } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin_action = createAsyncThunk(
  "login",
  async (data: Auth.LoginType, thunkApi) => {
    try {
      const response = await loginUser(data.email, data.password);
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
