export class AnswerCreateDto {
    content: string;
    questionId: number;
}

export class AnswerUpdateDto {
    content?: string;
    score?: number;
}