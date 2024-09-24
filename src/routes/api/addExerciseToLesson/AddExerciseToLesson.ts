import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { OnlyAdminAuthProps } from '$lib/generic/AuthGuardOnlyAdmin';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';
import { GetExerciseParameters } from '../getExerciseParameters/GetExerciseParameters';

export class AddExerciseToLesson implements RouteImplementation {
	async call(props: {
		prisma: PrismaClient;
		lessonId: string;
		exerciseExists: GetExerciseParameters;
	}): Promise<object> {
		let exerciseExists = await props.exerciseExists.call({
			prisma: props.prisma,
			lessonId: Number(props.lessonId)
		});

		if (exerciseExists.exercise) {
			return {
				error: 'already exists'
			};
		}
		return await props.prisma.courseProblem.create({
			data: {
				instructions: '',
				trainDataset: '',
				Lesson: {
					connect: {
						id: Number(props.lessonId)
					}
				}
			}
		});
	}
}

let AddExerciseToLessonProps = jsonProps(
	(json) => ({ lessonId: json.lessonId, exerciseExists: new GetExerciseParameters() }),
	{ checkForNull: true }
);

export let route = new APIRoute(
	MultiProp.mergeProps([PrismaProps, OnlyAdminAuthProps, AddExerciseToLessonProps]),
	AddExerciseToLesson
);
