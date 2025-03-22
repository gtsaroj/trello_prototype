import { getUserFromDatabaseById } from "../../actions/user/get/getUser";
import { updateUserInDatabase } from "../../actions/user/update/updateUser";
import { APIError } from "../error/apiError";
import jwt from "jsonwebtoken";

const getAccessToken = async (uid: string, role: User.UserType) => {
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRESAT?.trim() || "1d"; // Ensure valid string

  try {
    const accessToken = jwt.sign(
      {
        uid,
        role,
      },
      process.env.ACCESS_TOKEN as string,
      {
        expiresIn: 86400,
      }
    );

    return accessToken;
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode, error);
    }
    throw new APIError("Error while generating accessToken", 500, error);
  }
};

const getRefreshToken = async (uid: string, role: User.UserType) => {
  try {
    const refreshToken = jwt.sign(
      {
        uid,
        role,
      },
      process.env.REFRESH_TOKEN as string,
      {
        expiresIn: 86400,
      }
    );
    return refreshToken;
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode, error);
    }
    throw new APIError("Error while generating refreshToken", 500, error);
  }
};

const generateAccessAndRefreshToken = async (
  uid: string,
  role: User.UserType
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await getUserFromDatabaseById(uid, role);
    if (!user) throw new APIError("User doesnt exist.", 404);

    const accessToken = await getAccessToken(uid, role);
    const refreshToken = await getRefreshToken(uid, role);
    user[0].refreshToken = refreshToken;
    await updateUserInDatabase(uid, "refreshToken", refreshToken);
    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIError("Error generating tokens. " + error, 500);
  }
};

const verifyToken = async (
  incomingToken: string,
  type: "refresh" | "access"
) => {
  try {
    const secret =
      type === "refresh" ? process.env.REFRESH_TOKEN : process.env.ACCESS_TOKEN;
    const decodedToken = jwt.verify(
      incomingToken,
      `${secret}`
    ) as User.DecodeToken;
    return decodedToken;
  } catch (error) {
    throw new APIError(
      "Error verifying your token. Please try again later. " + error,
      500
    );
  }
};

export { generateAccessAndRefreshToken, verifyToken };
