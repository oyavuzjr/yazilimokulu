-- CreateTable
CREATE TABLE "Excercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "testingCode" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "resourceId" INTEGER,
    CONSTRAINT "Excercise_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "userCode" TEXT NOT NULL,
    "excerciseId" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL,
    CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Submission_excerciseId_fkey" FOREIGN KEY ("excerciseId") REFERENCES "Excercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
