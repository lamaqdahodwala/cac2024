import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import insane from 'insane'
import { AuthProps } from '$lib/generic/AuthProps';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { User } from '@auth/sveltekit';
import type { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

export class UpdateLessonContent implements RouteImplementation {
	async call(props: {
		lessonId: string;
		newContent: string;
		prisma: PrismaClient;
		user: User;
	}): Promise<object> {
    let lesson = await props.prisma.lesson.findUnique({
      where: {
        id: Number( props.lessonId )
      },
      include: {
        inCourse: {
          include: {
            writer: true
          }
        }
      }
    })

    if (!lesson) throw error(404, "Lesson not found")
    if ( lesson.inCourse.writerId !== props.user.id) throw error(403, "Not Authenticated")

		return await props.prisma.lesson.update({
			where: {
				id: Number(props.lessonId)
			},
      data: {
        textContent: insane(props.newContent)
      }
		});

	}
}

export class UpdateLessonContentProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
    let json = await event.request.json()
    let lessonId = json.lessonId
    let newContent = json.newContent

    if (lessonId === undefined || newContent === undefined) throw error(400, "Provide the required fields: lessonId, newContent")

    return {
      lessonId, 
      newContent
    }
  }
}

export const route = new APIRoute(
  MultiProp.merge([new PrismaProps(), new AuthProps(), new UpdateLessonContentProps()]),
  new UpdateLessonContent()
)
