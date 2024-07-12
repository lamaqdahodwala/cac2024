import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ChangeAnswerToQuestion, ChangeAnswerToQuestionProps } from './ChangeAnswerToQuestion';
import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';

vi.mock('@prisma/client');

describe('ChangeAnswerToQuestion', () => {
    let prisma: PrismaClient;
    let changeAnswerToQuestion: ChangeAnswerToQuestion;

    beforeEach(() => {
        prisma = new PrismaClient() as any;
        changeAnswerToQuestion = new ChangeAnswerToQuestion();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should change the answer successfully for admin user', async () => {
        const mockUser = { role: 'admin' };
        const mockQuestion = {
            id: 1,
            answers: [
                { id: 1, isCorrect: true },
                { id: 2, isCorrect: false }
            ]
        };
        const mockUpdatedAnswer = { id: 2, answerText: 'New answer', isCorrect: true };

        prisma.user.findUnique = vi.fn().mockResolvedValue(mockUser);
        prisma.quizQuestion.findUnique = vi.fn().mockResolvedValue(mockQuestion);
        prisma.quizAnswer.updateMany = vi.fn().mockResolvedValue({});
        prisma.quizAnswer.update = vi.fn().mockResolvedValue(mockUpdatedAnswer);

        const result = await changeAnswerToQuestion.call({
            prisma,
            questionId: 1,
            answerId: 2,
            newAnswerText: 'New answer',
            newIsCorrect: true,
            userId: 'admin-user-id'
        });

        expect(result).toEqual({ updatedAnswer: mockUpdatedAnswer });
        expect(prisma.quizAnswer.updateMany).toHaveBeenCalledWith({
            where: { quizQuestionId: 1, NOT: { id: 2 } },
            data: { isCorrect: false }
        });
        expect(prisma.quizAnswer.update).toHaveBeenCalledWith({
            where: { id: 2 },
            data: { answerText: 'New answer', isCorrect: true }
        });
    });

    it('should throw an error for non-admin user', async () => {
        prisma.user.findUnique = vi.fn().mockResolvedValue({ role: 'user' });

        await expect(changeAnswerToQuestion.call({
            prisma,
            questionId: 1,
            answerId: 2,
            newAnswerText: 'New answer',
            newIsCorrect: true,
            userId: 'user-id'
        })).rejects.toThrow('Unauthorized: Only admins can modify quiz answers');
    });

    it('should throw an error if question is not found', async () => {
        prisma.user.findUnique = vi.fn().mockResolvedValue({ role: 'admin' });
        prisma.quizQuestion.findUnique = vi.fn().mockResolvedValue(null);

        await expect(changeAnswerToQuestion.call({
            prisma,
            questionId: 1,
            answerId: 2,
            newAnswerText: 'New answer',
            newIsCorrect: true,
            userId: 'admin-user-id'
        })).rejects.toThrow('Question not found');
    });

    it('should throw an error if answer is not found', async () => {
        prisma.user.findUnique = vi.fn().mockResolvedValue({ role: 'admin' });
        prisma.quizQuestion.findUnique = vi.fn().mockResolvedValue({
            id: 1,
            answers: [{ id: 1, isCorrect: true }]
        });

        await expect(changeAnswerToQuestion.call({
            prisma,
            questionId: 1,
            answerId: 2,
            newAnswerText: 'New answer',
            newIsCorrect: true,
            userId: 'admin-user-id'
        })).rejects.toThrow('Answer not found');
    });

    it('should throw an error if trying to set the only correct answer to incorrect', async () => {
        prisma.user.findUnique = vi.fn().mockResolvedValue({ role: 'admin' });
        prisma.quizQuestion.findUnique = vi.fn().mockResolvedValue({
            id: 1,
            answers: [
                { id: 1, isCorrect: true },
                { id: 2, isCorrect: false }
            ]
        });

        await expect(changeAnswerToQuestion.call({
            prisma,
            questionId: 1,
            answerId: 1,
            newAnswerText: 'New answer',
            newIsCorrect: false,
            userId: 'admin-user-id'
        })).rejects.toThrow('Cannot set the only correct answer to incorrect');
    });
});

describe('ChangeAnswerToQuestionProps', () => {
    let changeAnswerToQuestionProps: ChangeAnswerToQuestionProps;

    beforeEach(() => {
        changeAnswerToQuestionProps = new ChangeAnswerToQuestionProps();
    });

    it('should return props when all required fields are provided', async () => {
        const mockEvent = {
            request: {
                json: vi.fn().mockResolvedValue({
                    questionId: '1',
                    answerId: '2',
                    newAnswerText: 'New answer',
                    newIsCorrect: true
                })
            },
            locals: {
                getSession: vi.fn().mockResolvedValue({ user: { id: 'user-id' } })
            }
        };

        const props = await changeAnswerToQuestionProps.getProps(mockEvent as any);

        expect(props).toEqual({
            questionId: 1,
            answerId: 2,
            newAnswerText: 'New answer',
            newIsCorrect: true,
            userId: 'user-id'
        });
    });

    it('should throw an error when required fields are missing', async () => {
        const mockEvent = {
            request: {
                json: vi.fn().mockResolvedValue({
                    questionId: '1',
                    answerId: '2',
                    newAnswerText: 'New answer'
                    // newIsCorrect is missing
                })
            },
            locals: {
                getSession: vi.fn().mockResolvedValue({ user: { id: 'user-id' } })
            }
        };

        await expect(changeAnswerToQuestionProps.getProps(mockEvent as any)).rejects.toThrow('Missing required fields');
    });

    it('should throw an error when user is not logged in', async () => {
        const mockEvent = {
            request: {
                json: vi.fn().mockResolvedValue({
                    questionId: '1',
                    answerId: '2',
                    newAnswerText: 'New answer',
                    newIsCorrect: true
                })
            },
            locals: {
                getSession: vi.fn().mockResolvedValue(null)
            }
        };

        await expect(changeAnswerToQuestionProps.getProps(mockEvent as any)).rejects.toThrow('Unauthorized: User not logged in');
    });
});