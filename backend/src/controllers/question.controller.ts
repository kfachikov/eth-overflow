import {Delete, JsonController, Post, Put, Req, Body, QueryParams, Get} from 'routing-controllers';
import { Service } from 'typedi';
import { QuestionService } from '../services/question.service';
import { QuestionCreateDto, QuestionUpdateDto, SearchQuestionQueryParams } from '../model/question.model';
import { Request } from 'express';
import { SearchPhraseQueryParams } from '../model/common.model';

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

    @Get('/all')
    async getAllQuestions(@QueryParams() params: SearchPhraseQueryParams<void>) {
        params.offset = +params.offset;
        params.limit = +params.limit;
        return await this.questionService.getAllQuestions(params.search, params.offset, params.limit);
    }
}
