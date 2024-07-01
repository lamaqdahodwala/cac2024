export interface RouteImplementation<TProps, TResult> {
    call(props: TProps): Promise<TResult>;
}