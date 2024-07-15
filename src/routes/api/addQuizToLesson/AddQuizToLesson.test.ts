import { PrismaProps } from '$lib/generic/PrismaProps';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import type { RequestEvent } from './$types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MultiProp } from '$lib/helpers/MultiProp';
import { AddQuizToLesson, AddQuizToLessonProps } from './AddQuizToLesson';
import { APIRoute } from '$lib/abstract/APIRoute';

describe('AddQuizToLesson', () => {
	let prismaProps = mockDeep<PrismaProps>();
	let prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
	prismaProps.getProps.mockImplementation(async (e) => ({ prisma: prismaMock }));
	let event = mockDeep<RequestEvent>();
	let props = MultiProp.merge([prismaProps, new AddQuizToLessonProps()]);
	let apiRoute = new APIRoute(props, new AddQuizToLesson());

	beforeEach(() => {
		mockReset(event);
		mockReset(prismaMock);
	});

	it('Can add a quiz to a lesson', async () => {
		let fakeQuiz = {
			id: 1,
			lessonId: 123,
			questions: []
		};
		prismaMock.user.findUnique.mockResolvedValueOnce({
			id: 'user1',
			name: 'Test User',
			email: 'test@example.com',
			emailVerified: null,
			image: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			role: 'admin'
		});
		prismaMock.lesson.findUnique.mockResolvedValueOnce({
			id: 123,
			textContent: 'Sample text content',
			courseId: 1,
			title: 'Sample Lesson',
			description: 'Sample description'
		});
		prismaMock.quiz.findUnique.mockResolvedValueOnce(null);
		prismaMock.quiz.create.mockResolvedValueOnce(fakeQuiz);
		event.request.json.mockResolvedValueOnce({ lessonId: 123 });
		event.locals = { user: { id: 'user1' } };

		await expect(apiRoute.callRoute(event)).resolves.toEqual({
			message: 'Quiz added successfully',
			quiz: fakeQuiz
		});
	});

	it('Throws an error if user is not an admin', async () => {
		prismaMock.user.findUnique.mockResolvedValueOnce({
			id: 'user1',
			name: 'Test User',
			email: 'test@example.com',
			emailVerified: null,
			image: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			role: 'student'
		});
		event.request.json.mockResolvedValueOnce({ lessonId: 123 });
		event.locals = { user: { id: 'user1' } };

		await expect(apiRoute.callRoute(event)).rejects.toThrow(
			'Unauthorized: Only admins can add quizzes'
		);
	});

	it('Throws an error if lesson is not found', async () => {
		prismaMock.user.findUnique.mockResolvedValueOnce({
			id: 'user1',
			name: 'Test User',
			email: 'test@example.com',
			emailVerified: null,
			image: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			role: 'admin'
		});
		prismaMock.lesson.findUnique.mockResolvedValueOnce(null);
		event.request.json.mockResolvedValueOnce({ lessonId: 123 });
		event.locals = { user: { id: 'user1' } };

		await expect(apiRoute.callRoute(event)).rejects.toThrow('Lesson not found');
	});

	it('Throws an error if a quiz already exists for the lesson', async () => {
		prismaMock.user.findUnique.mockResolvedValueOnce({
			id: 'user1',
			name: 'Test User',
			email: 'test@example.com',
			emailVerified: null,
			image: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			role: 'admin'
		});
		prismaMock.lesson.findUnique.mockResolvedValueOnce({
			id: 123,
			textContent: 'Sample text content',
			courseId: 1,
			title: 'Sample Lesson',
			description: 'Sample description'
		});
		prismaMock.quiz.findUnique.mockResolvedValueOnce({ id: 1, lessonId: 123 });
		event.request.json.mockResolvedValueOnce({ lessonId: 123 });
		event.locals = { user: { id: 'user1' } };

		await expect(apiRoute.callRoute(event)).rejects.toThrow(
			'A quiz already exists for this lesson'
		);
	});
});
