/*
  Warnings:

  - You are about to drop the `_userSavedBlogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_userSavedBlogs" DROP CONSTRAINT "_userSavedBlogs_A_fkey";

-- DropForeignKey
ALTER TABLE "_userSavedBlogs" DROP CONSTRAINT "_userSavedBlogs_B_fkey";

-- DropTable
DROP TABLE "_userSavedBlogs";

-- CreateTable
CREATE TABLE "SavedBlogs" (
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "SavedBlogs_pkey" PRIMARY KEY ("userId","blogId")
);

-- AddForeignKey
ALTER TABLE "SavedBlogs" ADD CONSTRAINT "SavedBlogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedBlogs" ADD CONSTRAINT "SavedBlogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
