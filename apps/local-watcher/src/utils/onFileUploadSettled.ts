import type { metaDataForManifest } from "@repo/fileTypes";
import axios from "axios";

export async function onFileSettled(arr: any[]) {
  try {
    await Promise.all([arr]);
  } catch (e) {
    console.error("error in promise or  onfileSettled", e);
  }
}

export async function updateFileStatus(fileData: metaDataForManifest) {
  console.log("from updateFileStatus section", fileData);
  try {
    await axios.post("http://localhost:3000/fileStatus", fileData);
  } catch (e) {
    console.error(`there is error in the onFileSettled flow: ${e}`);
  }
}
