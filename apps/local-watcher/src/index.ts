import chokidar from "chokidar";

import { getUploadUrl } from "./services/fileUpload";
import type {
  chunks,
  fileMetaData,
  hashesType,
  metaDataForManifest,
} from "@repo/fileTypes";
import { createMetaData } from "./utils/createMetadata";
import { hashing } from "./utils/hashing";

import { readManifest, updateManifest } from "./utils/updateManifest";
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
        let chunksToUpload: chunks[] = [];
        for (let i = 0; i < hashedchunks.length; i++) {
          chunksToUpload.push({
            chunkId: hashedchunks[i]!.chunkId,
            hashId: hashedchunks[i]!.hashId,
            key: "",
            status: "not uploaded",
          });
        }
        const updatedChunks = await uploadChunks(
          value,
          data.chunkSize,
          data.size,
          Urls,
          chunksToUpload,
        );
        manifData.chunks = updatedChunks;
        onFileSettled([
          updateManifest(manifData, value),
          updateFileStatus(manifData),
        ]);
      }
    } catch (e) {
      console.log("there is error while calling the backend server!", e);
    }
  }
});

watcher.on("change", async (value, stats) => {
  console.log(
    `file: ${value} size is : ${stats?.size}changed at: ${stats?.mtime} `,
  );

  if (checkFileSize(value, stats!.size)) {
    // creating the new manifData file just to calcualte hashing and then compare it with the exiting one!
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

    const hashesResult = await compareHash(hashedchunks, value);
    if (!hashesResult) {
      console.error("Hashes result is undefined/not returned!");
      return;
    }
    const { resultChangedHashes } = hashesResult;

    try {
      console.log("getting Url for updated hashes!");
      const { Urls } = await getUploadUrl(
        resultChangedHashes,
        data.fileName,
        data.fileId,
        resultChangedHashes.length,
      );

      if (!Urls) {
        console.error("No incoming urls for the new hashes");
        return;
      }
      let chunksToUpload: chunks[] = [];
      for (let i = 0; i < resultChangedHashes.length; i++) {
        chunksToUpload.push({
          chunkId: resultChangedHashes[i]!.chunkId,
          hashId: resultChangedHashes[i]!.hashId,
          key: "",
          status: "not uploaded",
        });
      }
      const uploadedChunksWithUpdatedKeys: chunks[] = await uploadChunks(
        value,
        data.chunkSize,
        data.size,
        Urls,
        chunksToUpload,
      );
      // console.log(uploadedChunksWithUpdatedKeys);
      // for (let i = 0; i < manifData.chunks.length; i++) {
      //   manifData.chunks.map((h) => {
      //     if (h.chunkId === uploadedChunksWithUpdatedKeys[i]!.chunkId) {
      //       h.hashId = uploadedChunksWithUpdatedKeys[i]!.hashId;
      //     }
      //   });
      //   console.log("here is the updated manifData", manifData);
      // }
      let manifData: metaDataForManifest = readManifest()[value];

      if (!manifData) {
        console.error(
          "This file doesnt exist or error parsing to get the file details",
        );
        return;
      }
      console.log("check ther keys or values ", uploadedChunksWithUpdatedKeys);
      console.log("before manifest file", manifData);
      for (let i = 0; i < uploadedChunksWithUpdatedKeys.length; i++) {
        const checkChunkIdAvailable = manifData.chunks.find(
          (c) => c.chunkId === uploadedChunksWithUpdatedKeys[i]!.chunkId,
        );

        if (checkChunkIdAvailable) {
          checkChunkIdAvailable.key = uploadedChunksWithUpdatedKeys[i]!.key;
        } else {
          manifData.chunks.push({
            chunkId: uploadedChunksWithUpdatedKeys[i]!.chunkId,
            hashId: uploadedChunksWithUpdatedKeys[i]!.hashId,
            key: uploadedChunksWithUpdatedKeys[i]!.key,
            status: uploadedChunksWithUpdatedKeys[i]!.status,
          });
        }
      }
      manifData.updatedAt = data.updatedAt;
      manifData.chunkSize = data.chunkSize;
      manifData.parts = data.parts;
      manifData.size = data.size;
      manifData.mtime = data.mtime;
      onFileSettled([
        updateManifest(manifData, value),
        updateFileStatus(manifData),
      ]);
      console.log("updated manifest file", manifData);
    } catch (e) {
      console.error(`error in syncing block on change ${e}`);
    }
  }
});

watcher.on("error", (error) => {
  console.error("there is error in local-watcher service", error);
});
