import { PrismaProps } from '$lib/generic/PrismaProps';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import type { RequestEvent } from './$types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MultiProp } from '$lib/helpers/MultiProp';
import { GetLessonProps, GetLessonContent} from './GetLessonContent';
import { APIRoute } from '$lib/abstract/APIRoute';

describe('CreateCourse', () => {
	let prismaProps = mockDeep<PrismaProps>();
	let prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
	prismaProps.getProps.mockImplementation(async (e) => ({ prisma: prismaMock }));
	let event = mockDeep<RequestEvent>();
	let props = MultiProp.merge([prismaProps, new GetLessonProps()]);

	let apiRoute = new APIRoute(props, new GetLessonContent());
	beforeEach(() => {
		mockReset(event);
		mockReset(prismaMock);
	});

	it('Can get the content successfully', async () => {
    prismaMock.lesson.findUnique.mockResolvedValueOnce({id: 123, title: "Hello world", textContent: "This is some text content", courseId: 5})
		event.request.json.mockResolvedValueOnce({ lessonId: "123" });

		expect(apiRoute.callRoute(event)).resolves.toStrictEqual({
      textContent: "This is some text content"
    })
	});

  it("throws when there is no matching ID", async() => {

    prismaMock.lesson.findUnique.mockResolvedValueOnce(null)
		event.request.json.mockResolvedValueOnce({ lessonId: "123" });

		expect(apiRoute.callRoute(event)).rejects.toThrow()
  })
});
