import { Router, type Request, type Response } from "express";
import { asynHandler } from "../utils/asyncHandler";
import { getUrl } from "../utils/getPresignedUrl";

export async function fileUploadController(req: Request, res: Response) {
  const url = await getUrl(req.body.fileName);
  res.send(url);
}
