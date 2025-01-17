export class QuestionCreateDto {
    title: string;
    content: string;
    tags: number[];
}

export class QuestionUpdateDto {
    title?: string;
    content?: string;
    tags?: number[];
}

export class SearchQuestionQueryParams {
    search = '';
    offset = 0;
    limit = 10;
    tags = '';
    order: "createdAt" | "score" = "createdAt";
    filter: 'All' | 'Unanswered' | 'Answered' | 'Solved' = "All"
}

export class SelectAnswerDto {
    answerId: number;
}