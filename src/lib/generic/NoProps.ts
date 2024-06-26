import type { PropGetter } from "$lib/abstract/APIRoute";
import { prisma } from "$lib/db";
import type { RequestEvent } from "@sveltejs/kit";

export class NoProps implements PropGetter {
  async getProps(event: RequestEvent): Promise<object> {
      return {}
  }
}

