import { PrismaProps } from '$lib/generic/PrismaProps';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import type { RequestEvent } from './$types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MultiProp } from '$lib/helpers/MultiProp';
import { AddParagraph, AddParagraphProps } from './AddParagraph';
import { APIRoute } from '$lib/abstract/APIRoute';

describe('CreateCourse', () => {
	let prismaProps = mockDeep<PrismaProps>();
	let prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
	prismaProps.getProps.mockImplementation(async (e) => ({ prisma: prismaMock }));
	let event = mockDeep<RequestEvent>();
	let props = MultiProp.merge([prismaProps, new AddParagraphProps()]);

	let apiRoute = new APIRoute(props, new AddParagraph());
	beforeEach(() => {
		mockReset(event);
		mockReset(prismaMock);
	});

	it('Can add a paragraph to a lesson', async () => {
		let fakeParagraph = {
			id: 123,
      lessonId: 456, 
      textContent: ""
		};
		prismaMock.paragraph.create.mockResolvedValueOnce(fakeParagraph);
		event.request.json.mockResolvedValueOnce({ courseId: "456" });

		expect(apiRoute.callRoute(event)).resolves.toBe(fakeParagraph);
	});
});
