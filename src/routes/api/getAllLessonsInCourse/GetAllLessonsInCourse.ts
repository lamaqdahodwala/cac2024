import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class GetAllLessonsInCourse implements RouteImplementation {
	async call(props: { prisma: PrismaClient; courseId: string }): Promise<object> {
		let course = await props.prisma.course.findUnique({
			where: {
				id: Number(props.courseId)
			}
		});
		let lessons = await props.prisma.lesson.findMany({
			where: {
				courseId: Number(props.courseId)
			},
			include: {
				quiz: {
					select: {
						id: true,
						_count: {
							select: {
								questions: true
							}
						}
					}
				},
				exercise: true
			}
		});

		return {
			lessons: lessons,
      course: course
		};
	}
}

export const route = new APIRoute(
	MultiProp.mergeProps([
		PrismaProps,
		searchParamProps((params) => ({ courseId: params.get('courseId') }), { checkForNull: true })
	]),
	GetAllLessonsInCourse
);
