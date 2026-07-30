export type mimeTypes = "pdf" | "video" | "img" | "text";

export type fileMetaData = {
  fileId: string;
  fileName: string;
  mimeType: mimeTypes;
  size: number;
  ownerId: string;
  parts?: number;
  createdAt?: Date;
  updatedAt?: Date;
  chunkSize?: number;
  status: "uploaded" | "not uploaded";
};

// export type chunks = {
//   chunkId: number;
//   hashId: string;
//   key: string;
// };

export type metaDataForManifest = fileMetaData & {
  chunks: chunks[];
};

export type manifestType = Record<string, fileMetaData>;

export type hashesType = {
  chunkId: number;
  hashId: string;
};

export type chunks = hashesType & {
  key: string;
};

export type postBodyForGetUrl = {
  hashes: hashesType[];
  fileName: string;
  fileId: string;
  parts: number;
};

export type preSignedUrlType = {
  partno: number;
  url: string;
  key: string;
};
