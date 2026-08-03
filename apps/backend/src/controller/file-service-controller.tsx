import type { fileMetaData } from "@repo/fileTypes";
import axios from "axios";
import { Queue } from "bullmq";
import type { Request, Response } from "express";
import { envCustom } from "../utils/envCustom";
import IORedis from "ioredis";

const connection = new IORedis({ maxRetriesPerRequest: null });
const fileStatusQueue = new Queue("status", {
  connection: connection,
});

export async function backendFileUploadController(req: Request, res: Response) {
  const fileMetadata: fileMetaData = req.body;
  let responseFromFileService: string;
  try {
    const resp = await axios.post(
      "http://localhost:3001/fileUpload",
      fileMetadata,
    );
    responseFromFileService = resp.data;
  } catch {
    console.error(
      "There is error while fetching the presigned url from the fileUpload service!",
    );
    res.status(412).json({ message: "error while fetching the Url" });
    return;
  }
  res.send(responseFromFileService);
}

export async function fileStatusHandler(req: Request, res: Response) {
  const fileStatusData = req.body;
  console.log(fileStatusData);
  res.status(201);
}
