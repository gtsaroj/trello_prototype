import { connectDb } from "../../../config/database";
import { encryptPassword } from "../../../helpers/encrypt/encryptPassword";
import { APIError } from "../../../helpers/error/apiError";
import { userValidate } from "../../../middlewares/user/user.validation";

export const createUser = async (data: User.User): Promise<User.User> => {
  if (!data.password) {
    throw new APIError("You must enter the password", 400);
  }
  const query = `
   INSERT INTO users (uid, role, display_name, email, photo_URL, "refreshToken", password) 
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   ON CONFLICT (uid) DO NOTHING 
   RETURNING *;
 `;
  const hashPassword = await encryptPassword(data.password as string);
  const values = [
    data.uid,
    data.role,
    data.displayName,
    data.email,
    data.photoURL,
    (data.refreshToken = ""),
    hashPassword,
  ];

  const pool = await connectDb();
  const checkUser = await userValidate(pool, data.email as string);
  if (checkUser) {
    throw new APIError("Email already exists", 400);
  }
  try {
    const { rows } = await pool?.query(query, values);
    return rows[0];
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode);
    }
    throw new APIError("Error while creating new user in database", 500,error);
  }
};
