import { PrismaProps } from '$lib/generic/PrismaProps';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import type { RequestEvent } from '@sveltejs/kit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MultiProp } from '$lib/helpers/MultiProp';
import { ChangeCourseElementOrderProps, ChangeCourseElementOrder } from './ChangeCourseElementOrder';
import { APIRoute } from '$lib/abstract/APIRoute';

describe('ChangeCourseElementOrder', () => {
	let prismaProps = mockDeep<PrismaProps>();
	let prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
	prismaProps.getProps.mockImplementation(async (e) => ({ prisma: prismaMock }));
	let event = mockDeep<RequestEvent>();
	let props = MultiProp.merge([prismaProps, new ChangeCourseElementOrderProps()]);

	let apiRoute = new APIRoute(props, new ChangeCourseElementOrder());
	beforeEach(() => {
		mockReset(event);
		mockReset(prismaMock);
	});

	it('Can change the order of lessons in a course', async () => {
		let fakeCourse = {
			id: 123,
			title: "Test Course",
			lessons: [
				{ id: 1, courseId: 123, title: "Lesson1" },
				{ id: 2, courseId: 123, title: "Lesson2" }
			]
		};
		prismaMock.course.findUnique.mockResolvedValueOnce(fakeCourse);
		event.request.json.mockResolvedValueOnce({ courseId: "123", lessonId: "2", index: 0 });

		let updatedCourse = {
      id: 123,
      title: "Test Course",
			lessons: [
				{ id: 2, courseId: 123, title: "Lesson2" },
				{ id: 1, courseId: 123, title: "Lesson1" }
			]
		};

		expect(apiRoute.callRoute(event)).resolves.toStrictEqual(updatedCourse);
	});
});
