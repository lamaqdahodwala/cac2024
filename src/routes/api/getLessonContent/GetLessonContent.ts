import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export class GetLessonContent implements RouteImplementation {
	async call(props: {
		prisma: PrismaClient;
		lessonId: string;
		renderHTML: boolean;
	}): Promise<object> {
		let lesson = await props.prisma.lesson.findUnique({
			where: {
				id: Number(props.lessonId)
			}
		});

		if (!lesson) throw error(404, 'Lesson not found');

		let content = props.renderHTML ? marked(lesson.textContent) : lesson.textContent;
		return { textContent: content, lessonName: lesson.title };
	}
}

export const GetLessonProps = searchParamProps(
	(json) => {
		let renderHTML: boolean = !!json.get('renderHTML');

		return {
			lessonId: json.get('lessonId'),
			renderHTML: renderHTML
		};
	},
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([PrismaProps, GetLessonProps]),
	GetLessonContent
);
