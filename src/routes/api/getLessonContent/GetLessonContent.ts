import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';

export class GetLessonContent implements RouteImplementation {
	async call(props: { prisma: PrismaClient; lessonId: string }): Promise<object> {
		let lesson = await props.prisma.lesson.findUnique({
			where: {
				id: Number(props.lessonId)
			}
		});

		if (!lesson) throw error(404, 'Lesson not found');

		return { textContent: lesson.textContent, lessonName: lesson.title };
	}
}

export const GetLessonProps = searchParamProps((json) => {
	return {
		lessonId: json.get("lessonId")
	};
}, {checkForNull: true});

export const route = new APIRoute(
	MultiProp.mergeProps([PrismaProps, GetLessonProps]),
	GetLessonContent
);
