import type { RouteImplementation } from './RouteImplementation';
import type { PropGetter } from './PropGetter';
import type { RequestEvent } from '@sveltejs/kit';

export class APIRoute<TProps, TResult> {
    private propGetter: PropGetter<TProps>;
    private routeImplementation: RouteImplementation<TProps, TResult>;

    constructor(propGetter: PropGetter<TProps>, routeImplementation: RouteImplementation<TProps, TResult>) {
        this.propGetter = propGetter;
        this.routeImplementation = routeImplementation;
    }

    async handle(event: RequestEvent): Promise<Response> {
        const props = await this.propGetter.getProps(event);
        const result = await this.routeImplementation.call(props);
        return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
}
