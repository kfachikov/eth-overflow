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

        return prisma.question.create({
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

        return prisma.question.update({
            where: { id: questionId },
            data: {
                ...rest,
                tags: tagUpdate
            }
        });
    }

    async deleteQuestion(questionId: number) {
        return prisma.question.delete({
            where: {
                id: questionId,
            },
        });
    }

    async getQuestionWithAnswers(questionId: number) {
        return prisma.question.findUnique({
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
        return prisma.question.findMany({
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

    async updateScore(questionId: number, scoreChange: number) {
        const question = await prisma.question.findUnique({
            where: {
                id: questionId,
            }
        });
        const finalScore = question!.score + scoreChange;
        return prisma.question.update({
            where: {
                id: questionId,
            },
            data: {
                score: finalScore,
            }
        })
    }
}
