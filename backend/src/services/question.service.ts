import prisma from '../../prisma';

import { Service } from 'typedi';
import { QuestionCreateDto, QuestionUpdateDto } from '../model/question.model';

@Service()
export class QuestionService {
    async createQuestion(userId: number, questionCreateDto: QuestionCreateDto) {
        const { tags, ...rest } = questionCreateDto;

        const tagConnect = tags
            ? tags.map(tagId => ({ id: tagId }))
            : undefined;

        return await prisma.question.create({
            data: {
                authorId: userId,
                ...rest,
                tags: {
                    connect: tagConnect
                }
            },
        });
    }

    async updateQuestion(questionId: number, questionUpdateDto: QuestionUpdateDto) {
        const { tags, ...rest } = questionUpdateDto;

        const tagUpdate = tags
            ? {
                set: tags.map(tagId => ({ id: tagId }))
            }
            : undefined;

        return await prisma.question.update({
            where: { id: questionId },
            data: {
                ...rest,
                tags: tagUpdate
            }
        });
    }

    async deleteQuestion(questionId: number) {
        return await prisma.question.delete({
            where: {
                id: questionId,
            },
        });
    }

    async getAllQuestions(accountId: number, search: string, tags: string[], offset: number, limit: number, orderByField: string, filter: string) {
        const filters: any[] = [];

        // Add filters based on the "filter" argument
        if (filter === "Solved") {
            filters.push({
                NOT: {
                    selectedAnswer: null
                }
            });
        }

        if (filter === "Answered") {
            filters.push({
                answers: {
                    some: {}, // Filters questions that have at least one answer
                },
            });
        }

        if (filter === "Unanswered") {
            filters.push({
                answers: {
                    none: {}, // Filters questions that have no answers
                },
            });
        }

        if (tags.length > 0) {
            tags.map((tag) => {
                filters.push({
                    tags: {
                        some: {
                            name: tag
                        }
                    }
                })
            })
        }

        return await prisma.question.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                        },
                    },
                    {
                        content: {
                            contains: search,
                        },
                    },
                ],
                AND: filters,
            },
            orderBy: {
                [orderByField]: 'desc',
            },
            skip: offset,
            take: limit,
            include: {
                tags: true,
                author: true,
                votesOnQuestion: {
                    where: {
                        accountId,
                    },
                }
            }
        }).then((questions) => {
            return questions.map((question) => {
                const vote = question.votesOnQuestion.filter((vote) => vote.accountId === accountId);
                if (vote.length > 0 && vote[0]) {
                    return {
                        ...question,
                        vote: vote[0].upvote ? 1 : -1,
                    }
                }

                return {
                    ...question,
                    vote: 0,
                }
            })
        });
    }

    async getQuestionWithAnswers(accountId: number, questionId: number) {
        return await prisma.question.findUnique({
            where: { id: questionId },
            include: {
                author: true,
                answers: {
                    include: {
                        author: true,
                        comments: {
                            include: {
                                author: true,
                            }
                        },
                        votesOnAnswer: {
                            where: {
                                accountId,
                            }
                        }
                    }
                },
                comments: {
                    include: {
                        author: true,
                    }
                },
                tags: true,
                votesOnQuestion: {
                    where: {
                        accountId,
                    },
                }
            },
        }).then((question) => {
            if (!question) {
                return null;
            }

            const answers = question.answers.map((answer) => {
                const vote = answer.votesOnAnswer.filter((vote) => vote.accountId === accountId);
                return {
                    ...answer,
                    vote: vote.length > 0 && vote[0] ? (vote[0].upvote ? 1 : -1) : 0,
                }
            });
            
            const vote = question.votesOnQuestion.filter((vote) => vote.accountId === accountId);
            if (vote.length > 0 && vote[0]) {
                return {
                    ...question,
                    vote: vote[0].upvote ? 1 : -1,
                    answers,
                }
            }

            return {
                ...question,
                vote: 0,
                answers,
            }
        });
    }

    async getQuestionsWithAnswers() {
        return await prisma.question.findMany({
            include: {
                answers: {
                    include: {
                        comments: true,
                    }
                },
                comments: true,
                tags: true,
            },
        });
    }

    async updateScore(questionId: number, scoreChange: number) {
        const question = await prisma.question.findUnique({
            where: {
                id: questionId,
            }
        });

        const finalScore = question!.score + scoreChange;

        return await prisma.question.update({
            where: {
                id: questionId,
            },
            data: {
                score: finalScore,
            }
        })
    }

    async selectBestAnswer(questionId: number, answerId: number) {
        return await prisma.question.update({
            where: {
                id: questionId,
            },
            data: {
                selectedAnswerId: answerId,
            }
        })
    }
}
