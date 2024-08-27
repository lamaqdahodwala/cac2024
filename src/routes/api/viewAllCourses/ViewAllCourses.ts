import { APIRoute, type RouteImplementation } from "$lib/abstract/APIRoute";
import { PrismaProps } from "$lib/generic/PrismaProps";
import type { PrismaClient } from "@prisma/client";

export class ViewCourses implements RouteImplementation {
    async call(props: { prisma: PrismaClient }): Promise<object> {
        return await props.prisma.course.findMany()
    }
}

export const route = new APIRoute(
  PrismaProps,
  ViewCourses
)
