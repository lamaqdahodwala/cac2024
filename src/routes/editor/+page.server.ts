import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async(event) => { 
  let req = await event.fetch("/api/viewAllCourses")

  let json = await req.json()

  return {
    courses: json
  }
}
