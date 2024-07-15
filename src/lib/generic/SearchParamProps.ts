import type { PropGetter } from '$lib/abstract/APIRoute';
import { error, type RequestEvent } from '@sveltejs/kit';

export const searchParamProps = (
	callback: (params: URLSearchParams) => object,
	config?: { checkForNull: boolean }
) => {
	class Temp implements PropGetter {
		async getProps(event: RequestEvent): Promise<object> {
			let params = event.url.searchParams;
			let data = callback(params);

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
