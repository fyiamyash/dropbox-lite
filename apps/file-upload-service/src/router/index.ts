import { Router } from "express";
import { asynHandler } from "../utils/asyncHandler";
import { fileUploadController } from "../controller";

export const fielUploadRouter = Router();

fielUploadRouter.post("/fileUpload", asynHandler(fileUploadController));
