/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `MetaData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MetaData_fileId_key" ON "MetaData"("fileId");
