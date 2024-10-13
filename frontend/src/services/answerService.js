import httpService from './httpService';

export const voteAnswer = async (answerId, voteState) => {
    const data = {
        score: voteState
    }
    return await httpService.put(`/answers/${answerId}/vote`, data)
}

export const editAnswer = async (questionId, answerId, updatedContent) => {
    const data = {
        content: updatedContent
    };
    console.log("POLUDQVAM " + data)
    return await httpService.put(`questions/${questionId}/answers/${answerId}`, data)
}