/*
  Warnings:

  - Made the column `description` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logoUrl` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topic` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videoId` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "playlistUrl" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL
);
INSERT INTO "new_Course" ("description", "id", "level", "logoUrl", "name", "playlistUrl", "slug", "topic", "videoId") SELECT "description", "id", "level", "logoUrl", "name", "playlistUrl", "slug", "topic", "videoId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
