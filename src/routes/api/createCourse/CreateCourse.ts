import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

export class CreateCourse implements RouteImplementation {
	async call(props: { prisma: PrismaClient; courseTitle: string, description: string, user: User }): Promise<object> {
		return await props.prisma.course.create({
			data: {
				title: props.courseTitle,
        description: props.description !== '' ? props.description : undefined,
        writer: {
          connect: {
            id: props.user.id
          
        }
			}
		});
	}
}

export class CreateCourseProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		let json = await event.request.json();

		let title = json?.courseTitle;
    let description = json?.description

		if (!title) {
			throw error(400, 'Please provide a title');
		}

		return {
			courseTitle: title,
      description: description
		};
	}
}

export const route = new APIRoute(
	MultiProp.merge([new PrismaProps(), new CreateCourseProps(), new AuthProps()]),
	new CreateCourse()
);
