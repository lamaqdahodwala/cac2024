export interface RouteImplementation {
    call(props: Record<string, any>): Promise<any>;
}

