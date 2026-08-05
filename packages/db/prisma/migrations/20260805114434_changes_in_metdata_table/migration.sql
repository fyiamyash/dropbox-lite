/*
  Warnings:

  - Added the required column `mtime` to the `MetaData` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `createdAt` on the `MetaData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `UpdatedAt` on the `MetaData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "MetaData" ADD COLUMN     "mtime" INTEGER NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "UpdatedAt",
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL;
