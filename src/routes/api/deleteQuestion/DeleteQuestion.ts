import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class DeleteQuestion implements RouteImplementation {
	async call(props: { prisma: PrismaClient; questionId: number }): Promise<object> {
		await props.prisma.quizQuestion.delete({
			where: {
				id: props.questionId
			}
		});

		return {
			success: true
		};
	}
}

export const DeleteQuestionProps = jsonProps(
	(json) => ({
		questionId: Number(json.questionId)
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([DeleteQuestionProps, AuthProps, PrismaProps]),
	DeleteQuestion
);
