import prisma from '../../prisma';

import { Service } from 'typedi';
import { QuestionCreateDto, QuestionUpdateDto } from '../model/question.model';

@Service()
export class QuestionService {
    async createQuestion(userId: number, questionCreateDto: QuestionCreateDto) {
        const { tags, ...rest } = questionCreateDto;

        const tagConnect = tags
            ? tags.map(tagId => ({ id: tagId }))
            : undefined;

        return await prisma.question.create({
            data: {
                authorId: userId,
                ...rest,
                tags: {
                    connect: tagConnect
                }
            },
        });
    }

    async updateQuestion(questionId: number, questionUpdateDto: QuestionUpdateDto) {
        const { tags, ...rest } = questionUpdateDto;

        const tagUpdate = tags
            ? {
                set: tags.map(tagId => ({ id: tagId }))
            }
            : undefined;

        return await prisma.question.update({
            where: { id: questionId },
            data: {
                ...rest,
                tags: tagUpdate
            }
        });
    }

    async deleteQuestion(questionId: number) {
        return await prisma.question.delete({
            where: {
                id: questionId,
            },
        });
    }

    async getAllQuestions(search: string, tags: string[], offset: number, limit: number) {
        return await prisma.question.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                        },
                    },
                    {
                        content: {
                            contains: search,
                        },
                    },
                ],
            ...(tags.length > 0 && {
                    AND: tags.map((tag) => ({
                        tags: {
                            some: {
                                name: tag
                            }
                        }
                    }))
                }),
            },
            skip: offset,
            take: limit,
            include: {
                tags: true,
                author: true,
            }
        });
    }

    async getQuestionWithAnswers(questionId: number) {
        return await prisma.question.findUnique({
            where: { id: questionId },
            include: {
                answers: {
                    include: {
                        comments: true,
                    }
                    },
                comments: true,
                tags: true,
            },
        });
    }

    async getQuestionsWithAnswers() {
        return await prisma.question.findMany({
            include: {
                answers: {
                    include: {
                        comments: true,
                    }
                },
                comments: true,
                tags: true,
            },
        });
    }
}
