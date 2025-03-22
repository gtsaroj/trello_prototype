import { connectDb } from "../../../config/database";
import { APIError } from "../../../helpers/error/apiError";

export const getTodosFromDatbase = async (): Promise<Todo.Todo[]> => {
  const query = `SELECT * FROM todos`;
  const dbInstance = await connectDb();
  try {
    const { rows } = await dbInstance.query(query);
    return rows;
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode);
    }
    throw new APIError("Error while fetching todos in database", 500, error);
  }
};

export const getTodoListFromDatabase = async (): Promise<
  Todo.TodoList<string>[]
> => {
  const query = `SELECT * FROM todo_list`;
  const dbInstance = await connectDb();
  try {
    const { rows } = await dbInstance.query(query);
    return rows;
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode);
    }
    throw new APIError("Error while fetching todolist in database", 500, error);
  }
};
