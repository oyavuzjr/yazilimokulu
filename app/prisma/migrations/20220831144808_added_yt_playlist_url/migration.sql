/*
  Warnings:

  - Added the required column `playlistUrl` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "playlistUrl" TEXT NOT NULL
);
INSERT INTO "new_Course" ("id", "name", "slug") SELECT "id", "name", "slug" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
