import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

export class AddLessonToCourse implements RouteImplementation {
	async call(props: {
		courseId: string;
		lessonName: string;
		prisma: PrismaClient;
	}): Promise<object> {
		return await props.prisma.lesson.create({
			data: {
				courseId: Number(props.courseId),
				title: props.lessonName
			}
		});
	}
}

export class AddLessonToCourseProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		let json = await event.request.json();

		let courseId = json.courseId;
		let lessonName = json.lessonName;

		return {
			courseId,
			lessonName
		};
	}
}

export const route = new APIRoute(
  MultiProp.merge([new PrismaProps(), new AddLessonToCourseProps()]),
  new AddLessonToCourse()
)
