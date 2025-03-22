import { ApiError } from "@/helpers";
import { makeRequest } from "@/makeRequest";
import axios from "axios";

export const uploadTodo = async (data: {
  title: string;
  id: string;
}): Promise<Api.Response<{ id: string; title: string; createdAt: string }>> => {
  try {
    const response = await makeRequest({
      method: "post",
      url: "/todos/add",
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
export const uploadTodoList = async (
  data: Model.TodoList
): Promise<Api.Response<Model.TodoList[]>> => {
  console.log(data)
  try {
    const response = await makeRequest({
      method: "post",
      url: "/todos/add-todolist",
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
