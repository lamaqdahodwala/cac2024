import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class UpdateQuestionText implements RouteImplementation {
	async call(props: {
		prisma: PrismaClient;
		questionId: number;
		newText: string;
	}): Promise<object> {
		return await props.prisma.quizQuestion.update({
			where: {
				id: props.questionId
			},
			data: {
				question: props.newText
			}
		});
	}
}

export const UpdateQuestionTextProps = jsonProps(
	(json) => ({
		questionId: Number(json.questionId),
		newText: json.newText
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([AuthProps, UpdateQuestionTextProps, PrismaProps]),
	UpdateQuestionText
);
