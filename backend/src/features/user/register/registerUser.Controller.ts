import { createUser } from "../../../actions/user/add/registerUser";
import { asyncHandler } from "../../../helpers/handlers/asynHandler";
import { Request, Response } from "express";
import { generateAccessAndRefreshToken } from "../../../helpers/handlers/tokenHandler";
import { APIError } from "../../../helpers/error/apiError";
import { updateUserInDatabase } from "../../../actions/user/update/updateUser";
import { checkFields } from "../../../middlewares/field/validation";

export const registerUser = asyncHandler(
  async (req: Request<{}, {}, User.User>, res: Response) => {
    const data = req.body;
    const errors = checkFields(data, ["email", "password", "role", "password"]);
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        errors: errors,
        message: "All fields are required",
      });
    }

    try {
      const newUser = await createUser(data);
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        newUser.uid,
        newUser.role
      );
      await updateUserInDatabase(newUser.uid, "refreshToken", refreshToken);
      res.setHeader("x-access-token", accessToken);
      res.setHeader("x-refresh-token", refreshToken);
      return res.status(200).json({
        status: 200,
        data: {
          data: newUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
          success: true,
          message: "User created successfully",
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(error.statusCode).json({
          data: null,
          status: error.statusCode,
          success: false,
          message: error.message,
          error: error.error,
        });
      }
      return res.status(500).json({
        data: null,
        status: 500,
        success: false,
        message: "Error while creating new user",
        error: error,
      });
    }
  }
);
