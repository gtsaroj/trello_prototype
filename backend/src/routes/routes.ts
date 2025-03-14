import { Router } from "express";
import { userRouter } from "../features/user/user.routes";
import { todoRouter } from "../features/todo/todo.routes";

const rootRouter = Router();

rootRouter.use("users", userRouter);
rootRouter.use("todos", todoRouter);
export { rootRouter };
