import prisma from '../../prisma';

import { Service } from 'typedi';
import {CommentQuestionCreateDto, CommentQuestionUpdateDto} from "../model/comment-question";

@Service()
export class CommentQuestionService {
    async createCommentQuestion(userId: number, questionId: number, commentQuestionCreateDto: CommentQuestionCreateDto) {
        return prisma.commentQuestion.create({
            data: {
                authorId: userId,
                questionId: questionId,
                ...commentQuestionCreateDto
            },
        })
    }

    async updateCommentQuestion(commentQuestionId: number, commentQuestionUpdateDto: CommentQuestionUpdateDto) {
        return prisma.commentQuestion.update({
            where: {
                id: commentQuestionId,
            },
            data: commentQuestionUpdateDto,
        });
    }

    async deleteCommentQuestion(commentQuestionId: number) {
        return prisma.commentQuestion.delete({
            where: {
                id: commentQuestionId,
            },
        });
    }
}
