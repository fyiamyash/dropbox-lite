import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { fileMetaData } from "@repo/fileTypes";
const client = new S3Client({
  endpoint: "http://localhost:9000",
  region: "asia-east-1",
  forcePathStyle: true,

  credentials: { accessKeyId: "admin", secretAccessKey: "password" },
});

export async function getUrl(data: fileMetaData) {
  let presignedUrl: any[] = [];
  for (let parts = 1; parts <= data.parts!; parts++) {
    const key = `upload/${data.fileId}/${data.fileId}/chunk-`;
    const command = new PutObjectCommand({
      Bucket: "drop-box",
      Key: key,
    });

    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    presignedUrl.push({ partno: parts, url: url });
  }

  return { presignedUrl };
}
