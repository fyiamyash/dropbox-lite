import chokidar from "chokidar";

import { getUploadUrl } from "./services/fileUpload";
import type {
  fileMetaData,
  hashesType,
  metaDataForManifest,
} from "@repo/fileTypes";
import { createMetaData } from "./utils/createMetadata";
import { hashing } from "./utils/hashing";

import { updateManifest } from "./utils/updateManifest";
import { uploadChunks } from "./utils/uploadChunks";
import { onFileSettled, updateFileStatus } from "./utils/onFileUploadSettled";
import { checkFileSize } from "./utils/checkFunctions";
import { compareHash } from "./utils/compareHashes";

const watcher = chokidar.watch("./localFolder", {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100,
  },
});
console.log("watching out for the files!");

watcher.on("add", async (value, stats) => {
  const data: fileMetaData = createMetaData(value, stats!);
  if (!data.parts || !data.chunkSize || !data.parts) {
    console.error("No of parts not available!");
    return;
  }
  const hashedchunks: hashesType[] = hashing(
    data.parts,
    value,
    data.chunkSize!,
    data.size,
  );
  if (hashedchunks) {
    let manifData: metaDataForManifest = {
      fileId: data.fileId,
      fileName: data.fileName,
      mimeType: data.mimeType,
      size: data.size,
      ownerId: data.ownerId,
      parts: data.parts,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      chunkSize: data.chunkSize,
      chunks: [],
    };

    try {
      const { Urls } = await getUploadUrl(
        hashedchunks,
        data.fileName,
        data.fileId,
        data.parts,
      );
      if (Urls) {
        for (let i = 0; i < hashedchunks.length; i++) {
          manifData.chunks.push({
            chunkId: hashedchunks[i]!.chunkId,
            hashId: hashedchunks[i]!.hashId,
            key: "",
            status: "not uploaded",
          });
        }
        const updatedManifData = await uploadChunks(
          value,
          data.chunkSize,
          data.size,
          Urls,
          manifData,
        );
        onFileSettled([
          updateManifest(updatedManifData, value),
          updateFileStatus(updatedManifData),
        ]);
      }
    } catch (e) {
      console.log("there is error while calling the backend server!", e);
    }
  }
});

watcher.on("change", (value, stats) => {
  console.log(`file: ${value} changed at: ${stats?.mtime} `);
  if (checkFileSize(value, stats!.size)) {
    const data: fileMetaData = createMetaData(value, stats!);
    if (!data.parts || !data.chunkSize || !data.parts) {
      console.error("No of parts not available!");
      return;
    }
    const hashedchunks: hashesType[] = hashing(
      data.parts,
      value,
      data.chunkSize!,
      data.size,
    );

    const hashesResult = compareHash(hashedchunks, value);
    const { updatedChunks, changedHashes } = hashesResult;
  }
});

watcher.on("error", (error) => {
  console.error("there is error in local-watcher service", error);
});
