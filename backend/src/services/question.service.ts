import prisma from '../../prisma';

import { Service } from 'typedi';
import { QuestionCreateDto, QuestionUpdateData } from '../model/question.model';

@Service()
export class QuestionService {
    async createQuestion(userId: number, questionCreateDto: QuestionCreateDto) {
        return await prisma.question.create({
            data: {
                authorId: userId,
                ...questionCreateDto
            },
        })
    }

    async updateQuestion(questionId: number, questionUpdateDto: QuestionUpdateData) {
        return await prisma.question.update({
            where: {
                id: questionId,
            },
            data: questionUpdateDto,
        });
    }

    async deleteQuestion(questionId: number) {
        return await prisma.question.delete({
            where: {
                id: questionId,
            },
        });
    }
}
