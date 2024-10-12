import httpService from './httpService';

export const voteAnswer = async (questionId, answerId, voteState) => {
    const data = {
        score: voteState
    }
    return await httpService.put(`/questions/${questionId}/answers/${answerId}/vote`, data)
}