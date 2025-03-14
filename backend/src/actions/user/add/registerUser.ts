import { connectDb } from "../../../config/database";

export const createUser = async (data: User.User) => {
 const query = `
   INSERT INTO users (uid, role, display_name, email, photo_url, refresh_token) 
   VALUES ($1, $2, $3, $4, $5, $6)
   ON CONFLICT (uid) DO NOTHING 
   RETURNING *;
 `;

 const values = [
   data.uid,
   data.role,
   data.displayName,
   data.email,
   data.photoURL,
   data.refreshToken || null,
 ];
 const pool =  await connectDb()
 try {
   const { rows } = await pool?.query(query, values);
   return rows.length ? rows[0] : null; // Returns inserted user or null if already exists
 } catch (error) {
   console.error("❌ Error inserting user:", error);
   throw error;
 }
};