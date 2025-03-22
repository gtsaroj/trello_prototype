import { connectDb } from "../../config/database";
import { APIError } from "../../helpers/error/apiError";

const createUser_model = async () => {
  const query = `

CREATE TABLE IF NOT EXISTS users (
    uid TEXT PRIMARY KEY,
    role TEXT CHECK (role IN ('authenticatedUser', 'guest')) NOT NULL,
    display_name TEXT,
    email TEXT UNIQUE,
    photo_URL TEXT,
  "refreshToken" TEXT,  -- Use double quotes here
    password TEXT
);
  `;

  try {
    const pool = await connectDb();
    await pool?.query(query);

    console.log("✅ Users table created (if not exists)");
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error?.message, error.statusCode);
    }
    throw new APIError("Error while creating table", 500, error);
  }
};

export { createUser_model };
