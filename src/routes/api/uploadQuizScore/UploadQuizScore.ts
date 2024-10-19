import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';

export class UploadQuizScore implements RouteImplementation {
	async call(props: { prisma: PrismaClient; user: User; lessonId: number }): Promise<object> {
    let quiz = await props.prisma.lesson.findUnique({
      where: {
        id: props.lessonId
      }
    }).quiz()

    if (!quiz) {
      throw error(404, "No quiz exists on this lesson")
    }

    await props.prisma.user.update({
      where: {
        id: props.user.id
      },
      data: {
        quizzesPassed: {
          connect: {
            id: quiz.id
          }
        }
      }
    })

    return {
      success: true
    }
  }
}

export const uploadQuizScoreProps = jsonProps((json) => ({
	lessonId: Number(json.lessonId)
}));

export const route = new APIRoute(
  MultiProp.mergeProps([AuthProps, PrismaProps, uploadQuizScoreProps]),
  UploadQuizScore
)
