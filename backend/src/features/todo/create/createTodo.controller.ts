import {
  addTodoInDatabase,
  addTodoListInDatabase,
} from "../../../actions/todo/create/createTodo";
import { APIError } from "../../../helpers/error/apiError";
import { asyncHandler } from "../../../helpers/handlers/asynHandler";
import { Response, Request } from "express";

export const createTodo = asyncHandler(
  async (req: Request<{}, {}, Todo.Todo>, res: Response) => {
    const data = req.body;

    try {
      const response = await addTodoInDatabase(data);
      res.status(200).json({
        data: response,
        status: 200,
        message: "Todo created successfully",
        success: true,
      });
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

export const createTodoList = asyncHandler(
  async (
    req: Request<{}, {}, { todolist: Todo.TodoList<string>; todoId: string }>,
    res: Response
  ) => {
    const data = req.body;

    try {
      const response = await addTodoListInDatabase(
        data?.todoId,
        data?.todolist
      );
      res.status(200).json({
        data: response,
        status: 200,
        message: "TodoList created successfully",
        success: true,
      });
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
        message: "Error while add new todo_list",
      });
    }
  }
);
