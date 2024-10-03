-- DropForeignKey
ALTER TABLE "SavedBlogs" DROP CONSTRAINT "SavedBlogs_blogId_fkey";

-- DropForeignKey
ALTER TABLE "SavedBlogs" DROP CONSTRAINT "SavedBlogs_userId_fkey";

-- AddForeignKey
ALTER TABLE "SavedBlogs" ADD CONSTRAINT "SavedBlogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedBlogs" ADD CONSTRAINT "SavedBlogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
