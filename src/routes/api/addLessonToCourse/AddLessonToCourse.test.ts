import { PrismaProps } from '$lib/generic/PrismaProps';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import type { RequestEvent } from './$types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MultiProp } from '$lib/helpers/MultiProp';
import { AddLessonToCourse, AddLessonToCourseProps } from './AddLessonToCourse';
import { APIRoute } from '$lib/abstract/APIRoute';

describe('CreateCourse', () => {
	let prismaProps = mockDeep<PrismaProps>();
	let prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
	prismaProps.getProps.mockImplementation(async (e) => ({ prisma: prismaMock }));
	let event = mockDeep<RequestEvent>();
	let props = MultiProp.merge([prismaProps, new AddLessonToCourseProps()]);
	let apiRoute = new APIRoute(props, new AddLessonToCourse());

	beforeEach(() => {
		mockReset(event);
		mockReset(prismaMock);
	});

	it('Can add a paragraph to a lesson', async () => {
		let fakeLesson = {
			id: 123,
			courseId: 456,
			title: 'Learn How To Make ChatGPT'
		};
		prismaMock.lesson.create.mockResolvedValueOnce(fakeLesson);
		event.request.json.mockResolvedValueOnce({
			courseId: '456',
			title: 'Learn How To Make ChatGPT'
		});

		expect(apiRoute.callRoute(event)).resolves.toBe(fakeLesson);
	});
});
