import fs from "node:fs";
export function checkFileSize(fileName: string, mtime: number) {
  const fileExist = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));
  return fileExist[fileName] && mtime !== fileExist[fileName].mtime
    ? true
    : false;
}
