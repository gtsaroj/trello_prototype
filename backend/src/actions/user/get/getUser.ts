import { connectDb } from "../../../config/database";
import { APIError } from "../../../helpers/error/apiError";

export const getUserFromDatabaseById = async (
  uid: string,
  role: User.UserType
): Promise<User.User[]> => {
  const dbInstance = await connectDb();
  try {
    const query = `SELECT * FROM users WHERE uid = $1 AND role=$2 `;
    const values = [uid, role];
    const { rows } = await dbInstance.query(query, values);
    if (rows.length <= 0) {
      throw new APIError("User not found", 404);
    }
    return rows
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode);
    }
    throw new APIError("Error while fetching user from database ", 500);
  }
};
