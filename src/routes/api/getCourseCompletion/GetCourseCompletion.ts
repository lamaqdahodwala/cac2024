import { APIRoute, type RouteImplementation } from "$lib/abstract/APIRoute";
import { AuthProps } from "$lib/generic/AuthProps";
import { PrismaProps } from "$lib/generic/PrismaProps";
import { searchParamProps } from "$lib/generic/SearchParamProps";
import { MultiProp } from "$lib/helpers/MultiProp";
import type { User } from "@auth/sveltekit";
import type { PrismaClient } from "@prisma/client";
import { error } from "@sveltejs/kit";

export class GetCourseCompletion implements RouteImplementation {
  async call(props: {prisma: PrismaClient, courseId: number, user: User}): Promise<object> {
    let userCompletedLessons = await props.prisma.user.findUnique({
      where: {
        id: props.user.id
      },
      include: {
        _count: {
          select: {
            lessonsCompleted: {
              where: {
                courseId: props.courseId
              }
            }
          }
        }
      }
    })

    let totalLessons = await props.prisma.course.findUnique({
      where: {
        id: props.courseId
      },
      include: {
        _count: {
          select: {
            lessons: true
          }
        }
      }
    })

    if (!userCompletedLessons) {
      throw error(400, "User not found")
    }

    if (!totalLessons) {
      throw error(400, "Course not found")
    }

    let completed = userCompletedLessons._count.lessonsCompleted
    let total =  totalLessons?._count.lessons

    return {
      completed,
      total, 
      percent: Math.floor((completed / total) * 100)
    }
  }
}


const getCourseCompletionProps = searchParamProps((params) => ({
  courseId: Number( params.get('courseId') )
}), {checkForNull: true})

export const route = new APIRoute(
  MultiProp.mergeProps([PrismaProps, AuthProps, getCourseCompletionProps]),
  GetCourseCompletion
)
