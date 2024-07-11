import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class GetCourseInfo implements RouteImplementation {
	async call(props: { prisma: PrismaClient; courseId: string }): Promise<object> {
		let course = await props.prisma.course.findUnique({
			where: {
				id: Number(props.courseId)
			},
      include: {
        writer: {
          select: {
            name: true
          }
        }
      },
		});
		return {
			course
		};
	}
}

export const route = new APIRoute(
	MultiProp.mergeProps([
		PrismaProps,
		searchParamProps((params) => ({ courseId: params.get('courseId') }), { checkForNull: true })
	]),
  GetCourseInfo
);
