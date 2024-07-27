import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class DeleteAnswer implements RouteImplementation {
	async call(props: { prisma: PrismaClient; answerId: number }): Promise<object> {
		await props.prisma.quizAnswer.delete({
			where: {
				id: props.answerId
			}
		});

		return {
			success: true
		};
	}
}

export const DeleteAnswerProps = jsonProps(
	(json) => ({
		answerId: json.answerId
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([DeleteAnswerProps, PrismaProps, AuthProps]),
	DeleteAnswer
);
