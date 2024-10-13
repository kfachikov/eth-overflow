import prisma from '../../prisma';

import { Service } from 'typedi';
import {VoteDto} from "../model/vote.model";

@Service()
export class VoteAnswerService {
    async voteAnswer(userId: number, answerId: number, voteDto: VoteDto) {
        const vote = await prisma.votesOnAnswer.findUnique({
            where: {
                accountId_answerId: {
                    accountId: userId,
                    answerId: answerId,
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

        const answer = await prisma.answer.findUnique({
            where: {
                id: answerId,
            },
        });

        if (answer!.authorId == userId) {
            karmaQuestionPosterUpdate = 0;
        }

        await prisma.account.update({
            where: {
                id: answer!.authorId,
            },
            data: {
                karma: {
                    increment: karmaQuestionPosterUpdate,
                }
            }
        })

        if (finalScore == -1 && initialScore != -1) {
            await prisma.account.update({
                where: {
                    id: userId,
                },
                data: {
                    karma: {
                        increment: -1,
                    }
                }
            })
        }

        if (finalScore == 0 && vote) {
            await prisma.votesOnAnswer.delete({
                where: {
                    accountId_answerId: {
                        accountId: userId,
                        answerId: answerId,
                    },
                }
            })
        } else if (vote) {
            await prisma.votesOnAnswer.update({
                where: {
                    accountId_answerId: {
                        accountId: userId,
                        answerId: answerId,
                    },
                },
                data: {
                    upvote: finalScore == 1,
                }
            })
        } else if (finalScore != 0) {
            await prisma.votesOnAnswer.create({
                data: {
                    accountId: userId,
                    answerId: answerId,
                    upvote: finalScore == 1,
                }
            })
        }

        return finalScore - initialScore
    }
}
