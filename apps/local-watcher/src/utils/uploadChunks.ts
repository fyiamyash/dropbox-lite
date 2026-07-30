import fs from "node:fs";
import type { preSignedUrlType } from "@repo/fileTypes";
import axios from "axios";

export async function uploadChunks(
  filePath: string,
  chunkSize: number,
  fileSize: number,
  urls: preSignedUrlType[],
) {
  const fileDescriptor = fs.openSync(filePath, "r");

  const returnedUploadPromises = urls.map((element, index) => {
    const start = index * chunkSize;
    const bytesToRead = Math.min(chunkSize, fileSize - start);
    const allocateBuffer = Buffer.alloc(bytesToRead);
    fs.readSync(fileDescriptor, allocateBuffer, 0, bytesToRead, start);

    return axios.put(element.url, allocateBuffer).then(() => {
      console.log(`Chunk: ${element.partno} uploaded successfully!`);
    });
  });

  fs.closeSync(fileDescriptor);

  await Promise.all(returnedUploadPromises);
}
