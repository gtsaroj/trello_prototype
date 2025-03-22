import { Pool } from "pg";
import { APIError } from "../../helpers/error/apiError";

export const userValidate = async (pool: Pool, email: string) => {
  const query = `SELECT EXISTS (SELECT 1 FROM users WHERE email = $1);`;
  try {
    const { rows } = await pool.query(query, [email]);
    return rows[0].exists;
  } catch (error) {
    throw new APIError("Error while checking email", 500, error);
  }
};
