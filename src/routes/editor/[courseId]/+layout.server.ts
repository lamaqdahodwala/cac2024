import type { LayoutServerLoad } from "./[lessonId]/$types";

export const load: LayoutServerLoad = async(event) => {

  
  return {
    courseId: event.params.courseId,
    lessonId: event.params.lessonId
  }
}
