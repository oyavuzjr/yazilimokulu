/*
  Warnings:

  - You are about to drop the column `courseId` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `courseSlug` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseSlug" TEXT NOT NULL,
    "resourceUrl" TEXT NOT NULL,
    CONSTRAINT "Resource_courseSlug_fkey" FOREIGN KEY ("courseSlug") REFERENCES "Course" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("id", "resourceUrl") SELECT "id", "resourceUrl" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_Course" ("id", "name") SELECT "id", "name" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
