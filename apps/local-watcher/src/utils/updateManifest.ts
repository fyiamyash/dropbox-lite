import type {
  chunks,
  fileMetaData,
  hashesType,
  manifestFileType,
  metaDataForManifest,
} from "@repo/fileTypes";
import fs from "node:fs";

export function readManifest() {
  if (!fs.existsSync("./manifest.json")) {
    return {};
  }
  const data = fs.readFileSync("./manifest.json", "utf-8");

  return JSON.parse(data);
}

export function saveManifest(manifest: manifestFileType) {
  const tempFile = manifest;
  fs.writeFileSync("./manifest_temp.json", JSON.stringify(tempFile));

  fs.renameSync("./manifest_temp.json", "./manifest.json");
}

export function updateManifest(fileData: metaDataForManifest, path: string) {
  const mani: manifestFileType = readManifest();
  mani[path] = fileData;
  saveManifest(mani);
}

// export function updateChunksInManifest(hashes: hashesType[], filePath: string) {
//   // console.log("hello");
//   // console.log(url, filePath, "sdasasadadsas");
//   const manifData = readManifest();
//   const fileData: metaDataForManifest = manifData[filePath];
//   console.log(hashes);
//   // console.log(manifData);
// }
