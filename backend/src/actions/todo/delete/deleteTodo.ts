import { Pool } from "pg";

const deleteTodo = async (pool: Pool, todoId: string) => {
  const query = `DELETE FROM todos WHERE id = $1 RETURNING *;`;

  const result = await pool.query(query, [todoId]);
  console.log("✅ Todo deleted successfully!");
  return result.rows[0];
};

export { deleteTodo };
