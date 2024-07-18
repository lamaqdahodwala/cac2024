import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class ScoreQuestion implements RouteImplementation {
	async call(props: {
		prisma: PrismaClient;
		questionId: number;
		chosenAnswerId: number;
	}): Promise<object> {
		let correctAnswers = await props.prisma.quizAnswer.findMany({
			where: {
				isCorrect: true,
				quizQuestionId: props.questionId
			},
			select: {
				id: true,
        answerText: true
			}
		});

		let correctAnswerIds = correctAnswers.map((value) => value.id);

		let isUserCorrect = false;
		if (correctAnswerIds.includes(props.chosenAnswerId)) {
			isUserCorrect = true;
		}

    let correctAnswerText = correctAnswers[0].answerText


		let incorrectAnswerExplanation = await props.prisma.quizQuestion.findUnique({
			where: {
				id: props.questionId
			},
			select: {
				incorrectAnswerExplanation: true
			}
		});

		return {
			isUserCorrect,
			incorrectAnswerExplanation: incorrectAnswerExplanation?.incorrectAnswerExplanation,
      correctAnswerChoice: correctAnswerText
		};
	}
}

export const ScoreQuestionProps = jsonProps((json) => ({
	questionId: json.questionId,
	chosenAnswerId: json.chosenAnswerId
}));

export const route = new APIRoute(
	MultiProp.mergeProps([PrismaProps, ScoreQuestionProps]),
	ScoreQuestion
);
