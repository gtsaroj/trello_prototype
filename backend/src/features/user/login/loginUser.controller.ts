import { asyncHandler } from "../../../helpers/handlers/asynHandler";
import { Request, Response } from "express";
import { generateAccessAndRefreshToken } from "../../../helpers/handlers/tokenHandler";
import { APIError } from "../../../helpers/error/apiError";
import { loginUser } from "../../../actions/user/login/loginuser";
import { checkFields } from "../../../middlewares/field/validation";

export const singIn = asyncHandler(
  async (
    req: Request<
      {},
      {},
      { email: string; password: string; role: User.UserType }
    >,
    res: Response
  ) => {
    const { email, password, role } = req.body;
    const errors = checkFields({ email, password, role }, [
      "email",
      "password",
      "role",
    ]);
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        errors: errors,
        message: "All fields are required",
      });
    }
    try {
      const newUser = await loginUser(email, password);

      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        newUser.uid,
        newUser.role
      );
      res.setHeader("x-access-token", accessToken);
      res.setHeader("x-refresh-token", refreshToken);
      res.status(200).json({
        status: 200,
        data: {
          data: newUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
          success: true,
          message: "User loggedin successfully",
        },
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
        message: "Error while login",
      });
    }
  }
);
