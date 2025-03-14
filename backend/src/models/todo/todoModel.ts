import { Pool } from "pg";
import { APIError } from "../../helpers/error/apiError";

const createTodosTable = async (pool: Pool) => {
  try {
    const query = `
  CREATE TABLE IF NOT EXISTS todo_lists (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    comment TEXT,
    label TEXT[],
    date TEXT,
    attachment JSONB,
    location TEXT,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    todo_list_id TEXT REFERENCES todo_lists(id) ON DELETE CASCADE
  );
  `;
    await pool.query(query);
    console.log("✅ Todo tables created (if not exists)");
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error?.message, error?.statusCode);
    }
    throw new APIError("Error while creating table of Todos", 500);
  }
};

export { createTodosTable };
