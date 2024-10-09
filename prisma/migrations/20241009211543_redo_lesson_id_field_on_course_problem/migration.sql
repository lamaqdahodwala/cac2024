/*
  Warnings:

  - Added the required column `lessonId` to the `CourseProblem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CourseProblem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hasPrebuiltModelBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasDataCleaningBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasCustomModelBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasBasicProgrammingBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasTrainTestSplit" BOOLEAN NOT NULL DEFAULT true,
    "instructions" TEXT NOT NULL,
    "passRequirement" INTEGER,
    "testDataset" TEXT,
    "trainDataset" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,
    CONSTRAINT "CourseProblem_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CourseProblem" ("hasBasicProgrammingBlocks", "hasCustomModelBlocks", "hasDataCleaningBlocks", "hasPrebuiltModelBlocks", "hasTrainTestSplit", "id", "instructions", "passRequirement", "testDataset", "trainDataset") SELECT "hasBasicProgrammingBlocks", "hasCustomModelBlocks", "hasDataCleaningBlocks", "hasPrebuiltModelBlocks", "hasTrainTestSplit", "id", "instructions", "passRequirement", "testDataset", "trainDataset" FROM "CourseProblem";
DROP TABLE "CourseProblem";
ALTER TABLE "new_CourseProblem" RENAME TO "CourseProblem";
CREATE UNIQUE INDEX "CourseProblem_lessonId_key" ON "CourseProblem"("lessonId");
CREATE TABLE "new_Lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textContent" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "exerciseId" INTEGER,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("courseId", "description", "exerciseId", "id", "textContent", "title") SELECT "courseId", "description", "exerciseId", "id", "textContent", "title" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
