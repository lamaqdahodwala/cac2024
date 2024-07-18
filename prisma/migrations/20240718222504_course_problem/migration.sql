-- CreateTable
CREATE TABLE "Exercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,
    CONSTRAINT "Exercise_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Instruction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    CONSTRAINT "Instruction_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dataset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    CONSTRAINT "Dataset_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PassRequirement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "criteria" TEXT NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    CONSTRAINT "PassRequirement_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserExerciseSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exerciseId" INTEGER NOT NULL,
    CONSTRAINT "UserExerciseSubmission_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Block" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "submissionId" INTEGER NOT NULL,
    CONSTRAINT "Block_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "UserExerciseSubmission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseProblem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hasPrebuiltModelBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasDataCleaningBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasCustomModelBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasBasicProgrammingBlocks" BOOLEAN NOT NULL DEFAULT true,
    "hasTrainTestSplit" BOOLEAN NOT NULL DEFAULT true,
    "Instructions" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Instruction_exerciseId_key" ON "Instruction"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "Dataset_exerciseId_key" ON "Dataset"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "PassRequirement_exerciseId_key" ON "PassRequirement"("exerciseId");
