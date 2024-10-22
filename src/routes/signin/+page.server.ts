import { redirect, type Actions } from '@sveltejs/kit';
import { signIn } from '../../auth';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	default: signIn
};

export const load: PageServerLoad = async(event) => {
  if (await event.locals.auth()) {
    throw redirect(301, "/dashboard")
  }
}
