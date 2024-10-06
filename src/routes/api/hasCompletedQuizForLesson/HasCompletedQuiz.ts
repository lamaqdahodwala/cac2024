import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';

export class HasCompletedQuiz implements RouteImplementation {
	async call(props: { lessonId: number; user: User; prisma: PrismaClient }): Promise<object> {
		let passedQuizzes = await props.prisma.user
			.findUnique({
				where: {
					id: props.user.id
				}
			})
			.quizzesPassed({
				select: {
					lessonId: true
				}
			});

		let lessonHasQuiz = await props.prisma.lesson
			.findUnique({
				where: {
					id: props.lessonId
				}
			})
			.quiz();

		if (!lessonHasQuiz) {
			return {
				hasCompletedQuiz: null
			};
		}

		if (!passedQuizzes) {
			return {
				hasCompletedQuiz: false
			};
		}

		return {
			hasComletedQuiz: passedQuizzes.includes({ lessonId: props.lessonId })
		};
	}
}

export const hasCompletedQuizProps = searchParamProps((params) => ({
  lessonId: params.get("lessonId")
}), {checkForNull: true})

export const route = new APIRoute(
  MultiProp.mergeProps([AuthProps, PrismaProps, hasCompletedQuizProps]),
  HasCompletedQuiz
)
