import { updateUserInDatabase } from "../../../actions/user/update/updateUser";
import { APIError } from "../../../helpers/error/apiError";
import { asyncHandler } from "../../../helpers/handlers/asynHandler";
import { Request, Response } from "express";

export const updateUser = asyncHandler(
  async (
    req: Request<{}, {}, { uid: string; value: string; key: keyof User.User }>,
    res: Response
  ) => {
    const data = req.body;
    try {
      const user = updateUserInDatabase(data.uid, data.key, data.value);
    } catch (error) {
      if (error instanceof APIError) {
        throw new APIError(error.message, error.statusCode);
      }
      throw new APIError("Error while updating user", 500);
    }
  }
);
