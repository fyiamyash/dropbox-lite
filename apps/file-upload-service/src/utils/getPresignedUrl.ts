import { S3Client, GetObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { fileMetaData } from "@repo/fileTypes";
import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3";
const client = new S3Client({
  endpoint: "http://localhost:9000",
  region: "asia-east-1",
  forcePathStyle: true,

  credentials: { accessKeyId: "admin", secretAccessKey: "password" },
});

export async function getUrl(data: fileMetaData) {
  console.log("req reached here 3");
  const key = `upload/${data.ownerId}/${data.fileId}`;
  console.log("req reached here 4", key);
  const { UploadId } = await client.send(
    new CreateMultipartUploadCommand({
      Bucket: "drop-box",
      Key: key,
    }),
  );
  console.log("req reached here 5");
  let presignedUrl: any[] = [];
  for (let parts = 1; parts <= data.parts!; parts++) {
    const command = new UploadPartCommand({
      Bucket: "drop-box",
      Key: key,
      UploadId: UploadId,
      PartNumber: parts,
    });
    console.log("req reached here 6", command);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    presignedUrl.push({ partno: parts, url: url });
  }

  return { UploadId, presignedUrl };
}
