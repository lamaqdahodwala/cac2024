import type { PropGetter, RouteImplementation } from '$lib/abstract/APIRoute';
import { APIRoute } from '$lib/abstract/APIRoute';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

export class ChangeCourseElementOrder implements RouteImplementation {
	async call(props: {
		courseId: string;
		lessonId: string;
		index: number;
		prisma: PrismaClient;
	}): Promise<object> {
		const course = await props.prisma.course.findUnique({
			where: { id: Number(props.courseId) },
			include: { lessons: true }
		});

		if (!course) throw error(404, 'Course not found');
		const currentlessonIndex = course.lessons.findIndex(
			(lesson) => lesson.id === Number(props.lessonId)
		);
		if (currentlessonIndex === -1) throw error(404, 'Lesson not found in the course');
		if (props.index < 0 || props.index >= course.lessons.length) throw error(400, 'Invalid index');

		// const orderedLessonArray = course.lessons.map(lesson => ({
		//   where: { id: lesson.id },
		//   data: lesson
		// }));
		//
		let previousArray = course.lessons;

		let lessonBeingMoved = previousArray.splice(currentlessonIndex, 1)[0];

		previousArray.splice(props.index, 0, lessonBeingMoved);

		let orderedLessonArray = previousArray;

		await props.prisma.course.update({
			where: { id: Number(props.courseId) },
			data: {
				lessons: {
					connect: orderedLessonArray
				}
			}
		});

		return {
			id: course.id,
			title: course.title,
			lessons: orderedLessonArray
		};
	}
}

export class ChangeCourseElementOrderProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		let json = await event.request.json();

		let courseId = json.courseId;
		let lessonId = json.lessonId;
		let index = json.index;

		return {
			courseId,
			lessonId,
			index
		};
	}
}

export const route = new APIRoute(
	MultiProp.merge([new PrismaProps(), new ChangeCourseElementOrderProps()]),
	new ChangeCourseElementOrder()
);
