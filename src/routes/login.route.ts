import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { loginSchema } from "../schemas/login.schema";
import { validateBody } from "../middlewares/global.middleware";

const loginRouter: Router = Router();

loginRouter.post("", validateBody(loginSchema), loginController);

export { loginRouter };
