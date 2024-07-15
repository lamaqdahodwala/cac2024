import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class ChangeCorrectAnswer implements RouteImplementation {
	async call(props: {
		prisma: PrismaClient;
		questionId: number;
		correctAnswerId: number;
	}): Promise<object> {
		let previouslyCorrectAnswer = await props.prisma.quizAnswer.findMany({
			where: {
				isCorrect: true,
				quizQuestionId: props.questionId
			}
		});

		await props.prisma.quizAnswer.update({
			where: {
				id: previouslyCorrectAnswer[0].id
			},
			data: {
				isCorrect: false
			}
		});

		let newCorrectAnswer = await props.prisma.quizAnswer.update({
			where: {
				id: props.correctAnswerId
			},
			data: {
				isCorrect: true
			}
		});

		return {
			success: true,
			newCorrectAnswer: newCorrectAnswer
		};
	}
}

export const ChangeCorrectAnswerProps = jsonProps(
	(json) => ({
		questionId: json.questionId,
		correctAnswerId: json.correctAnswerId
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([AuthProps, PrismaProps, ChangeCorrectAnswerProps]),
	ChangeCorrectAnswer
);
