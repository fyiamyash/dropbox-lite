import { Router, type Request, type Response } from "express";
import { asynHandler } from "../utils/asyncHandler";

export async function fileUploadController(req: Request, res: Response) {
  console.log(req.body);

  res.send("http//s3ulr/ashjads");
}

export const appRouter = Router();
appRouter.post("/fileUpload", asynHandler(fileUploadController));
