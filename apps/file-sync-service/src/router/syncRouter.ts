import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { syncFileController } from "../controller/syncFileController";

export const syncServiceRouter = Router();

syncServiceRouter.post("/syncFile/:fileId", asyncHandler(syncFileController));
