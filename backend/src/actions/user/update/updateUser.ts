import { connectDb } from "../../../config/database";
import { APIError } from "../../../helpers/error/apiError";

export const updateUserInDatabase = async (
  uid: string,
  key: keyof User.User, // Key to update
  value: string | undefined // New value
) => {
  const dbInstance = await connectDb();

  try {
    // Validate key to prevent SQL injection
    const allowedKeys: any = [
      "display_name",
      "email",
      "photo_URL",
      "refreshToken",
      "role",
    ];
    if (!allowedKeys.includes(key)) {
      throw new APIError("Invalid field to update", 400);
    }
    const values = [value, uid];
    if (key === "refreshToken") {
      const query = `UPDATE users SET "refreshToken" = $1 WHERE uid = $2 RETURNING *;`;
      const { rows } = await dbInstance?.query(query, values);
      return rows;
    }
    const query = `UPDATE users SET ${key} = $1 WHERE uid = $2 RETURNING *;`;

    const response = await dbInstance?.query(query, values);

    if (response?.rowCount === 0) {
      throw new APIError("User not found", 404);
    }

    return response?.rows; // Return updated user
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode);
    }
    throw new APIError("Error updating user in database", 500, error);
  }
};
