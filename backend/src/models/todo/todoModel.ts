import { APIError } from "../../helpers/error/apiError";
import { connectDb } from "../../config/database";

const createTodoTable = async () => {
  const dbInstance = await connectDb();
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS todo_lists (
    todo_id TEXT REFERENCES todos(id) ON DELETE CASCADE,
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    comment TEXT,
    label TEXT[],
    date TEXT,
    attachment Text,
    location TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
  );


  `;
    await dbInstance.query(query);
    console.log("✅ Todo tables created (if not exists)");
  } catch (error) {
    console.log(error);
  }
};

export { createTodoTable };
