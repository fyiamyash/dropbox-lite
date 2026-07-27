import axios from "axios";
import chokidar from "chokidar";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { getUploadUrl } from "./services/fileUpload";
import type { fileMetaData, mimeTypes } from "@repo/fileTypes";
import { createMetaData, uploadInS3 } from "./utils";

const watcher = chokidar.watch("./localFolder", {
  persistent: true,
  ignoreInitial: true,
});
console.log("watching out for the files!");
watcher.on("add", async (value, stats) => {
  const data: fileMetaData = createMetaData(value, stats!);
  try {
    const response = await getUploadUrl(data);
    if (response) {
      console.log(response);
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
