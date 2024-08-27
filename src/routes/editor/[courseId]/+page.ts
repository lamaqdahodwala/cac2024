import type { PageLoad } from "./$types";

export const load: PageLoad = async(event) => {

  return {
    courseId: Number( event.params.courseId )
  }
}
