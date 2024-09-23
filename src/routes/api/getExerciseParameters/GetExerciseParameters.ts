import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { OnlyAdminAuthProps } from '$lib/generic/AuthGuardOnlyAdmin';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { searchParamProps } from '$lib/generic/SearchParamProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';

export class GetExerciseParameters implements RouteImplementation {
	async call(props: { prisma: PrismaClient; lessonId: number }): Promise<object> {
		let exercise = await props.prisma.lesson
			.findUnique({
				where: {
					id: props.lessonId
				}
			})
			.exercise();

		return { exercise };
	}
}

const GetExerciseParametersProps = searchParamProps(
	(params) => ({ lessonId: params.get('lessonId') }),
	{ checkForNull: true }
);

export const route = new APIRoute(
  MultiProp.mergeProps([PrismaProps, OnlyAdminAuthProps, GetExerciseParametersProps]),
  GetExerciseParameters
)
