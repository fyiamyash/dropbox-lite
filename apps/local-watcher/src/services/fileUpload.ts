import axios from "axios";
import type { fileMetaData } from "@repo/fileTypes";
export async function fileUpload(fileData: fileMetaData) {
  try {
    const response = await axios.post("http://localhost:3000/file", fileData);
    return response.data;
  } catch {
    console.error(
      "there is some error while sending the reposne to the backend server",
    );
  }
}
