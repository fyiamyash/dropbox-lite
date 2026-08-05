-- CreateTable
CREATE TABLE "Chunks" (
    "id" TEXT NOT NULL,
    "chunkId" INTEGER NOT NULL,
    "hashId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "metadataId" TEXT NOT NULL,

    CONSTRAINT "Chunks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaData" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "parts" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "UpdatedAt" INTEGER NOT NULL,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chunks" ADD CONSTRAINT "Chunks_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "MetaData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
