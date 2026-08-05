import type { fileMetaData } from "@repo/fileTypes";
import axios from "axios";

import type { Request, Response } from "express";
import { dbWorker, fileStatusJob } from "../utils/jobQueue";

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
  fileStatusJob.add("addToDb", fileStatusData, {
    removeOnComplete: true,
    removeOnFail: false,
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  });

  dbWorker.on("completed", (job) => {
    console.log(`job ${job.id} is completed`);
  });
  dbWorker.on("failed", (job, err) => {
    console.log(`${job!.id} has failed with ${err.message}`);
  });

  res.sendStatus(201);
}
