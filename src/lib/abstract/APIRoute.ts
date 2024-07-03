import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit"

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
  private props: PropGetter
  private imp: RouteImplementation
  constructor(props: PropGetter | (new () => PropGetter), imp: RouteImplementation | (new () => RouteImplementation)){
    if (typeof props === "function"){
      this.props = new props()
    } 
    else {
      this.props = props
    }

    if (typeof imp === "function"){
      this.imp = new imp()
    } else {
      this.imp = imp
    }



  }
  async callRoute(event: RequestEvent): Promise<object> {
      return await this.imp.call(
        await this.props.getProps(event)
      )
  }

  createAPIRoute() {
    let route: RequestHandler  = async (event) => {
      return json(await this.callRoute(event))
    }  

    return route
  }
}

