/*
  Warnings:

  - You are about to drop the column `category` on the `ProgramCategory` table. All the data in the column will be lost.
  - Added the required column `name` to the `ProgramCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProgramCategory" DROP COLUMN "category",
ADD COLUMN     "name" VARCHAR(100) NOT NULL;
