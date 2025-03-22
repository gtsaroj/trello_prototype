import { Router } from "express";
import { verifyRoles } from "../../middlewares/user/auth.middleware";
import { createTodo, createTodoList } from "./create/createTodo.controller";
import { updateTodo } from "./update/updateTodo.controller";
import { deleteTodo } from "./delete/deleteTodo.controller";
import { getTodoList, getTodos } from "./get/getTodos.controller";

const todoRouter = Router();

todoRouter.post("/add", verifyRoles(["authenticatedUser"]), createTodo);
todoRouter.post("/add-todolist", verifyRoles(["authenticatedUser"] ), createTodoList)
todoRouter.post("/update", verifyRoles(["authenticatedUser"]), updateTodo);
todoRouter.delete("/delete", verifyRoles(["authenticatedUser"]), deleteTodo);
todoRouter.get("/todos", verifyRoles(["authenticatedUser"]), getTodos);
todoRouter.get("/todolist", verifyRoles(["authenticatedUser"]), getTodoList);

export { todoRouter };
