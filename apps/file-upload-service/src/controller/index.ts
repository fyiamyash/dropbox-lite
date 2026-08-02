import { Router, type Request, type Response } from "express";
import { asynHandler } from "../utils/asyncHandler";
import { getUrl } from "../utils/getPresignedUrl";
import type {
  fileMetaData,
  hashesType,
  postBodyForGetUrl,
  preSignedUrlType,
} from "@repo/fileTypes";

export async function fileUploadController(req: Request, res: Response) {
  const metaData: postBodyForGetUrl = req.body;
  const url = await getUrl(metaData);
  res.send({ Urls: url.presignedUrl });
}
