import { JsonController, Post, UploadedFile } from 'routing-controllers';
import { Service } from 'typedi';

@JsonController('/questions')
@Service()
export class QuestionController {
    constructor(
    ) {}

    
}
