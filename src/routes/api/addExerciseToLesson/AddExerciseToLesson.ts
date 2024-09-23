import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { OnlyAdminAuthProps } from '$lib/generic/AuthGuardOnlyAdmin';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';

export class AddExerciseToLesson implements RouteImplementation {
	async call(props: { prisma: PrismaClient; lessonId: string }): Promise<object> {
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

let AddExerciseToLessonProps = jsonProps((json) => ({lessonId: json.lessonId}), {checkForNull: true})

export let route = new APIRoute(
  [PrismaProps, OnlyAdminAuthProps, AddExerciseToLessonProps],
  AddExerciseToLesson
)
