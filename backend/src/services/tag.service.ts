import prisma from '../../prisma';
import { Service } from 'typedi';
import { TagCreateDto, TagUpdateDto } from '../model/tag.model';

@Service()
export class TagService {
    async createTag(tagCreateDto: TagCreateDto) {
        return await prisma.tag.create({
            data: {
                ...tagCreateDto
            },
        });
    }

    async updateTag(tagId: number, tagUpdateDto: TagUpdateDto) {
        const { questions, ...rest } = tagUpdateDto;

        const questionUpdate = questions
            ? {
                set: questions.map(questionId => ({ id: questionId }))
            }
            : undefined;

        return await prisma.tag.update({
            where: { id: tagId },
            data: {
                ...rest,
                questions: questionUpdate,
            },
        });
    }

    async deleteTag(tagId: number) {
        return await prisma.tag.delete({
            where: { id: tagId },
        });
    }

    async getTags() {
        // return await prisma.tag.findMany();
        return Promise.resolve([
            {
                id: 1,
                name: 'JavaScript',
            }, 
            {
                id: 2,
                name: 'TypeScript',
            },
            {
                id: 3,
                name: 'Node.js',
            },
            {
                id: 4,
                name: 'React',
            },
            {
                id: 5,
                name: 'Angular',
            },
            {
                id: 6,
                name: 'Vue.js',
            },
            {
                id: 7,
                name: 'Express',
            },
            {
                id: 8,
                name: 'NestJS',
            },
            {
                id: 9,
                name: 'Next.js',
            },
            {
                id: 10,
                name: 'Gatsby',
            },
        ]);
    }
}
