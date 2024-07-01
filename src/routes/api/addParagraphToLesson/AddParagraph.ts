import { APIRoute, type PropGetter, type RouteImplementation } from '$lib/abstract/APIRoute';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';
import type { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

export class AddParagraph implements RouteImplementation {
	async call(props: { lessonId: string; prisma: PrismaClient }): Promise<object> {
		return await props.prisma.paragraph.create({
			data: {
				lessonId: Number(props.lessonId),
				textContent: ''
			}
		});
	}
}

export class AddParagraphProps implements PropGetter {
	async getProps(event: RequestEvent): Promise<object> {
		let json = await event.request.json();

		let lessonId = json.lessonId;

		return {
			lessonId: lessonId
		};
	}
}

export const route = new APIRoute(
	MultiProp.merge([new PrismaProps(), new AddParagraphProps()]),
	new AddParagraph()
);
