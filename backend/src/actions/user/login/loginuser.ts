import bcrypt from "bcryptjs";
import { Pool } from "pg";

const loginUser = async (pool: Pool, email: string, password: string) => {
  const query = "SELECT * FROM users WHERE email = $1 AND provider = 'local'";
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new Error("❌ User not found or invalid credentials");
  }

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("❌ Invalid password");
  }

  return user; // You can generate a JWT here for authentication
};

export { loginUser };
