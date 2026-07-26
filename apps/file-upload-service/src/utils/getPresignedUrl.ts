import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  endpoint: "http://localhost:9000",
  region: "asia-east-1",
  forcePathStyle: true,
  credentials: { accessKeyId: "admin", secretAccessKey: "password" },
});

export async function getUrl(fileId: string) {
  const command = new GetObjectCommand({
    Bucket: "dropbox-bucket",
    Key: fileId,
  });

  let url = await getSignedUrl(client, command, { expiresIn: 3600 });
  return url;
}
