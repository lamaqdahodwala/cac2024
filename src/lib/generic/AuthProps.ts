import type { PropGetter } from '$lib/abstract/APIRoute';
import { prisma } from '$lib/db';
import { error, type RequestEvent } from '@sveltejs/kit';

export class AuthProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		let auth = await event.locals.auth();
		let user = auth?.user;

		if (!user) {
			throw error(403, 'Forbidden, please log in');
		}

		if (!user.email) throw error(500, 'IDK what happened');

		let userRole = await prisma.user.findUnique({
			where: {
				email: user.email
			}
		});

		return {
			user: userRole,
			userRole: userRole?.role
		};
	}
}
