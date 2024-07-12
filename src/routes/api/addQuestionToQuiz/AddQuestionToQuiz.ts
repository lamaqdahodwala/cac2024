import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient, Quiz, QuizQuestion, User } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

interface EventLocals {
	user?: {
		id: string;
	};
}

export class AddQuestionToQuiz implements RouteImplementation {
	async call(props: {
		prisma: PrismaClient;
		quizId: number;
		question: string;
    user: User
	}): Promise<QuizQuestion> {
    let userId = props.user.id
		const quiz = await props.prisma.quiz.findUnique({
			where: { id: props.quizId },
			include: { lesson: { include: { inCourse: true } } }
		});
		if (!quiz) {
			throw error(404, 'Quiz not found');
		}
		const user = await props.prisma.user.findUnique({
			where: { id: userId}
		});
		if (!user || (user.role !== 'admin' && user.id !== quiz.lesson.inCourse.writerId)) {
			throw error(403, 'Unauthorized to add questions to this quiz');
		}
		return await props.prisma.$transaction(async (tx) => {
			const quizQuestion = await tx.quizQuestion.create({
				data: {
					quiz: { connect: { id: props.quizId } },
					question: props.question
				}
			});
			const placeholderAnswers = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
			await Promise.all(
				placeholderAnswers.map((answer, index) =>
					tx.quizAnswer.create({
						data: {
							quizQuestion: { connect: { id: quizQuestion.id } },
							answerText: answer,
							isCorrect: index === 0,
						}
					})
				)
			);
			return quizQuestion;
		});
	}
}

export class AddQuestionToQuizProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		const json = await event.request.json();
		const quizId = json?.quizId;
		const question = json?.question;
		const userId = (event.locals as EventLocals).user?.id;

		if (!quizId || typeof quizId !== 'number') {
			throw error(400, 'Please provide a valid quiz ID');
		}
		if (!question || typeof question !== 'string') {
			throw error(400, 'Please provide a valid question');
		}
		if (!userId) {
			throw error(401, 'User not authenticated');
		}
		return {
			quizId,
			question,
			userId
		};
	}
}

export const route = new APIRoute(
	MultiProp.merge([new PrismaProps(), new AddQuestionToQuizProps()]),
	new AddQuestionToQuiz()
);
