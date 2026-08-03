import { Router, type Request, type Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  backendFileUploadController,
  fileStatusHandler,
} from "../controller/file-service-controller";

export const dropBoxRouter = Router();

dropBoxRouter.post("/file", asyncHandler(backendFileUploadController));

dropBoxRouter.get("/file/:fileID", (req: Request, res: Response) => {
  res.send("download file");
});

dropBoxRouter.post("/fileStatus", asyncHandler(fileStatusHandler));
