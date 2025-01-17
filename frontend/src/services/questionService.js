import httpService from './httpService';

export const getQuestions = async (search, tags, offset, limit, order, filter) => {
    if (search) {
      search = `&search=${search}`;
    }
    
    if (tags && tags.length > 0) {
      tags = `&tags=${tags.join(',')}`;
    }

    return await httpService.get(`/questions/all?offset=${offset}&limit=${limit}&order=${order}&filter=${filter}${search}${tags}`);
};
  
export const getQuestionAndAnswers = async (questionId) => {
    return await httpService.get(`/questions/${questionId}`);
};

export const voteQuestion = async (questionId, voteState) => {
    const data = {
        score: voteState
    }
    return await httpService.put(`/questions/${questionId}/vote`, data)
}

export const deleteQuestion = async (questionId) => {
    return await httpService.delete(`/questions/${questionId}`);
}

export const updateQuestion = async (questionId, data) => {
    return await httpService.put(`/questions/${questionId}`, data);
}

export const selectBestAnswer = async (questionId, answerId) => {
    const data = {
        answerId: answerId
    }
    return await httpService.put(`/questions/${questionId}/select`, data)
}

export const createCommentQuestion = async (questionId, content) => {
    const data = {
        content: content,
    }

    return await httpService.post(`/questions/${questionId}/comments`, data)
}