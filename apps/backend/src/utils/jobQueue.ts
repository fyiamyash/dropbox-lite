import { envCustom } from "../utils/envCustom";
import IORedis from "ioredis";
import { Worker, Queue, Job } from "bullmq";
import { prisma } from "@repo/db";
import type { metaDataForManifest } from "@repo/fileTypes";
const connection = new IORedis({ maxRetriesPerRequest: null });
export const fileStatusJob = new Queue("status", {
  connection: connection,
});

export const dbWorker = new Worker(
  "status",
  async (job) => {
    // console.log("i am here");
    const upload: metaDataForManifest = job.data;
    console.log("uploading this file", upload);
    const addedMetaData = await prisma.metaData.upsert({
      where: {
        fileId: upload.fileId,
        ownerId: upload.ownerId,
      },
      update: {
        size: upload.size,
        UpdatedAt: upload.updatedAt,
        parts: upload.parts,
        mtime: upload.mtime?.toString(),
        chunks: {
          create: upload.chunks,
        },
      },
      create: {
        fileId: upload.fileId,
        fileName: upload.fileName,
        mimeType: upload.mimeType,
        size: upload.size,
        ownerId: upload.ownerId,
        parts: upload.parts!,
        createdAt: upload.createdAt!,
        UpdatedAt: upload.updatedAt!,
        mtime: upload.mtime?.toString() ?? "0",
        chunks: {
          create: upload.chunks,
        },
      },
    });
    console.log(addedMetaData);
  },
  { connection },
);
