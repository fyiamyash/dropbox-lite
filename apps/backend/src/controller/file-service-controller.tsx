import type { fileMetaData } from "@repo/fileTypes";
import axios from "axios";
import type { Request, Response } from "express";

export async function backendFileUploadController(req: Request, res: Response) {
  const fileMetadata: fileMetaData = req.body;
  try {
    const resp = await axios.post(
      "http://localhost:3001/fileUpload",
      fileMetadata,
    );
    console.log(resp.data);
    return res.send(resp.data);
  } catch {
    console.error(
      "There is error while fetching the presigned url from the fileUpload service!",
    );
  }
}
