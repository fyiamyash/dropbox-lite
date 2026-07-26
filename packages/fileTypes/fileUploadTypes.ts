export type fileMetaData = {
  fileId: string;
  fileName: string;
  mimeType: "pdf" | "video" | "audio";
  size: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: "uploaded" | "pending";
};
