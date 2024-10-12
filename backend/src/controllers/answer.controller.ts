import {Delete, JsonController, Post, Put, Param, Req, Body, Get} from 'routing-controllers';
import { Service } from 'typedi';
import {AnswerService} from "../services/answer.service";
import {AnswerCreateDto, AnswerUpdateDto} from "../model/answer.model";
import { Request } from 'express';

@JsonController('/questions/:questionId/answers')
@Service()
export class AnswerController {
    constructor(private answerService: AnswerService) {}

    @Post('/')
    async createAnswer(@Param('questionId') questionId: number, @Body() answerCreateDto: AnswerCreateDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        return await this.answerService.createAnswer(userId, questionId, answerCreateDto);
    }

    @Put('/:answerId')
    async updateAnswer(answerId: number, answerUpdateDto: AnswerUpdateDto) {
        return await this.answerService.updateAnswer(answerId, answerUpdateDto);
    }

    @Delete('/:answerId')
    async deleteAnswer(answerId: number) {
        return await this.answerService.deleteAnswer(answerId);
    }
}
