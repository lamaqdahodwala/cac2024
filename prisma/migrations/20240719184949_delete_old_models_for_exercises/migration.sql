/*
  Warnings:

  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dataset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Instruction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PassRequirement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserExerciseSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Dataset_exerciseId_key";

-- DropIndex
DROP INDEX "Instruction_exerciseId_key";

-- DropIndex
DROP INDEX "PassRequirement_exerciseId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Block";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Dataset";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Exercise";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Instruction";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PassRequirement";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserExerciseSubmission";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CourseProblem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hasPrebuiltModelBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasDataCleaningBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasCustomModelBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasBasicProgrammingBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasTrainTestSplit" BOOLEAN NOT NULL DEFAULT true,
    "instructions" TEXT NOT NULL,
    "passRequirement" INTEGER,
    "testDataset" TEXT,
    "trainDataset" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "endOfCourseChallengeId" INTEGER,
    CONSTRAINT "Course_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_endOfCourseChallengeId_fkey" FOREIGN KEY ("endOfCourseChallengeId") REFERENCES "CourseProblem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("description", "id", "title", "writerId") SELECT "description", "id", "title", "writerId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE TABLE "new_Lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textContent" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "exerciseId" INTEGER,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lesson_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "CourseProblem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("courseId", "description", "id", "textContent", "title") SELECT "courseId", "description", "id", "textContent", "title" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
