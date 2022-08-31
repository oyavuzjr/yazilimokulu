/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `part` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseSlug" TEXT NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "part" INTEGER NOT NULL,
    CONSTRAINT "Resource_courseSlug_fkey" FOREIGN KEY ("courseSlug") REFERENCES "Course" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("courseSlug", "id", "resourceUrl") SELECT "courseSlug", "id", "resourceUrl" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
