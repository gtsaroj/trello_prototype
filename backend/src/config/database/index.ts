import { Pool } from "pg";
import { APIError } from "../../helpers/error/apiError";

export async function connectDb<T>(): Promise<Pool> {
  try {
    const pool = new Pool({
      database: process.env.POSTGRESQL_NAME,
      user: process.env.POSTGRESQL_USERNAME,
      host: process.env.POSTGRESQL_HOST,
      password: process.env.POSTGRESQL_PASSWORD,
      port: process.env.POSTGRESQL_PORT as unknown as number,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await pool.connect();
    return pool;
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error.message, error.statusCode);
    }
    throw new APIError("Error while connecting with database", 500);
  }
}
