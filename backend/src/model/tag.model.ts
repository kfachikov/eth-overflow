export class TagCreateDto {
    name: string;
    questions: number[];
}

export class TagUpdateDto {
    name?: string;
    questions?: number[];
}