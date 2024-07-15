import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

export class ChangeAnswerToQuestion implements RouteImplementation {
	async call(props: {
		prisma: PrismaClient;
		questionId: number;
		answerId: number;
		newAnswerText: string;
		newIsCorrect: boolean;
		userId: string;
	}): Promise<object> {
		const user = await props.prisma.user.findUnique({
			where: { id: props.userId },
			select: { role: true }
		});

		if (!user || user.role !== 'admin') {
			throw error(403, 'Unauthorized: Only admins can modify quiz answers');
		}

		const question = await props.prisma.quizQuestion.findUnique({
			where: { id: props.questionId },
			include: { answers: true }
		});

		if (!question) {
			throw error(404, 'Question not found');
		}

		const answerToChange = question.answers.find((a) => a.id === props.answerId);

		if (!answerToChange) {
			throw error(404, 'Answer not found');
		}

		if (props.newIsCorrect) {
			// If the new answer is correct, set all other answers to incorrect
			await props.prisma.quizAnswer.updateMany({
				where: { quizQuestionId: props.questionId, NOT: { id: props.answerId } },
				data: { isCorrect: false }
			});
		} else if (answerToChange.isCorrect && !props.newIsCorrect) {
			// Ensure at least one answer remains correct
			const otherCorrectAnswers = question.answers.filter(
				(a) => a.id !== props.answerId && a.isCorrect
			);
			if (otherCorrectAnswers.length === 0) {
				throw error(400, 'Cannot set the only correct answer to incorrect');
			}
		}

		const updatedAnswer = await props.prisma.quizAnswer.update({
			where: { id: props.answerId },
			data: {
				answerText: props.newAnswerText,
				isCorrect: props.newIsCorrect
			}
		});

		return { updatedAnswer };
	}
}

export class ChangeAnswerToQuestionProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		const json = await event.request.json();
		const { questionId, answerId, newAnswerText, newIsCorrect } = json;

		if (!questionId || !answerId || !newAnswerText || newIsCorrect === undefined) {
			throw error(400, 'Missing required fields');
		}

		const session = await event.locals.getSession();
		if (!session || !session.user) {
			throw error(401, 'Unauthorized: User not logged in');
		}

		return {
			questionId: parseInt(questionId),
			answerId: parseInt(answerId),
			newAnswerText,
			newIsCorrect,
			userId: session.user.id
		};
	}
}

export const route = new APIRoute(
	MultiProp.merge([new PrismaProps(), new ChangeAnswerToQuestionProps()]),
	new ChangeAnswerToQuestion()
);
