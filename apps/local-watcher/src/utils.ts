import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { fileMetaData, mimeTypes } from "@repo/fileTypes";
import path from "node:path";
import { Stats } from "node:fs";

const client = new S3Client({
  endpoint: "http://localhost:9000",
  region: "asia-east-1",
  forcePathStyle: true,
  credentials: { accessKeyId: "admin", secretAccessKey: "password" },
});

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
  } else if (path.extname(fileName) === ".mp4") {
    mimeType = "video";
  } else if (path.extname(fileName) === ".pdf") {
    mimeType = "pdf";
  } else {
    throw new Error("error file type!");
  }
  // console.log("New file detected", fileName);
  // console.log("size of new item is", stats!.size);
  // console.log("mime type", mimeType);
  let data: fileMetaData = {
    fileId: "Asfasda9834298h",
    fileName: "Testfile",
    size: String(stats!.size),
    mimeType: mimeType,
    ownerId: "asasdauser123",
    status: "pending",
  };
  return data;
}
