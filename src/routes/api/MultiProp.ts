import type { PropGetter } from './PropGetter';
import type { RequestEvent } from '@sveltejs/kit';

export class MultiProp<TProps extends {}> implements PropGetter<TProps> {
    private propGetters: Array<PropGetter<any>>;

    constructor(...propGetters: Array<PropGetter<any>>) {
        this.propGetters = propGetters;
    }

    async getProps(event: RequestEvent): Promise<TProps> {
        let props = {} as TProps;
        for (const getter of this.propGetters) {
            Object.assign(props, await getter.getProps(event));
        }
        return props;
    }
}
