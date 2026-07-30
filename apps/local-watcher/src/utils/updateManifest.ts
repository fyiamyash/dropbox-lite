import type { fileMetaData, manifestType } from "@repo/fileTypes";
import fs from "node:fs";

export function readManifest(): Record<string, any> {
  if (!fs.existsSync("./manifest.json")) {
    return {};
  }
  const data = fs.readFileSync("./manifest.json", "utf-8");

  return JSON.parse(data);
}

export function saveManifest(manifest: manifestType) {
  const tempFile = manifest;
  fs.writeFileSync("./manifest_temp.json", JSON.stringify(tempFile));

  fs.renameSync("./manifest_temp.json", "./manifest.json");
}

export function updateManifest(file: fileMetaData, path: string) {
  const mani: manifestType = readManifest();
  mani[path] = file;
  saveManifest(mani);
}
