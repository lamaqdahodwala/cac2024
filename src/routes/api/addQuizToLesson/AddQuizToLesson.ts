import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

export class AddQuizToLesson implements RouteImplementation {
    async call(props: { prisma: PrismaClient; lessonId: number; userId: string }): Promise<object> {
        const { prisma, lessonId, userId } = props;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.role !== 'admin') {
            throw error(403, 'Unauthorized: Only admins can add quizzes');
        }
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        if (!lesson) {
            throw error(404, 'Lesson not found');
        }
        const existingQuiz = await prisma.quiz.findUnique({
            where: { lessonId: lessonId },
        });
        if (existingQuiz) {
            throw error(400, 'A quiz already exists for this lesson');
        }
        const newQuiz = await prisma.quiz.create({
            data: {
                lesson: { connect: { id: lessonId } },
                questions: { create: [] }
            }
        });
        return { message: 'Quiz added successfully', quiz: newQuiz };
    }
}

export class AddQuizToLessonProps implements PropGetter {
    async getProps(event: RequestEvent): Promise<object> {
        const json = await event.request.json();
        const lessonId = json?.lessonId;
        const userId = (event.locals as { user?: { id: string } }).user?.id;
        if (!lessonId) {
            throw error(400, 'Please provide a lessonId');
        }
        if (!userId) {
            throw error(401, 'User not authenticated');
        }
        return {
            lessonId: Number(lessonId),
            userId
        };
    }
}

export const route = new APIRoute(
    MultiProp.merge([new PrismaProps(), new AddQuizToLessonProps()]),
    new AddQuizToLesson()
);
