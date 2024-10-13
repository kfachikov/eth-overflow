import { JsonController, Put, Param, Req, Body} from 'routing-controllers';
import { Service } from 'typedi';
import {AnswerService} from "../services/answer.service";
import { Request } from 'express';
import {VoteDto} from "../model/vote.model";
import {VoteAnswerService} from "../services/vote-answer.service";

@JsonController('/answers')
@Service()
export class AnswerVoteController {
    constructor(private answerService: AnswerService, private voteAnswerService: VoteAnswerService) {}

    @Put('/:answerId/vote')
    async voteForAnswer(@Req() req: Request, @Param('answerId') answerId: number, @Body() voteDto: VoteDto) {
        // @ts-ignore
        const userId = req.userId;
        const change = await this.voteAnswerService.voteAnswer(userId, answerId, voteDto);

        return await this.answerService.updateScore(answerId, change);
    }
}
