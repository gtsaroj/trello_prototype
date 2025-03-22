import {
  getTodoListFromDatabase,
  getTodosFromDatbase,
} from "../../../actions/todo/get/getTodo";
import { APIError } from "../../../helpers/error/apiError";
import { asyncHandler } from "../../../helpers/handlers/asynHandler";
import { Response } from "express";

export const getTodos = asyncHandler(async (_: any, res: Response) => {
  try {
    const todos = await getTodosFromDatbase();
    return res.status(200).json({
      status: 200,
      message: "Successfully fetched todos",
      success: true,
      data: todos,
    });
  } catch (error) {
    if (error instanceof APIError) {
      res.status(200).json({
        status: 400,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
});

export const getTodoList = asyncHandler(async (_: any, res: Response) => {
  try {
    const todos = await getTodoListFromDatabase();
    return res.status(200).json({
      status: 200,
      message: "Successfully fetched todolist",
      success: true,
      data: todos,
    });
  } catch (error) {
    if (error instanceof APIError) {
      res.status(200).json({
        status: 400,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
});
