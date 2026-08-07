import { Router } from "express";
import { asynHandler } from "../utils/asyncHandler";
import { downloadUrlController, fileUploadController } from "../controller";

export const fileUploadRouter = Router();

fileUploadRouter.post("/fileUpload", asynHandler(fileUploadController));
fileUploadRouter.get("/download/:fileId", asynHandler(downloadUrlController));
