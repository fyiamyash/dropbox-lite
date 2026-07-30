import chokidar from "chokidar";

import { getUploadUrl } from "./services/fileUpload";
import type { fileMetaData, hashesType, mimeTypes } from "@repo/fileTypes";
import { createMetaData, uploadInS3 } from "./utils/createMetadata";
import { hashing } from "./utils/hashing";
import { uploadChunks } from "./utils/uploadChunks";

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
  try {
    const { Urls } = await getUploadUrl(
      hashedchunks,
      data.fileName,
      data.fileId,
      data.parts,
    );
    if (Urls) {
      // console.log(Urls);
      uploadChunks(value, data.chunkSize, data.size, Urls);
    }
  } catch {
    console.log("there is error while calling the backend server!");
  }
});

watcher.on("change", (value) => {
  console.log("file changed here ", value);
});

watcher.on("error", (error) => {
  console.error("there is error in local-watcher service", error);
});
