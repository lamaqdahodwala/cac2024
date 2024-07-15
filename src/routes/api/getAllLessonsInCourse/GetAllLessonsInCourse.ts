import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class GetAllLessonsInCourse implements RouteImplementation {
	async call(props: { prisma: PrismaClient; courseId: string }): Promise<object> {
		return await props.prisma.lesson.findMany({
			where: {
				courseId: Number(props.courseId)
			}
		});
	}
}

export const route = new APIRoute(
	MultiProp.mergeProps([
		PrismaProps,
		searchParamProps((params) => ({ courseId: params.get('courseId') }), { checkForNull: true })
	]),
	GetAllLessonsInCourse
);
