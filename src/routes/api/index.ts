import { APIRoute } from './APIRoute';
import { ExampleProps } from './ExampleProps';
import { ExampleRoute } from './ExampleRoute';
import { MultiProp } from './MultiProp';
import { PrismaProps } from './PrismaProps';
import type { RequestEvent } from '@sveltejs/kit';


const route = new APIRoute(
    new MultiProp(new ExampleProps(), new PrismaProps()),
    new ExampleRoute()
);

export async function get(event: RequestEvent): Promise<Response> {
    return route.handle(event);
}

export async function post(event: RequestEvent): Promise<Response> {
    return route.handle(event);
}
