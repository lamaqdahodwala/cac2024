import type { PageLoad } from "./$types";

export const load: PageLoad = async(event) => {
  let res = await event.fetch(`/api/getExerciseParameters?lessonId=${event.params.lessonId}`)

  let json = await res.json()

  return {
    exerciseParams: json.exercise
  }
}
