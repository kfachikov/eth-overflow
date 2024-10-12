import {Delete, JsonController, Post, Put, Req, Body, Get, Param} from 'routing-controllers';
import { Service } from 'typedi';
import { QuestionService } from '../services/question.service';
import {QuestionCreateDto, QuestionUpdateDto, SelectAnswerDto} from '../model/question.model';
import {VoteDto} from "../model/vote.model";
import { Request } from 'express';
import {VoteQuestionService} from "../services/vote-question.service";

@JsonController('/questions')
@Service()
export class QuestionController {
    constructor(private questionService: QuestionService, private voteQuestionService: VoteQuestionService) {}

    @Post('/')
    async createQuestion(@Body() questionCreateDto: QuestionCreateDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        return await this.questionService.createQuestion(userId, questionCreateDto);
    }

    @Put('/:questionId')
    async updateQuestion(@Param('questionId') questionId: number, @Body() questionUpdateDto: QuestionUpdateDto) {
        return await this.questionService.updateQuestion(questionId, questionUpdateDto);
    }

    @Delete('/:questionId')
    async deleteQuestion(@Param('questionId') questionId: number) {
        return await this.questionService.deleteQuestion(questionId);
    }

    @Get('/:questionId')
    async getQuestionById(@Param('questionId') questionId: number) {
        return await this.questionService.getQuestionWithAnswers(questionId);
    }

    @Get('/')
    async getQuestions() {
        return await this.questionService.getQuestionsWithAnswers();
    }

    @Put('/:questionId/vote')
    async voteForQuestion(@Param('questionId') questionId: number, @Body() voteDto: VoteDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        const change = await this.voteQuestionService.voteQuestion(userId, questionId, voteDto);

        return await this.questionService.updateScore(questionId, change);
    }

    @Put('/:questionId/select')
    async selectBestAnswer(@Param('questionId') questionId: number, @Body() selectAnswerDto: SelectAnswerDto) {
        return await this.questionService.selectBestAnswer(questionId, selectAnswerDto.answerId);
    }
}
