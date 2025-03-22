import { Router } from "express";
import { registerUser } from "./register/registerUser.Controller.js";
import { updateUser } from "./update/updateUser.controller.js";
import { singIn } from "./login/loginUser.controller.js";
import { verifyToken } from "../../helpers/handlers/tokenHandler.js";
import { verifyRoles } from "../../middlewares/user/auth.middleware";
const userRouter = Router();

userRouter.post("/create", registerUser);
userRouter.post("/update", verifyRoles(["authenticatedUser"]), updateUser);
userRouter.post("/login", singIn);

export { userRouter };
