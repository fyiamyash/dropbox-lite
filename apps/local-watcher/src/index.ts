import axios from "axios";
import chokidar from "chokidar";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { fileUpload } from "./services/fileUpload";
import type { fileMetaData } from "@repo/fileTypes";
const watcher = chokidar.watch("./localFolder", {
  persistent: true,
  ignoreInitial: true,
});

console.log("watching out for the files!");
watcher.on("add", async (value, stats) => {
  console.log("New file detected");
  console.log("size of new item is", stats!.size);
  let data: fileMetaData = {
    fileId: "Asfasda9834298h",
    fileName: "Testfile",
    size: String(stats!.size),
    mimeType: "pdf",
    ownerId: "asasdauser123",
    status: "pending",
  };

  try {
    const response = await fileUpload(data);
    console.log(response);
  } catch {
    console.log("there is error while calling the backend server!");
  }

  //   pipeline(
  //     fs.createReadStream(value),
  //     fs.createWriteStream("./bufferVlues.txt"),
  //     (err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     },
  //   );
});
watcher.on("change", (value) => {
  console.log("file changed here ", value);
});

watcher.on("error", (error) => {
  console.error("there is error in local-watcher service", error);
});
