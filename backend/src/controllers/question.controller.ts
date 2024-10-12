import {Delete, JsonController, Post, Put, Req, Body, QueryParams, Param, Get} from 'routing-controllers';
import { Service } from 'typedi';
import { QuestionService } from '../services/question.service';
import { QuestionCreateDto, QuestionUpdateDto, SearchQuestionQueryParams } from '../model/question.model';
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
    async updateQuestion(@Param('questionId') questionId: number, @Body() questionUpdateDto: QuestionUpdateDto) {
        return await this.questionService.updateQuestion(questionId, questionUpdateDto);
    }

    @Delete('/:questionId')
    async deleteQuestion(@Param('questionId') questionId: number) {
        return await this.questionService.deleteQuestion(questionId);
    }

    @Get('/all')
    async getAllQuestions(@QueryParams() params: SearchQuestionQueryParams) {
        console.log(JSON.stringify(params));
        params.offset = +params.offset;
        params.limit = +params.limit;
        const tags = params.tags ? params.tags.split(',') : [];
        return await this.questionService.getAllQuestions(params.search, tags, params.offset, params.limit);
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
