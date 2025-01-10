-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "image" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "CategoryTeam" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryTeamId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_categoryTeamId_fkey" FOREIGN KEY ("categoryTeamId") REFERENCES "CategoryTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
