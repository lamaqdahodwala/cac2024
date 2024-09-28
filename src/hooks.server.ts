import { sequence } from '@sveltejs/kit/hooks';
import { handle as handleAuthentication } from './auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { ROUTES_THAT_NEED_ADMIN, ROUTES_THAT_NEED_LOGIN } from './authorization';

const handleAuthorization: Handle = async function ({ event, resolve }) {
	let pathname = event.url.pathname;

	let auth = await event.locals.auth();

	for (let i of ROUTES_THAT_NEED_LOGIN) {
		if (pathname.startsWith(i) && !auth) {
			throw redirect(302, '/signin');
		}
	}

	for (let i of ROUTES_THAT_NEED_ADMIN) {
		let notAuthorized = (pathname.startsWith(i) && (!auth || auth?.user?.role !== 'admin') ) ;

		if (notAuthorized) {
      console.log(`Not authorized admin, redirecting. Found role ${auth?.user?.role}`)
			throw redirect(302, '/signin');
		}
	}
	return resolve(event);
};

export const handle = sequence(handleAuthentication, handleAuthorization);
