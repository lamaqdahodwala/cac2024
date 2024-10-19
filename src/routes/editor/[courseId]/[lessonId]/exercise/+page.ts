import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async(event) => {
  let res = await event.fetch(`/api/getExerciseParameters?lessonId=${event.params.lessonId}`)

  let json = await res.json()

  if (!res.ok) {
    throw redirect(301, `/editor/${event.params.courseId}/${event.params.lessonId}`)
  }

  return {
    exerciseParams: json.exercise,
  }
}
