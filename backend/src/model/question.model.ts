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