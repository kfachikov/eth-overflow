import prisma from '../../prisma';

import { Service } from 'typedi';
import {VoteDto} from "../model/vote.model";

@Service()
export class VoteQuestionService {
    async voteQuestion(userId: number, questionId: number, voteDto: VoteDto) {
        const vote = await prisma.votesOnQuestion.findUnique({
            where: {
                accountId_questionId: {
                    accountId: userId,
                    questionId: questionId,
                },
            },
        })
        
        const initialScore = vote ? (vote.upvote ? 1 : -1) : 0;
        const finalScore = voteDto.score;

        let karmaQuestionPosterUpdate = 0;

        if (finalScore == 1 && initialScore == 0) {
            karmaQuestionPosterUpdate = 10;
        } else if (finalScore == 1 && initialScore == -1) {
            karmaQuestionPosterUpdate = 12;
        } else if (finalScore == 0 && initialScore == 1) {
            karmaQuestionPosterUpdate = -10;
        } else if (finalScore == 0 && initialScore == -1) {
            karmaQuestionPosterUpdate = 2;
        } else if (finalScore == -1 && initialScore == 0) {
            karmaQuestionPosterUpdate = -10;
        } else if (finalScore == -1 && initialScore == 1) {
            karmaQuestionPosterUpdate = -12;
        }

        const question = await prisma.question.findUnique({
            where: {
                id: questionId,
            },
        });

        if (question!.authorId == userId) {
            karmaQuestionPosterUpdate = 0;
        }

        await prisma.account.update({
            where: {
                id: question!.authorId,
            },
            data: {
                karma: {
                    increment: karmaQuestionPosterUpdate,
                }
            }
        })

        if (finalScore == 0 && vote) {
            await prisma.votesOnQuestion.delete({
                where: {
                    accountId_questionId: {
                        accountId: userId,
                        questionId: questionId,
                    },
                }
            })
        } else if (vote) {
            await prisma.votesOnQuestion.update({
                where: {
                    accountId_questionId: {
                        accountId: userId,
                        questionId: questionId,
                    },
                },
                data: {
                    upvote: finalScore == 1,
                }
            })
        } else if (finalScore != 0) {
            await prisma.votesOnQuestion.create({
                data: {
                    accountId: userId,
                    questionId: questionId,
                    upvote: finalScore == 1,
                }
            })
        }

        return finalScore - initialScore
    }
}
