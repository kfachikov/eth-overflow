import prisma from '../../prisma';

import { Service } from 'typedi';
import {CommentQuestionCreateDto, CommentQuestionUpdateDto} from "../model/comment-question";

@Service()
export class CommentQuestionService {
    async createCommentQuestion(userId: number, questionId: number, commentQuestionCreateDto: CommentQuestionCreateDto) {
        return await prisma.commentQuestion.create({
            data: {
                authorId: userId,
                questionId: questionId,
                ...commentQuestionCreateDto
            },
        })
    }

    async updateCommentQuestion(commentQuestionId: number, commentQuestionUpdateDto: CommentQuestionUpdateDto) {
        return await prisma.commentQuestion.update({
            where: {
                id: commentQuestionId,
            },
            data: commentQuestionUpdateDto,
        });
    }

    async deleteCommentQuestion(commentQuestionId: number) {
        return await prisma.commentQuestion.delete({
            where: {
                id: commentQuestionId,
            },
        });
    }
}
