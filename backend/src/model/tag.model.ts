export class TagCreateDto {
    name: string;
}

export class TagUpdateDto {
    name?: string;
    questions?: number[];
}