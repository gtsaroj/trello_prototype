import { Pool } from "pg";

const updateTodo = async (
  pool: Pool,
  todoId: string,
  updates: Partial<Todo.Todo>
) => {
  const todoQuery = `
   UPDATE todos SET title = COALESCE($1, title) WHERE id = $2 RETURNING *;
 `;

  const todoListQuery = `
   UPDATE todo_lists 
   SET 
     title = COALESCE($1, title),
     description = COALESCE($2, description),
     comment = COALESCE($3, comment),
     label = COALESCE($4, label),
     date = COALESCE($5, date),
     attachment = COALESCE($6, attachment),
     location = COALESCE($7, location),
     updated_at = NOW()
   WHERE id = $8
   RETURNING *;
 `;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const todoValues = [updates.title, todoId];
    await client.query(todoQuery, todoValues);

    if (updates.todoList) {
      for (const list of updates.todoList) {
        const todoListValues = [
          list.title,
          list.description,
          list.comment,
          list.label,
          list.date,
          JSON.stringify(list.attachment),
          list.location,
          list.id,
        ];
        await client.query(todoListQuery, todoListValues);
      }
    }

    await client.query("COMMIT");
    console.log("✅ Todo updated successfully!");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export { updateTodo };
