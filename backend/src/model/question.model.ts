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