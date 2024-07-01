import { PrismaProps } from '$lib/generic/PrismaProps';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import type { RequestEvent } from './$types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MultiProp } from '$lib/helpers/MultiProp';
import { CreateCourseProps, CreateCourse } from './CreateCourse';
import { APIRoute } from '$lib/abstract/APIRoute';

describe('CreateCourse', () => {
	let prismaProps = mockDeep<PrismaProps>();
	let prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
	prismaProps.getProps.mockImplementation(async (e) => ({ prisma: prismaMock }));
	let event = mockDeep<RequestEvent>();
	let props = MultiProp.merge([prismaProps, new CreateCourseProps()]);

	let apiRoute = new APIRoute(props, new CreateCourse());
	beforeEach(() => {
		mockReset(event);
		mockReset(prismaMock);
	});

	it('Can create a course', async () => {
		let fakeCourse = {
			id: 123,
      title: "New Course"
		};
		prismaMock.course.create.mockResolvedValueOnce(fakeCourse);
		event.request.json.mockResolvedValueOnce({ courseTitle: "New Course" });

		expect(apiRoute.callRoute(event)).resolves.toBe(fakeCourse);
	});
});
