import {Delete, Get, JsonController, Post, Put} from 'routing-controllers';
import { Service } from 'typedi';
import { QuestionService } from '../services/question.service';
import { QuestionCreateDto, QuestionUpdateDto } from '../model/question.model';

@JsonController('/questions')
@Service()
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Get('/')
    async createQuestion(questionCreateDto: QuestionCreateDto) {
        const userId = 1;
        return "helooo";
        // return await this.questionService.createQuestion(userId, questionCreateDto);
    }

    @Put('/:questionId')
    async updateQuestion(questionId: number, questionUpdateDto: QuestionUpdateDto) {
        return await this.questionService.updateQuestion(questionId, questionUpdateDto);
    }

    @Delete('/:questionId')
    async deleteQuestion(questionId: number) {
        return await this.questionService.deleteQuestion(questionId);
    }
}
