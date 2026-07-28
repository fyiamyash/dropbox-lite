import type { fileMetaData, mimeTypes } from "@repo/fileTypes";
import path from "node:path";
import { Stats } from "node:fs";
import { calculateTotalParts } from "./calculateParts";

export async function uploadInS3() {}

export function createMetaData(value: string, stats: Stats) {
  const fileName = path.basename(value);
  let mimeType: mimeTypes;
  if (path.extname(fileName) === ".txt") {
    mimeType = "text";
  } else if (
    path.extname(fileName) === ".PNG" ||
    path.extname(fileName) === ".jpg"
  ) {
    mimeType = "img";
  } else if (
    path.extname(fileName) === ".MP4" ||
    path.extname(fileName) === ".mov"
  ) {
    mimeType = "video";
  } else if (path.extname(fileName) === ".pdf") {
    mimeType = "pdf";
  } else {
    throw new Error("error file type!");
  }
  // console.log("New file detected", fileName);
  // console.log("size of new item is", stats!.size);
  // console.log("mime type", mimeType);

  let parts = calculateTotalParts(stats.size);

  let data: fileMetaData = {
    fileId: "Asfasda9834298h",
    fileName: fileName,
    size: String(stats!.size),
    mimeType: mimeType,
    ownerId: "asasdauser123",
    status: "pending",
    parts: parts,
  };
  return data;
}
