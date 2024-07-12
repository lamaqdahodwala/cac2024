import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

export class MarkLessonAsCompleted implements RouteImplementation {
	async call(props: { user: User; prisma: PrismaClient; lessonId: string }): Promise<object> {
		await props.prisma.user.update({
			where: {
				id: props.user.id
			},
			data: {
				lessonsCompleted: {
					connect: {
						id: Number(props.lessonId)
					}
				}
			}
		});
		return {
			success: true,
			lessonId: props.lessonId
		};
	}
}

export class MarkLessonAsCompletedProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		let json = await event.request.json();

		let lessonId = json?.lessonId;

		return {
			lessonId
		};
	}
}

export const route = new APIRoute(
	MultiProp.merge([new MarkLessonAsCompletedProps(), new PrismaProps(), new AuthProps()]),
	new MarkLessonAsCompleted()
);
