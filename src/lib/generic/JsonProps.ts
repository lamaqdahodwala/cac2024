import type { PropGetter } from '$lib/abstract/APIRoute';
import { error, type RequestEvent } from '@sveltejs/kit';

export const jsonProps = (callback: (json: any) => object, config?: { checkForNull: boolean }) => {
	class Temp implements PropGetter {
		async getProps(event: RequestEvent): Promise<object> {
			let json = await event.request.json();
			let data = callback(json);

			if (!config?.checkForNull) return data;

			let values = Object.entries(data);

			values.forEach((value) => {
				if (value[1] === null || value[1] === undefined) {
					throw error(400, `Missing property ${value[0]}`);
				}
			});

			return data;
		}
	}

	return Temp;
};
