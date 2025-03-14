import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./login/loginUser";
import { registerUser } from "./register/registerUser";

const userState: Auth.AddUser<Auth.User> = {
  data: {},
  isError: false,
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  error: "",
};

const userSlice = createSlice({
  initialState: userState,
  name: "auth",
  extraReducers: (builder) => {
    loginUser(builder);
    registerUser(builder);
  },
  reducers: {},
});

export const authSlice = userSlice.reducer;
// export const {} = userSlice.actions;
