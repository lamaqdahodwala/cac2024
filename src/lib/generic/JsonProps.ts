import type { PropGetter } from "$lib/abstract/APIRoute";
import type { RequestEvent } from "@sveltejs/kit";

export const jsonProps = (callback: (json: any) => object) => {
  class Temp implements PropGetter {
    async getProps(event: RequestEvent): Promise<object> {
        let json = await event.request.json()
        return callback(json)
    }
  }

  return Temp
}
