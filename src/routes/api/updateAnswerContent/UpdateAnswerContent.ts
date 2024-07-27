import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class UpdateAnswerContent implements RouteImplementation {
	async call(props: {
		prisma: PrismaClient;
		answerId: number;
		newAnswerContent: string;
	}): Promise<object> {
		return await props.prisma.quizAnswer.update({
			where: {
				id: props.answerId
			},
			data: {
				answerText: props.newAnswerContent
			}
		});
	}
}

export const UpdateAnswerContentProps = jsonProps(
	(json) => ({
		answerId: Number(json.answerId),
		newAnswerContent: json.newAnswerContent
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([AuthProps, PrismaProps, UpdateAnswerContentProps]),
	UpdateAnswerContent
);
