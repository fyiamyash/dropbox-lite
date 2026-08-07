import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { postBodyForGetUrl, preSignedUrlType } from "@repo/fileTypes";
export const client = new S3Client({
  endpoint: "http://localhost:9000",
  region: "asia-east-1",
  forcePathStyle: true,

  credentials: { accessKeyId: "admin", secretAccessKey: "password" },
});

export async function getUrl(data: postBodyForGetUrl) {
  let presignedUrl: preSignedUrlType[] = [];
  for (let p = 1; p <= data.parts!; p++) {
    const key = `${data.fileId}/${data.fileName}/chunk-${data.hashes[p - 1]!.hashId}`;
    const command = new PutObjectCommand({
      Bucket: "drop-box",
      Key: key,
    });

    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    presignedUrl.push({ partno: p, url: url, key: key });
  }

  return { presignedUrl };
}
