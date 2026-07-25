export type fileMetaData = {
  fileId: string;
  mimeType: "pdf" | "video" | "audio";
  size: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: "uploaded" | "pending";
};
