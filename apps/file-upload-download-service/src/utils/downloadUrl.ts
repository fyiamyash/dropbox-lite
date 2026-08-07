import { prisma } from "@repo/db";
import { client } from "./getPresignedUrl";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getUrlsForDownload(fileId: string) {
  console.log(fileId);
  try {
    const resultsFromDB = await prisma.metaData.findFirst({
      select: {
        parts: true,
        size: true,
        chunks: true,
      },
      where: {
        fileId: fileId,
      },
    });

    if (!resultsFromDB) {
      console.error("no result form the Metadat db");
      return;
    }
    const { chunks, parts, size } = resultsFromDB;
    const downurl: any[] = [];
    for (let i = 0; i < parts; i++) {
      if (!chunks[i]!.key) {
        return;
      }
      const command = new GetObjectCommand({
        Bucket: "drop-box",
        Key: chunks[i]!.key,
      });
      const url = await getSignedUrl(client, command, { expiresIn: 3600 });
      downurl.push(url);
    }
    return { downurl, size, parts };
  } catch (e) {
    console.error(e);
  }
}
