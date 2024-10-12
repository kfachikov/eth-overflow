import prisma from '../../prisma';

import { Service } from 'typedi';
import {CommentAnswerCreateDto, CommentAnswerUpdateDto} from '../model/comment-answer.model';

@Service()
export class CommentAnswerService {
    async createCommentAnswer(userId: number, answerId: number, commentAnswerCreateDto: CommentAnswerCreateDto) {
        return await prisma.commentAnswer.create({
            data: {
                authorId: userId,
                answerId: answerId,
                ...commentAnswerCreateDto
            },
        })
    }

    async updateCommentAnswer(commentAnswerId: number, commentAnswerUpdateDto: CommentAnswerUpdateDto) {
        return await prisma.commentAnswer.update({
            where: {
                id: commentAnswerId,
            },
            data: commentAnswerUpdateDto,
        });
    }

    async deleteCommentAnswer(commentAnswerId: number) {
        return await prisma.commentAnswer.delete({
            where: {
                id: commentAnswerId,
            },
        });
    }
}
