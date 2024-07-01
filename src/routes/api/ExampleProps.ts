import type { PropGetter } from './PropGetter';
import type { RequestEvent } from '@sveltejs/kit';

export interface IExampleProps {
    id: string;
}

export class ExampleProps implements PropGetter<IExampleProps> {
    async getProps(event: RequestEvent): Promise<IExampleProps> {
        const json = await event.request.json();
        return { id: json.id };
    }
}