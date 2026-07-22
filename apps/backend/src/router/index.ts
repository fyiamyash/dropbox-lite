import { Router } from "express";
import { authRouter } from "./authRouter";
import { dropBoxRouter } from "./dropboxRouter";

export const appRouter = Router();

appRouter.use(authRouter);
appRouter.use(dropBoxRouter);
