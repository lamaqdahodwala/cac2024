import { APIRoute, type RouteImplementation } from "$lib/abstract/APIRoute";
import { AuthProps } from "$lib/generic/AuthProps";
import { MultiProp } from "$lib/helpers/MultiProp";

export class CheckRoleForUser implements RouteImplementation{
  async call(props: {userRole: string}): Promise<object> {
    return {
      role: props.userRole
    }
  }
}

export const route = new APIRoute(
  AuthProps, 
  CheckRoleForUser
)
