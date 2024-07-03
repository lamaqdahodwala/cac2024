import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { error, json, type RequestEvent } from '@sveltejs/kit';

// Mock PrismaClient before importing POST
const mockPrismaClient = vi.fn();
// Now import POST after mocking PrismaClient
import { POST } from './AddActiveCourse';
import { PrismaProps } from '$lib/generic/PrismaProps';
import { MultiProp } from '$lib/helpers/MultiProp';

describe('POST handler for adding active course', () => {
	let prismaProps = mockDeep<PrismaProps>();
	let prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
	prismaProps.getProps.mockImplementation(async (e) => ({ prisma: prismaMock }));
	let event = mockDeep<RequestEvent>();
	let props = MultiProp.merge([prismaProps]);


  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>();
    mockPrismaClient.mockReturnValue(prismaMock);
    mockReset(prismaMock);
  });

  it('successfully adds an active course to a user', async () => {
    const mockUserId = 'user123';
    const mockCourseId = 1;
    const mockUpdatedUser = {
      id: mockUserId,
      name: 'Test User',
      email: 'test@example.com',
      emailVerified: null,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      activeCourses: [{ id: mockCourseId, title: 'Test Course', writerId: 'writer123' }],
    };

    event.request.json.mockResolvedValue({ userId: mockUserId, courseId: mockCourseId });
    prismaMock.user.update.mockResolvedValue(mockUpdatedUser);

    const result = await POST(event);

    expect(result.status).toBe(200);
    const body = await result.json();
    expect(body).toEqual({
      success: true,
      user: mockUpdatedUser,
    });
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: mockUserId },
      data: {
        activeCourses: {
          connect: { id: mockCourseId },
        },
      },
      include: { activeCourses: true },
    });
  });

  it('throws a 400 error when userId is missing', async () => {
    event.request.json.mockResolvedValue({ courseId: 1 });

    await expect(POST(event)).rejects.toThrow('Missing userId or courseId');
  });

  it('throws a 400 error when courseId is missing', async () => {
    event.request.json.mockResolvedValue({ userId: 'user123' });

    await expect(POST(event)).rejects.toThrow('Missing userId or courseId');
  });

  it('throws a 500 error when Prisma update fails', async () => {
    event.request.json.mockResolvedValue({ userId: 'user123', courseId: 1 });
    prismaMock.user.update.mockRejectedValue(new Error('Prisma error'));

    await expect(POST(event)).rejects.toThrow('Failed to add active course');
  });
});
