-- CreateTable
CREATE TABLE "_QuizToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_QuizToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Quiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuizToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CourseProblemToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CourseProblemToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseProblem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CourseProblemToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuizToUser_AB_unique" ON "_QuizToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuizToUser_B_index" ON "_QuizToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseProblemToUser_AB_unique" ON "_CourseProblemToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseProblemToUser_B_index" ON "_CourseProblemToUser"("B");
