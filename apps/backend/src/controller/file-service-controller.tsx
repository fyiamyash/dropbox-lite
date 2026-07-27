import type { fileMetaData } from "@repo/fileTypes";
import axios from "axios";
import type { Request, Response } from "express";
import { calculateTotalParts } from "../utils/calculateParts";

export async function backendFileUploadController(req: Request, res: Response) {
  const fileMetadata: fileMetaData = req.body;
  let parts = calculateTotalParts(fileMetadata.size);
  console.log(parts);
  fileMetadata.parts = parts;
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
