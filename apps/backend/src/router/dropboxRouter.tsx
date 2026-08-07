import { Router, type Request, type Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  backendFileUploadController,
  downloadController,
  fileStatusHandler,
} from "../controller/file-service-controller";

export const dropBoxRouter = Router();

dropBoxRouter.post("/file", asyncHandler(backendFileUploadController));

dropBoxRouter.get("/file/:fileID", asyncHandler(downloadController));

dropBoxRouter.post("/fileStatus", asyncHandler(fileStatusHandler));
