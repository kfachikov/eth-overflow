import {Delete, JsonController, Post, Put} from 'routing-controllers';
import { Service } from 'typedi';
import {AnswerService} from "../services/answer.service";
import {AnswerCreateDto, AnswerUpdateDto} from "../model/answer.model";

@JsonController('/answers')
@Service()
export class AnswerController {
    constructor(private answerService: AnswerService) {}

    @Post('/')
    async createAnswer(answerCreateDto: AnswerCreateDto) {
        const userId = 1;
        return await this.answerService.createAnswer(userId, answerCreateDto);
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
