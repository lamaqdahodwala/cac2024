import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { error, json } from '@sveltejs/kit';

// Mock PrismaClient before importing POST
const mockPrismaClient = vi.fn();
vi.mock('@prisma/client', () => ({
  PrismaClient: mockPrismaClient,
}));

// Now import POST after mocking PrismaClient
import { POST } from './AddActiveCourse';

describe('POST handler for adding active course', () => {
  let prismaMock: DeepMockProxy<PrismaClient>;
  let mockRequest: any;

  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>();
    mockPrismaClient.mockReturnValue(prismaMock);
    
    mockRequest = {
      json: vi.fn(),
    };
    
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

    mockRequest.json.mockResolvedValue({ userId: mockUserId, courseId: mockCourseId });
    prismaMock.user.update.mockResolvedValue(mockUpdatedUser);

    const result = await POST({ request: mockRequest });

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
    mockRequest.json.mockResolvedValue({ courseId: 1 });

    await expect(POST({ request: mockRequest })).rejects.toThrow('Missing userId or courseId');
  });

  it('throws a 400 error when courseId is missing', async () => {
    mockRequest.json.mockResolvedValue({ userId: 'user123' });

    await expect(POST({ request: mockRequest })).rejects.toThrow('Missing userId or courseId');
  });

  it('throws a 500 error when Prisma update fails', async () => {
    mockRequest.json.mockResolvedValue({ userId: 'user123', courseId: 1 });
    prismaMock.user.update.mockRejectedValue(new Error('Prisma error'));

    await expect(POST({ request: mockRequest })).rejects.toThrow('Failed to add active course');
  });
});