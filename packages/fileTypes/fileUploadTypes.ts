export type mimeTypes = "pdf" | "video" | "img" | "text";

export type fileMetaData = {
  fileId: string;
  fileName: string;
  mimeType: mimeTypes;
  size: string;
  ownerId: string;
  parts?: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: "uploaded" | "pending";
};
