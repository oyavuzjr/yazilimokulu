/*
  Warnings:

  - Added the required column `videoUrl` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseSlug" TEXT NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    CONSTRAINT "Resource_courseSlug_fkey" FOREIGN KEY ("courseSlug") REFERENCES "Course" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("courseSlug", "id", "resourceUrl") SELECT "courseSlug", "id", "resourceUrl" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
