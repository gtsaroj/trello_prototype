import { userLogin_action, userRegister_action } from "@/action";
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const userState: Auth.AddUser<Auth.User> = {
  data: {},
  isError: false,
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  error: "",
};

// Create slice
const userSlice = createSlice({
  name: "auth",
  initialState: userState,
  reducers: {
    authLogout: (state) => {
      state.data = {};
      state.isLoggedIn = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // User registration cases
    builder.addCase(userRegister_action.pending, (state) => {
      state.isLoading = true;
      state.error = "";
      state.isError = false;
      state.isLoggedIn = false;
      state.data = {};
    });
    builder.addCase(userRegister_action.fulfilled, (state, action) => {
      state.isLoading = false; // Set loading to false
      state.error = "";
      state.isError = false;
      state.isLoggedIn = true;
      state.data = action.payload as Auth.User;
    });
    builder.addCase(userRegister_action.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.data = {};
      state.error = action.payload as string;
    });

    // User login cases
    builder.addCase(userLogin_action.pending, (state) => {
      state.isLoading = true;
      state.error = "";
      state.isError = false;
      state.isLoggedIn = false;
      state.data = {};
    });
    builder.addCase(userLogin_action.fulfilled, (state, action) => {
      state.isLoading = false; // Set loading to false
      state.error = "";
      state.isError = false;
      state.isLoggedIn = true;
      state.isSuccess = true;
      state.data = action.payload as Auth.User;
    });
    builder.addCase(userLogin_action.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.data = {};
      state.error = action.payload as string;
    });
  },
});

// Export reducer and actions
export const authReducer = userSlice.reducer;
export const { authLogout } = userSlice.actions;
