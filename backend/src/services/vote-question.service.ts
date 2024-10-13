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
        const finalScore = voteDto.score

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
