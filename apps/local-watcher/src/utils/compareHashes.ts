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
  let resultChangedHashes: hashesType[] = [];

  for (let i = 0; i < changedHases.length; i++) {
    if (i > oldCopy.length) {
      updatedChunks.push({
        chunkId: i + 1,
        hashId: changedHases[i]!.hashId,
      });
    } else if (
      changedHases[i]!.chunkId === oldCopy[i]!.chunkId &&
      changedHases[i]!.hashId !== oldCopy[i]!.hashId
    ) {
      updatedChunks.push({
        chunkId: i + 1,
        hashId: changedHases[i]!.hashId,
      });
      resultChangedHashes.push({
        chunkId: i + 1,
        hashId: changedHases[i]!.hashId,
      });
    } else {
      updatedChunks.push({
        chunkId: i + 1,
        hashId: oldCopy[i]!.hashId,
      });
    }
  }

  return { updatedChunks, resultChangedHashes };
}
