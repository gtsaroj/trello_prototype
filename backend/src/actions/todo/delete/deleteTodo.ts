import { APIError } from "../../../helpers/error/apiError";
import { connectDb } from "../../../config/database";

const deleteTodoFromDatabase = async (todoId: string) => {
  const dbInstance = await connectDb();
  try {
    const query = `DELETE FROM todos WHERE id = $1 RETURNING *;`;
    const result = await dbInstance.query(query, [todoId]);
    console.log("✅ Todo deleted successfully!");
    return result.rows[0];
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode);
    }
    throw new APIError("Error while deleting todo from database", 500);
  }
};

export { deleteTodoFromDatabase };
