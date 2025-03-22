import { connectDb } from "../../../config/database";
import { APIError } from "../../../helpers/error/apiError";

export const updateTodoListInDatabase = async (
  todoId: string,
  key: keyof Todo.Todo,
  value: string
) => {
  const dbInstance = await connectDb();
  const query = `
   UPDATE todo_lists 
   SET 
     ${key} = COALESCE($1, ${key}),
     updated_at = NOW()
   WHERE todo_id = $2
   RETURNING *;
 `;

  const values = [value, todoId];
  try {
    const { rows } = await dbInstance.query(query, values);
    return rows;
  } catch (error) {
    throw new APIError("Error while update todo_list in database", 500, error);
  }
};
const updateTodoInDatabase = async (
  todoId: string,
  key: keyof Todo.Todo,
  value: string
) => {
  const todoQuery = `
   UPDATE todos SET title = COALESCE($1, title, updatedAt = NOW() ) WHERE id = $2 RETURNING *;
 `;

  const dbInstance = await connectDb();
  try {
    await dbInstance.query("BEGIN");

    const todoValues = [value, todoId];
    const { rows } = await dbInstance.query(todoQuery, todoValues);
    return rows;
  } catch (error) {
    await dbInstance.query("ROLLBACK");
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode);
    }
    throw new APIError("Error while updating todo in database", 500);
  }
};

export { updateTodoInDatabase };
