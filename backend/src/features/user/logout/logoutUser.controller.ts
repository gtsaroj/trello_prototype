import { Request, Response } from "express";
import { asyncHandler } from "../../../helpers/handlers/asynHandler";
import { updateUserInDatabase } from "../../../actions/user/update/updateUser";
import { checkFields } from "../../../middlewares/field/validation";

const options = {
  httpOnly: true,
  secure: true,
};

const logOutUser = asyncHandler(
  async (req: Request<{}, {}, User.LogoutSchemaType>, res: Response) => {
    const { uid, role } = req.body;
    const errors = checkFields({ uid, role }, ["uid", "role"]);
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        errors: errors,
        message: "All fields are required",
      });
    }
    let response: Api.Response<[]>;
    await updateUserInDatabase(uid, "refreshToken", "");
    response = {
      data: [],
      message: "User logged out successfully",
      success: true,
      status: 200,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(response);
  }
);

export { logOutUser };
