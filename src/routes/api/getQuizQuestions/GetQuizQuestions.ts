import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class GetQuizQuestions implements RouteImplementation {
	async call(props: { prisma: PrismaClient; lessonId: number }): Promise<object> {
		let quiz = await props.prisma.quiz.findUnique({
			where: {
				lessonId: props.lessonId
			},
			include: {
				questions: {
					include: {
						answers: true
					}
				}
			}
		});

		return {
			quiz: quiz
		};
	}
}

const GetQuizQuestionsProps = searchParamProps(
	(params) => ({
		lessonId: Number(params.get('lessonId'))
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([AuthProps, PrismaProps, GetQuizQuestionsProps]),
	GetQuizQuestions
);
