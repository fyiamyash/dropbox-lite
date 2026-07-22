import { Router, type Request, type Response } from "express";
import { logInFunction, signInFunction } from "../controller/auth-controller";
import { asyncHandler } from "../utils/asyncHandler";

export const authRouter = Router();

authRouter.post("/signIn", asyncHandler(signInFunction));

authRouter.post("/logIn", asyncHandler(logInFunction));
