import { Pool } from "pg";

const createTodo = async (pool: Pool, todo: Todo.Todo) => {
  const todoQuery = `
   INSERT INTO todos (id, title)
   VALUES ($1, $2)
   ON CONFLICT (id) DO NOTHING RETURNING *;
 `;

  const todoListQuery = `
   INSERT INTO todo_lists (id, todo_id, title, description, comment, label, date, attachment, location, created_at, updated_at)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
   ON CONFLICT (id) DO NOTHING RETURNING *;
 `;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const todoValues = [todo.id, todo.title];
    await client.query(todoQuery, todoValues);

    for (const list of todo.todoList) {
      const todoListValues = [
        list.id,
        todo.id,
        list.title,
        list.description,
        list.comment,
        list.label,
        list.date,
        JSON.stringify(list.attachment),
        list.location,
      ];
      await client.query(todoListQuery, todoListValues);
    }

    await client.query("COMMIT");
    console.log("✅ Todo created successfully!");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export { createTodo };
