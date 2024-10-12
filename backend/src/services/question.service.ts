import prisma from '../../prisma';

import { Service } from 'typedi';
import { QuestionCreateDto, QuestionUpdateDto } from '../model/question.model';

@Service()
export class QuestionService {
    async createQuestion(userId: number, questionCreateDto: QuestionCreateDto) {
        return prisma.question.create({
            data: {
                authorId: userId,
                ...questionCreateDto
            },
        })
    }

    async updateQuestion(questionId: number, questionUpdateDto: QuestionUpdateDto) {
        return prisma.question.update({
            where: {
                id: questionId,
            },
            data: questionUpdateDto,
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
            },
        });
    }
}
