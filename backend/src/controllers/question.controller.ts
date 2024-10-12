import {Delete, JsonController, Post, Put, Req, Body, Get, Param} from 'routing-controllers';
import { Service } from 'typedi';
import { QuestionService } from '../services/question.service';
import { QuestionCreateDto, QuestionUpdateDto } from '../model/question.model';
import { Request } from 'express';

@JsonController('/questions')
@Service()
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Post('/')
    async createQuestion(@Body() questionCreateDto: QuestionCreateDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        return await this.questionService.createQuestion(userId, questionCreateDto);
    }

    @Put('/:questionId')
    async updateQuestion(questionId: number, questionUpdateDto: QuestionUpdateDto) {
        return await this.questionService.updateQuestion(questionId, questionUpdateDto);
    }

    @Delete('/:questionId')
    async deleteQuestion(questionId: number) {
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
}
