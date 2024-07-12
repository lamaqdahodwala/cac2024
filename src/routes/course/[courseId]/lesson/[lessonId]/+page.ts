import type { PageLoad } from "./$types";

export const load: PageLoad = async(event) => {
  let lessonId = event.params.lessonId

  let res = await event.fetch(`/api/getLessonContent?lessonId=${lessonId}&renderHTML=true`)

  let json = await res.json()

  return {
    lesson: json
  }
}
