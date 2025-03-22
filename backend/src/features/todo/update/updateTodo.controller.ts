import { updateTodoInDatabase } from "../../../actions/todo/update/updateTodo";
import { updateUserInDatabase } from "../../../actions/user/update/updateUser";
import { APIError } from "../../../helpers/error/apiError";
import { asyncHandler } from "../../../helpers/handlers/asynHandler";
import { Response, Request } from "express";

export const updateTodo = asyncHandler(
  async (
    req: Request<
      {},
      {},
      {
        todoId: string;
        key: keyof Todo.Todo;
        value: string;
      }
    >,
    res: Response
  ) => {
    const { key, value, todoId } = req.body;
    try {
      const todo = updateTodoInDatabase(todoId, key, value);
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(error.statusCode).json({
          data: null,
          status: error.statusCode,
          success: false,
          message: error.message,
        });
      }
      return res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: "Error while add new todo",
      });
    }
  }
);

export const updateTodoList = asyncHandler(
  async (
    req: Request<
      {},
      {},
      {
        todoId: string;
        key: keyof Todo.Todo;
        value: string;
      }
    >,
    res: Response
  ) => {
    const { key, value, todoId } = req.body;
    try {
      const todo = updateTodoInDatabase(todoId, key, value);
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(error.statusCode).json({
          data: null,
          status: error.statusCode,
          success: false,
          message: error.message,
        });
      }
      return res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: "Error while add new todo",
      });
    }
  }
);
