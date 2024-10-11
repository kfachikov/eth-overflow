import prisma from '../../prisma';

import { Service } from 'typedi';
import {AnswerCreateDto, AnswerUpdateDto} from '../model/answer.model';

@Service()
export class AnswerService {
    async createAnswer(userId: number, answerCreateDto: AnswerCreateDto) {
        return await prisma.answer.create({
            data: {
                authorId: userId,
                ...answerCreateDto
            },
        })
    }

    async updateAnswer(answerId: number, answerUpdateDto: AnswerUpdateDto) {
        return await prisma.answer.update({
            where: {
                id: answerId,
            },
            data: answerUpdateDto,
        });
    }

    async deleteAnswer(answerId: number) {
        return await prisma.answer.delete({
            where: {
                id: answerId,
            },
        });
    }
}
