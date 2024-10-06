import { APIRoute, type RouteImplementation } from '$lib/abstract/APIRoute';
import { AuthProps } from '$lib/generic/AuthProps';
import { jsonProps } from '$lib/generic/JsonProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';

export class UploadQuizScore implements RouteImplementation {
	async call(props: { prisma: PrismaClient; user: User; quizId: number }): Promise<object> {
    await props.prisma.user.update({
      where: {
        id: props.user.id
      },
      data: {
        quizzesPassed: {
          connect: {
            id: props.quizId
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
	quizId: Number(json.quizId)
}));

export const route = new APIRoute(
  MultiProp.mergeProps([AuthProps, PrismaProps, uploadQuizScoreProps]),
  UploadQuizScore
)
