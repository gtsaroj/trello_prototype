import { deleteTodoFromDatabase } from "../../../actions/todo/delete/deleteTodo";
import { APIError } from "../../../helpers/error/apiError";
import { asyncHandler } from "../../../helpers/handlers/asynHandler";
import { Response, Request } from "express";

export const deleteTodo = asyncHandler(
  async (req: Request<{}, {}, { id: string }>, res: Response) => {
    const { id } = req.body;
    try {
      const todo = await deleteTodoFromDatabase(id);
      return res.status(200).json({
        status: 200,
        message: "Todo deleted successfully",
        success: true,
        data: [],
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
