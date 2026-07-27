import { Router, type Request, type Response } from "express";
import { asynHandler } from "../utils/asyncHandler";
import { getUrl } from "../utils/getPresignedUrl";
import type { fileMetaData } from "@repo/fileTypes";

export async function fileUploadController(req: Request, res: Response) {
  console.log("req reached here 1");
  const metaData: fileMetaData = req.body;
  console.log("req reached here 2", metaData);
  const url = await getUrl(metaData);
  res.send({ uploadId: url.UploadId, Urls: url.presignedUrl });
}
