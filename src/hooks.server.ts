import { sequence } from '@sveltejs/kit/hooks';
import { handle as handleAuthentication } from './auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { ROUTES_THAT_NEED_ADMIN, ROUTES_THAT_NEED_LOGIN } from './authorization';

const handleAuthorization: Handle = async function ({ event, resolve }) {
	let pathname = event.url.pathname;

  let auth = await event.locals.auth()

	for (let i of ROUTES_THAT_NEED_LOGIN) {
		if (pathname.startsWith(i) && !auth) {
			throw redirect(301, 'Log in');
		}
	}

	for (let i of ROUTES_THAT_NEED_ADMIN) {
		if (
			pathname.startsWith(i) &&
			!auth &&
			auth.user.role === 'admin'
		) {
		}
	}
	return resolve(event);
};

export const handle = sequence(handleAuthentication, handleAuthorization);
