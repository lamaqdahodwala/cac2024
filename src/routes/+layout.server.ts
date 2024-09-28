import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad  = async(event) => {
  let auth = await event.locals.auth()

  return {
    authState: auth
  }
}
