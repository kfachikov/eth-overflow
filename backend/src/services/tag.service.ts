import prisma from '../../prisma';
import { Service } from 'typedi';
import { TagCreateDto, TagUpdateDto } from '../model/tag.model';

@Service()
export class TagService {
    async createTag(tagCreateDto: TagCreateDto) {
        const { questions, ...rest } = tagCreateDto;

        const questionConnect = questions
            ? questions.map(questionId => ({ id: questionId }))
            : undefined;

        return prisma.tag.create({
            data: {
                ...rest,
                questions: {
                    connect: questionConnect,
                },
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

        return prisma.tag.update({
            where: { id: tagId },
            data: {
                ...rest,
                questions: questionUpdate,
            },
        });
    }

    async deleteTag(tagId: number) {
        return prisma.tag.delete({
            where: { id: tagId },
        });
    }

    async getQuestionsForTag(tagId: number) {
        return prisma.tag.findUnique({
            where: { id: tagId },
            include: {
                questions: true,
            },
        });
    }
}
