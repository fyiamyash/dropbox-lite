import fs from "node:fs";
import type {
  chunks,
  metaDataForManifest,
  preSignedUrlType,
} from "@repo/fileTypes";
import axios from "axios";
import pLimit from "p-limit";

export async function uploadChunks(
  filePath: string,
  chunkSize: number,
  fileSize: number,
  urls: preSignedUrlType[],
  incomingChunksToUpload: chunks[],
) {
  let completedChunks = 0;
  const fileDescriptor = fs.openSync(filePath, "r");
  const limit = pLimit(5);
  const returnedUploadPromises = urls.map((element, index) => {
    const start = index * chunkSize;
    const bytesToRead = Math.min(chunkSize, fileSize - start);
    const allocateBuffer = Buffer.alloc(bytesToRead);
    fs.readSync(fileDescriptor, allocateBuffer, 0, bytesToRead, start);

    return limit(() => {
      return axios.put(element.url, allocateBuffer).then(() => {
        const currentChunk = incomingChunksToUpload.find(
          (c) => c.chunkId === element.partno,
        );
        if (!currentChunk) {
          console.log("chunk not found to update the status");
          return;
        }
        currentChunk.status = "uploaded";
        currentChunk.key = element.key;

        completedChunks++;
        const compute = (completedChunks / urls.length) * 100;
        console.log(
          `Chunk: ${element.partno} uploaded successfully! ${compute.toFixed(2)} Percent Completed`,
        );
      });
    });
  });

  fs.closeSync(fileDescriptor);

  await Promise.all(returnedUploadPromises);
  return incomingChunksToUpload;
}
