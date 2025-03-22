import dotenv from "dotenv";
import { getUserFromDatabaseById } from "../../actions/user/get/getUser";
import { verifyToken } from "../../helpers/handlers/tokenHandler";
import { asyncHandler } from "../../helpers/handlers/asynHandler";
import { APIError } from "../../helpers/error/apiError";
import { Response, Request } from "express";

dotenv.config();

export const verifyRoles = (allowedRoles: User.UserType[]) => {
  return asyncHandler(
    async (req: any, res: Response<Api.Response<null>>, next: any) => {
      const accessToken =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!accessToken) {
        res.status(400).json({
          status: 401,
          data: null,
          message: "Unauthorized access, Tokens unaviable.",
          success: false,
        });
      }
      const decodedAccessToken = await verifyToken(accessToken, "access");

      const user = await getUserFromDatabaseById(
        `${decodedAccessToken.uid}`,
        decodedAccessToken.role
      );
      if (!user) {
        res.status(401).json({
          message: "Invalid or expired access token",
          data: null,
          status: 400,
          success: false,
        });
      }

      req.user = user;
      if (!allowedRoles.includes(user[0].role)) {
        res.status(401).json({
          message: "Unauthorized access. ${user.role} cannot access.",
          data: null,
          status: 401,
          success: false,
        });
      }
      next();
    }
  );
};
