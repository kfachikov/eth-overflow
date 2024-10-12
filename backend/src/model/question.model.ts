export class QuestionCreateDto {
    title: string;
    content: string;
    courseId?: number;
}

export class QuestionUpdateDto {
    title?: string;
    content?: string;
    courseId?: number;
}

export class SearchQuestionQueryParams {
    search = '';
    offset = 0;
    limit = 10;
    tags: string[] = [];
}