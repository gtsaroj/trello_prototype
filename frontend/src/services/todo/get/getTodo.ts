import { ApiError } from "@/helpers";
import { makeRequest } from "@/makeRequest";
import axios from "axios";

export const getTodos = async () => {
  try {
    const response = await makeRequest({
      method: "get",
      url: "todos/todos",
    });
    return response?.data;
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

export const getTodoList = async () => {
  try {
    const response = await makeRequest({
      method: "get",
      url: "todos/todolist",
    });
    return response?.data;
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
