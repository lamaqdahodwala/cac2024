import { json } from '@sveltejs/kit';
import { Prisma, PrismaClient, type User } from '@prisma/client';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { jsonProps } from '$lib/generic/JsonProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { AuthProps } from '$lib/generic/AuthProps';

export class AddActiveCourse implements RouteImplementation {
	async call(props: { prisma: PrismaClient; courseId: number; user: User }): Promise<object> {
		return await props.prisma.course.update({
			where: {
				id: Number(props.courseId)
			},
			data: {
				activeFor: {
					connect: {
						id: props.user.id
					}
				}
			}
		});
	}
}

const AddActiveCourseProps = jsonProps(
	(json) => ({
		courseId: json.courseId
	}),
	{ checkForNull: true }
);

export const route = new APIRoute(
	MultiProp.mergeProps([PrismaProps, AddActiveCourseProps, AuthProps]),
	AddActiveCourse
);
