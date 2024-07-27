import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

export class GetNextLessonInCourse implements RouteImplementation {
	async call(props: { courseId: string; user: User; prisma: PrismaClient }): Promise<object> {
		let user = await props.prisma.user.findUnique({
			where: {
				id: props.user.id
			},
			include: {
				lessonsCompleted: {
					select: {
						id: true
					}
				}
			}
		});

		let userCompletedLessonIds = user?.lessonsCompleted.map((value) => value.id);
		let uncompletedLessons = await props.prisma.lesson.findMany({
			where: {
				id: {
					notIn: userCompletedLessonIds
				},
				inCourse: {
					id: Number(props.courseId)
				}
			},
			select: {
				id: true,
				title: true
			}
		});

		if (uncompletedLessons.length === 0) return { lesson: null };
		return { lesson: uncompletedLessons[0] };
	}
}

export const GetNextLessonProps = searchParamProps(
	(params) => ({
		courseId: params.get('courseId')
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.merge([new PrismaProps(), new AuthProps(), new GetNextLessonProps()]),
	new GetNextLessonInCourse()
);
