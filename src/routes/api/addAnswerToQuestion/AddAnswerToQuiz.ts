import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class AddAnswerToQuiz implements RouteImplementation {
	async call(props: { prisma: PrismaClient; questionId: number }): Promise<object> {
		return await props.prisma.quizAnswer.create({
			data: {
				isCorrect: false,
        answerText: "Answer Choice",
        quizQuestionId: props.questionId
			}
		});
	}
}

export const AddAnswerToQuizProps = jsonProps(json => ({
  questionId: Number( json.questionId )
}), {checkForNull: true}) 

export const route = new APIRoute(
  MultiProp.mergeProps([AuthProps, PrismaProps, AddAnswerToQuizProps]),
  AddAnswerToQuiz
)
