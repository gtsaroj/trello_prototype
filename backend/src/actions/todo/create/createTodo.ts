import { connectDb } from "../../../config/database";
import { APIError } from "../../../helpers/error/apiError";

const addTodoInDatabase = async (todo: Todo.Todo): Promise<Todo.Todo[]> => {
  const todoQuery = `
   INSERT INTO todos (id, title, "createdAt")
   VALUES ($1, $2, NOW())
   ON CONFLICT (id) DO NOTHING RETURNING *;
 `;

  const client = await connectDb();
  try {
    const todoValues = [todo.id, todo.title];
    const { rows } = await client.query(todoQuery, todoValues);
    return rows;
  } catch (error) {
    console.log(error)
    await client.query("ROLLBACK");
    throw new APIError("Error while add todo in database", 500,error);
  }
};

export const addTodoListInDatabase = async (
  tod_id: string,
  {
    id,
    description,
    title,
    attachment,
    comment,
    date,
    label,
    location,
  }: Todo.TodoList<string>
): Promise<Todo.TodoList<string>[] | undefined> => {
  const dbInstance = await connectDb();
  const query = `INSERT INTO todo_lists (todo_id,id, title, description, comment, label, date, attachment, location, createdAt)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,NOW()
   )`;
  const values = [
    tod_id,
    id,
    title,
    description,
    comment,
    label,
    date,
    attachment,
    location,
  ];

  try {
    const { rows } = await dbInstance.query(query, values);
    return rows;
  } catch (error) {
    throw new APIError(
      "Error while inserting todo_list in database",
      500,
      error
    );
  }
};

export { addTodoInDatabase };
