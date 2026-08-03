import type { metaDataForManifest } from "@repo/fileTypes";
import axios from "axios";

export async function onFileSettled(fileData: metaDataForManifest) {
  try {
    axios.post("http://localhost/3000/fileStatus", fileData);
  } catch (e) {
    console.error(`there is error in the onFileSettled flow: ${e}`);
  }
}
