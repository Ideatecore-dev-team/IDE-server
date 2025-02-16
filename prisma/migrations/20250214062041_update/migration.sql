/*
  Warnings:

  - The primary key for the `Visit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `visitorId` on the `Visit` table. All the data in the column will be lost.
  - Added the required column `ip` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_pkey",
DROP COLUMN "visitorId",
ADD COLUMN     "ip" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Visit_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Visit_id_seq";
