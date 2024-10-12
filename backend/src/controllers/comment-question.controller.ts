import {Delete, JsonController, Post, Put, Param, Req, Body} from 'routing-controllers';
import { Service } from 'typedi';
import { Request } from 'express';
import {CommentQuestionService} from "../services/comment-question.service";
import {CommentQuestionCreateDto, CommentQuestionUpdateDto} from "../model/comment-question";

@JsonController('/questions/:questionId')
@Service()
export class CommentQuestionController {
    constructor(private commentQuestionService: CommentQuestionService ) {}

    @Post('/')
    async createCommentQuestion(@Param('questionId') questionId: number, @Body() commentQuestionCreateDto: CommentQuestionCreateDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        return await this.commentQuestionService.createCommentQuestion(userId, questionId, commentQuestionCreateDto);
    }

    @Put('/:commentQuestionId')
    async updateCommentQuestion(commentQuestionId: number, commentQuestionUpdateDto: CommentQuestionUpdateDto) {
        return await this.commentQuestionService.updateCommentQuestion(commentQuestionId, commentQuestionUpdateDto);
    }

    @Delete('/:commentQuestionId')
    async deleteAnswer(commentQuestionId: number) {
        return await this.commentQuestionService.deleteCommentQuestion(commentQuestionId);
    }
}
