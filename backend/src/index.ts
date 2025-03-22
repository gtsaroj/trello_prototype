import dotenv from "dotenv";
import { rootRouter } from "./routes/routes.js";
import { app } from "./app.js";
import { connectDb } from "./config/database/index.js";
import { createUser_model } from "./models/user/createUser_model.js";
import { createTodoTable } from "./models/todo/todoModel.js";

dotenv.config();

connectDb();

createUser_model();
createTodoTable();

app.get("/test", (_, res) => {
  res.status(200).send("Running on server.");
});

app.use("/assets", (_, res) => {
  res.status(404).json({
    message: "Asset not found",
    success: false,
    status: 404,
    data: null,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//route handling
app.use("/api/v1", rootRouter);

export default app;
