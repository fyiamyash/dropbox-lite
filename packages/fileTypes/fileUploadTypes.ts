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
};

// export type chunks = {
//   chunkId: number;
//   hashId: string;
//   key: string;
// };

export type metaDataForManifest = fileMetaData & {
  chunks: chunks[];
};

export type manifestFileType = Record<string, fileMetaData>;

export type hashesType = {
  chunkId: number;
  hashId: string;
};

export type chunks = hashesType & {
  key: string;
  status: "uploaded" | "not uploaded";
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
