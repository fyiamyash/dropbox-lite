import type { chunks, hashesType, metaDataForManifest } from "@repo/fileTypes";
import { readManifest } from "./updateManifest";

export async function compareHash(
  changedHases: hashesType[],
  fileName: string,
) {
  const localCopy = readManifest();
  if (!localCopy[fileName]) {
    console.error(`File: ${fileName} does not exists`);
    return;
  }
  let oldCopy: hashesType[] = localCopy[fileName].chunks;
  let updatedChunks: hashesType[] = [];
  let changedHashes: hashesType[] = [];
  for (let i = 1; i <= changedHases.length; i++) {
    if (i > oldCopy.length) {
      updatedChunks.push({
        chunkId: i,
        hashId: changedHases[i]!.hashId,
      });
    } else if (
      changedHases[i]!.chunkId === oldCopy[i]!.chunkId &&
      changedHases[i]!.hashId !== oldCopy[i]!.hashId
    ) {
      updatedChunks.push({
        chunkId: i,
        hashId: changedHases[i]!.hashId,
      });
      changedHashes.push({
        chunkId: i,
        hashId: changedHases[i]!.hashId,
      });
    } else {
      updatedChunks.push({
        chunkId: i,
        hashId: oldCopy[i]!.hashId,
      });
    }
  }

  return { updatedChunks, changedHashes };
}
