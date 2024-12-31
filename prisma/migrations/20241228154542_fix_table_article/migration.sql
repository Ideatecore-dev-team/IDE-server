/*
  Warnings:

  - You are about to drop the column `authorId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Article` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_categoryId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "authorId",
DROP COLUMN "category",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL;

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
