import {Delete, JsonController, Get, Put, Req} from 'routing-controllers';
import { Service } from 'typedi';
import { QuestionService } from '../services/question.service';
import { QuestionCreateDto, QuestionUpdateDto } from '../model/question.model';

@JsonController('/questions')
@Service()
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Get('/')
    async createQuestion(questionCreateDto: QuestionCreateDto, @Req() req: Request) {
        // @ts-ignore
        const userId = req.userId;
        console.log("in create question : ", userId);
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
}
