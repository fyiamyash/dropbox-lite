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
    const upload: metaDataForManifest = job.data;
    const addedMetaData = await prisma.metaData.upsert({
      where: {
        fileId: upload.fileId,
        ownerId: upload.ownerId,
      },
      update: {
        size: upload.size,
        UpdatedAt: upload.updatedAt,
      },
    });
  },
  { connection },
);
