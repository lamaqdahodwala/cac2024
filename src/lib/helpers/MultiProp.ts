import type { PropGetter } from '$lib/abstract/APIRoute';
import type { RequestEvent } from '@sveltejs/kit';

export class MultiProp {
	static merge(getters: PropGetter[]) {
		class Temp implements PropGetter {
			async getProps(event: RequestEvent): Promise<object> {
				let mergedResults: any = {};

				for (let index = 0; index < getters.length; index++) {
					const element = getters[index];

          mergedResults = {
            ...mergedResults,
            ...await element.getProps(event)
          }
				}

				return mergedResults;
			}
		}

    return new Temp()
	}
}
