import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

export class CreateCourse implements RouteImplementation {
	async call(props: { prisma: PrismaClient; courseTitle: string }): Promise<object> {
		return await props.prisma.course.create({
			data: {
				title: props.courseTitle
			}
		});
	}
}

export class CreateCourseProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		let json = await event.request.json();

		let title = json?.courseTitle;

		if (!title) {
			throw error(400, 'Please provide a title');
		}

		return {
			courseTitle: title
		};
	}
}

export const route = new APIRoute(
	MultiProp.merge([new PrismaProps(), new CreateCourseProps()]),
	new CreateCourse()
);

