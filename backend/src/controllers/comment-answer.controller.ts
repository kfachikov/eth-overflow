import {Delete, JsonController, Post, Put, Param, Req, Body, Get} from 'routing-controllers';
import { Service } from 'typedi';
import { Request } from 'express';
import {CommentAnswerService} from "../services/comment-answer.service";
import {CommentAnswerCreateDto, CommentAnswerUpdateDto} from "../model/comment-answer.model";

@JsonController('/answers/:answerId/comments')
@Service()
export class CommentAnswerController {
    constructor(private commentAnswerService: CommentAnswerService ) {}

    @Post('/')
    async createCommentAnswer(@Param('answerId') answerId: number, @Body() commentAnswerCreateDto: CommentAnswerCreateDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        return await this.commentAnswerService.createCommentAnswer(userId, answerId, commentAnswerCreateDto);
    }

    @Put('/:commentAnswerId')
    async updateCommentAnswer(@Param('commentAnswerId') commentAnswerId: number, @Body() commentAnswerUpdateDto: CommentAnswerUpdateDto) {
        return await this.commentAnswerService.updateCommentAnswer(commentAnswerId, commentAnswerUpdateDto);
    }

    @Delete('/:commentAnswerId')
    async deleteAnswer(@Param('commentAnswerId') commentAnswerId: number) {
        return await this.commentAnswerService.deleteCommentAnswer(commentAnswerId);
    }

    @Get('/')
    async getComments(@Param('answerId') answerId: number) {
        return await this.commentAnswerService.getComments(answerId);
    }
}
