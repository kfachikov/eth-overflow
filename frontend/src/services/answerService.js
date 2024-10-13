import httpService from './httpService';

export const voteAnswer = async (answerId, voteState) => {
    const data = {
        score: voteState
    }
    return await httpService.put(`/answers/${answerId}/vote`, data)
}

export const deleteAnswer = async (answerId) => {
    return await httpService.delete(`/answers/${answerId}`);
}