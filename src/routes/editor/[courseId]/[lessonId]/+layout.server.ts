import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
  let course = await prisma.course.findUnique({
    where: {
      id: Number(event.params.courseId)
    }
  })

  if (!course) throw redirect(302, "/editor")
};


