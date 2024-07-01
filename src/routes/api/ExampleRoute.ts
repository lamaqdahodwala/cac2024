import type { RouteImplementation } from './RouteImplementation';

interface ExampleProps {
    id: string;
}

interface ExampleResult {
    message: string;
}

export class ExampleRoute implements RouteImplementation<ExampleProps, ExampleResult> {
    async call(props: ExampleProps): Promise<ExampleResult> {
        return { message: `Received ID: ${props.id}` };
    }
}
