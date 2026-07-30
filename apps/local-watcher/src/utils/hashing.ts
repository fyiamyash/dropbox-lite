import fs from "node:fs";
import crypto from "node:crypto";
import type { hashesType } from "@repo/fileTypes";

export function hashing(
  parts: number,
  filePath: string,
  chunkSize: number,
  fileSize: number,
) {
  const fileDescriptor = fs.openSync(filePath, "r");
  const hashes: hashesType[] = [];
  for (let i = 0; i < parts; i++) {
    const start = i * chunkSize;
    const bytesToRead = Math.min(fileSize - start, chunkSize);
    const buffer = Buffer.alloc(bytesToRead);
    fs.readSync(fileDescriptor, buffer, 0, bytesToRead, start);

    const hashCreated = crypto.createHash("md5").update(buffer).digest("hex");

    hashes.push({
      chunkId: i + 1,
      hashId: hashCreated,
    });
  }
  fs.closeSync(fileDescriptor);
  return hashes;
}
