/*
  Warnings:

  - You are about to drop the column `letterChoice` on the `QuizAnswer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuizAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizQuestionId" INTEGER NOT NULL,
    "answerText" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    CONSTRAINT "QuizAnswer_quizQuestionId_fkey" FOREIGN KEY ("quizQuestionId") REFERENCES "QuizQuestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuizAnswer" ("answerText", "id", "isCorrect", "quizQuestionId") SELECT "answerText", "id", "isCorrect", "quizQuestionId" FROM "QuizAnswer";
DROP TABLE "QuizAnswer";
ALTER TABLE "new_QuizAnswer" RENAME TO "QuizAnswer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
