import { error, type RequestEvent } from "@sveltejs/kit";
import { AuthProps } from "./AuthProps";

export class OnlyAdminAuthProps extends AuthProps {
  constructor() {
    super()
  }
  async getProps(event: RequestEvent): Promise<object> {
    let payload = await super.getProps(event)

    if (payload.userRole !== "admin") {
      throw error(403, "Must be admin to access this page")
    }

    return payload
  }
}
