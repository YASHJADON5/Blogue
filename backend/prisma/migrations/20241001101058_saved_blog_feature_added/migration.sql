-- CreateTable
CREATE TABLE "_userSavedBlogs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userSavedBlogs_AB_unique" ON "_userSavedBlogs"("A", "B");

-- CreateIndex
CREATE INDEX "_userSavedBlogs_B_index" ON "_userSavedBlogs"("B");

-- AddForeignKey
ALTER TABLE "_userSavedBlogs" ADD CONSTRAINT "_userSavedBlogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userSavedBlogs" ADD CONSTRAINT "_userSavedBlogs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
