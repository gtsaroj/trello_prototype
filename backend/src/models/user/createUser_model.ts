import { connectDb } from "../../config/database";
import { APIError } from "../../helpers/error/apiError";

const createUser_model = async (data: User.User) => {
  const query = `
CREATE TABLE IF NOT EXISTS users (
    uid TEXT PRIMARY KEY,
    role TEXT CHECK (role IN ('authenticatedUser', 'guest')) NOT NULL,
    display_name TEXT,
    email TEXT UNIQUE,
    photo_url TEXT,
    refresh_token TEXT
);
  `;
  const values = [
    data.uid,
    data.displayName,
    data.email,
    data.photoURL,
    data.role,
    data.refreshToken,
  ];
  const command = `
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3) RETURNING *;
`;

  try {
    const pool = await connectDb();
    await pool?.query(query);

    console.log("✅ Users table created (if not exists)");
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error?.message, error.statusCode);
    }
  }
};
