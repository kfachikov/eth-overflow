import {Delete, JsonController, Post, Put, Param, Req, Body} from 'routing-controllers';
import { Service } from 'typedi';
import {AnswerService} from "../services/answer.service";
import {AnswerCreateDto, AnswerUpdateDto} from "../model/answer.model";
import { Request } from 'express';
import {VoteDto} from "../model/vote.model";
import {VoteAnswerService} from "../services/vote-answer.service";

@JsonController('/questions/:questionId/answers')
@Service()
export class AnswerController {
    constructor(private answerService: AnswerService, private voteAnswerService: VoteAnswerService) {}

    @Post('/')
    async createAnswer(@Param('questionId') questionId: number, @Body() answerCreateDto: AnswerCreateDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        return await this.answerService.createAnswer(userId, questionId, answerCreateDto);
    }

    @Put('/:answerId')
    async updateAnswer(@Param('answerId') answerId: number, @Body() answerUpdateDto: AnswerUpdateDto) {
        return await this.answerService.updateAnswer(answerId, answerUpdateDto);
    }

    @Delete('/:answerId')
    async deleteAnswer(@Param('answerId') answerId: number) {
        return await this.answerService.deleteAnswer(answerId);
    }

    @Put('/:answerId/vote')
    async voteForAnswer(@Param('answerId') answerId: number, @Body() voteDto: VoteDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        const change = await this.voteAnswerService.voteAnswer(userId, answerId, voteDto);

        return await this.answerService.updateScore(answerId, change);
    }
}
