export class QuestionCreateDto {
    title: string;
    content: string;
    courseId?: number;
}

export class QuestionUpdateDto {
    questionId: number;
    title?: string;
    content?: string;
    courseId?: number;
}

export class QuestionUpdateData {
    title?: string;
    content?: string;
    courseId?: number;
}