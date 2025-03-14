import { userLogin_action } from "@/action";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export function loginUser<T extends Auth.AddUser<Auth.User>>(
  builder: ActionReducerMapBuilder<T>
) {
  builder.addCase(userLogin_action.pending, (state) => {
    state.isLoading = true;
    state.error = "";
    state.isError = false;
    state.isLoggedIn = false;
    state.data = {};
  });
  builder.addCase(userLogin_action.fulfilled, (state, action) => {
    state.isLoading = true;
    state.error = "";
    state.isError = false;
    state.isLoggedIn = true;
    state.data = action.payload as Auth.User;
  });
  builder.addCase(userLogin_action.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.data = {};
    state.error = action.payload as string;
  });
}
