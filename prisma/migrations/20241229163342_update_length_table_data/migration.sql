/*
  Warnings:

  - You are about to drop the column `date` on the `Article` table. All the data in the column will be lost.
  - You are about to alter the column `image` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `firstName` on the `ContactUs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `ContactUs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `ContactUs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "date",
ALTER COLUMN "image" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "ContactUs" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);
