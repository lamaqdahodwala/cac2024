import type { RequestEvent, RequestHandler } from "@sveltejs/kit"

export interface RouteImplementation {
  call(props: object): Promise< object >
}

export interface PropGetter{
  getProps(event: RequestEvent): Promise< object >
}

export interface Route {
  callRoute(event: RequestEvent): Promise< object >
}

export class APIRoute implements Route {
  constructor(private props: PropGetter, private imp: RouteImplementation){}
  async callRoute(event: RequestEvent): Promise<object> {
      return await this.imp.call(
        this.props.getProps(event)
      )
  }
}

