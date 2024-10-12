import prisma from '../../prisma';

import { Service } from 'typedi';
import {AnswerCreateDto, AnswerUpdateDto} from '../model/answer.model';

@Service()
export class AnswerService {
    async createAnswer(userId: number, questionId: number, answerCreateDto: AnswerCreateDto) {
        return prisma.answer.create({
            data: {
                authorId: userId,
                questionId: questionId,
                ...answerCreateDto
            },
        })
    }

    async updateAnswer(answerId: number, answerUpdateDto: AnswerUpdateDto) {
        return prisma.answer.update({
            where: {
                id: answerId,
            },
            data: answerUpdateDto,
        });
    }

    async deleteAnswer(answerId: number) {
        return prisma.answer.delete({
            where: {
                id: answerId,
            },
        });
    }

    async updateScore(answerId: number, scoreChange: number) {
        const answer = await prisma.answer.findUnique({
            where: {
                id: answerId,
            }
        });
        const finalScore = answer!.score + scoreChange;
        return prisma.answer.update({
            where: {
                id: answerId,
            },
            data: {
                score: finalScore,
            }
        })
    }
}
