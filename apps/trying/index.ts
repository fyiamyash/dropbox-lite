import fs from "node:fs";
import { pipeline } from "node:stream";

// const readStream = fs.createReadStream("sample.txt", { encoding: "utf-8" });
// const writeStrem = fs.createWriteStream("sample2.txt", { encoding: "utf-8" });
// readStream.on("data", (chunk) => {
//   writeStrem.write(chunk);
// });

// readStream.on("end", () => {
//   console.log("ending the stream");
// });

pipeline(
  fs.createReadStream("sample.txt", { encoding: "utf-8" }),
  fs.createWriteStream("sample2.txt"),
  (err) => {
    if (err) {
      console.error("error while wiring the files");
    } else {
      console.log("Pipeline succeeded!");
    }
  },
);
