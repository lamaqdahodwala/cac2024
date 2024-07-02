import type { PropGetter } from '$lib/abstract/APIRoute';
import { error, type RequestEvent } from '@sveltejs/kit';

export class AuthProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		let auth = await event.locals.auth();
		let user = auth?.user;

		if (!user) {
			throw error(403, 'Forbidden, please log in');
		}

		return {
			user
		};
	}
}
