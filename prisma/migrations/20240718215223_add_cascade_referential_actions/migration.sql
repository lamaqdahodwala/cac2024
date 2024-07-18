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

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuizAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizQuestionId" INTEGER NOT NULL,
    "answerText" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    CONSTRAINT "QuizAnswer_quizQuestionId_fkey" FOREIGN KEY ("quizQuestionId") REFERENCES "QuizQuestion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_QuizAnswer" ("answerText", "id", "isCorrect", "quizQuestionId") SELECT "answerText", "id", "isCorrect", "quizQuestionId" FROM "QuizAnswer";
DROP TABLE "QuizAnswer";
ALTER TABLE "new_QuizAnswer" RENAME TO "QuizAnswer";
CREATE TABLE "new_QuizQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "incorrectAnswerExplanation" TEXT,
    CONSTRAINT "QuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_QuizQuestion" ("id", "incorrectAnswerExplanation", "question", "quizId") SELECT "id", "incorrectAnswerExplanation", "question", "quizId" FROM "QuizQuestion";
DROP TABLE "QuizQuestion";
ALTER TABLE "new_QuizQuestion" RENAME TO "QuizQuestion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Instruction_exerciseId_key" ON "Instruction"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "Dataset_exerciseId_key" ON "Dataset"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "PassRequirement_exerciseId_key" ON "PassRequirement"("exerciseId");
