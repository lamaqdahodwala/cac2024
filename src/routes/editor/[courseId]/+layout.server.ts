import type { LayoutServerLoad } from "./[lessonId]/$types";

export const load: LayoutServerLoad = async(event) => {

  console.log("returning layout load")
  
  return {
    courseId: event.params.courseId,
    lessonId: event.params.lessonId
  }
}
