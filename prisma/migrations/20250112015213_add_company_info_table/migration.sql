-- CreateTable
CREATE TABLE "CompanyInfo" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT,
    "title" VARCHAR(100),
    "image" TEXT,
    "Phone" VARCHAR(100),
    "Email" VARCHAR(100),
    "Address" VARCHAR(100),
    "Facebook" VARCHAR(100),
    "Instagram" VARCHAR(100),
    "Twitter" VARCHAR(100),
    "Linkedin" VARCHAR(100),
    "Youtube" VARCHAR(100),
    "Tiktok" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyInfo_pkey" PRIMARY KEY ("id")
);
