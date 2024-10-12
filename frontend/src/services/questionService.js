import httpService from './httpService';

export const getQuestions = async (search, tags, offset, limit, order) => {
    if (search) {
      search = `&search=${search}`;
    }
    
    if (tags && tags.length > 0) {
      tags = `&tags=${tags.join(',')}`;
    }

    return await httpService.get(`/questions/all?offset=${offset}&limit=${limit}&order=${order}${search}${tags}`);
};

export const voteQuestion = async (questionId, voteState) => {
    const data = {
        score: voteState
    }
    return await httpService.put(`/questions/${questionId}/vote`, data)
}