import bcrypt from "bcryptjs";
import { connectDb } from "../../../config/database";
import { APIError } from "../../../helpers/error/apiError";
import { decryptPassword } from "../../../helpers/decrypt/decryptPassword";

const loginUser = async (
  email: string,
  password: string
): Promise<User.User> => {
  const dbInstance = await connectDb();
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await dbInstance.query(query, [email]);
 
  if (result.rows.length === 0) {
    throw new APIError("Your email doesn't exist", 400);
  }

  const user = result.rows[0];
  const isPasswordValid = await decryptPassword(password, user.password);

  if (!isPasswordValid) {
    throw new APIError("Incorrect password", 404);
  }

  return user; // You can generate a JWT here for authentication
};

export { loginUser };
