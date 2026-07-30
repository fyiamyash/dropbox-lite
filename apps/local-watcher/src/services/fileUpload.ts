import axios from "axios";
import type {
  fileMetaData,
  hashesType,
  postBodyForGetUrl,
} from "@repo/fileTypes";

export async function getUploadUrl(
  hash: hashesType[],
  fileName: string,
  fileId: string,
  parts: number,
) {
  const sendData: postBodyForGetUrl = {
    hashes: hash,
    fileName: fileName,
    fileId: fileId,
    parts: parts,
  };
  try {
    const response = await axios.post("http://localhost:3000/file", sendData);
    return response.data;
  } catch {
    throw Error(
      "there is some error while sending the reposne to the backend server",
    );
  }
}

export async function uploadFile() {}
