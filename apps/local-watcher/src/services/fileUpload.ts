import axios from "axios";
import type { fileMetaData } from "@repo/fileTypes";

export async function getUploadUrl(fileData: fileMetaData) {
  console.log("hjkda", fileData);
  try {
    const response = await axios.post("http://localhost:3000/file", fileData);
    return response.data;
  } catch {
    throw Error(
      "there is some error while sending the reposne to the backend server",
    );
  }
}

export async function uploadFile() {}
