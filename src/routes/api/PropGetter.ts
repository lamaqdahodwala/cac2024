import type { RequestEvent } from '@sveltejs/kit';

export interface PropGetter<TProps> {
    getProps(event: RequestEvent): Promise<TProps>;
}

