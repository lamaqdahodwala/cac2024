import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';

export class GetSubsequentLesson implements RouteImplementation {
	async call(props: { lessonId: number; prisma: PrismaClient }): Promise<object> {
		let originalLesson = await props.prisma.lesson.findUnique({
			where: {
				id: props.lessonId
			},
			select: {
				inCourse: {
					select: {
						lessons: {
							select: {
								id: true,
								title: true
							}
						}
					}
				},
				id: true,
				exercise: true
			}
		});
		if (!originalLesson) throw error(404, 'Lesson not found');

		if (originalLesson.exercise) {
			return {
				type: 'exercise',
				lessonId: originalLesson.id
			};
		}

		let allLessonsInCourse = originalLesson.inCourse.lessons;
		let originalLessonIndex = allLessonsInCourse.findIndex(
			(lesson) => lesson.id === originalLesson.id
		);
		let nextLessonIndex = originalLessonIndex + 1;
		let nextLesson;

		if (!(nextLessonIndex >= allLessonsInCourse.length)) {
			nextLesson = allLessonsInCourse[nextLessonIndex];
			return {
				type: 'lesson',
				lessonId: nextLesson.id
			};
		}

		// You are at the last lesson
		return {
			type: 'lesson',
			lessonId: null
		};
	}
}

export const GetSubsequentLessonProps = searchParamProps(
	(params) => ({
		lessonId: params.get('lessonId')
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([AuthProps, PrismaProps, GetSubsequentLessonProps]),
	GetSubsequentLesson
);
