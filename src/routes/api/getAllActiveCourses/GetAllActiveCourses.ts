import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';

export class GetAllActiveCourses implements RouteImplementation {
	async call(props: { prisma: PrismaClient; user: User }): Promise<object> {
		let activeCourses = await props.prisma.user
			.findUnique({
				where: {
					id: props.user.id
				},
				include: {
					activeCourses: true
				}
			})
			.activeCourses();

		return activeCourses || [];
	}
}

export const route = new APIRoute(
	MultiProp.mergeProps([AuthProps, PrismaProps]),
	GetAllActiveCourses
);
