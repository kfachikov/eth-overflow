import httpService from "./httpService";

export const voteAnswer = async (answerId, voteState) => {
  const data = {
    score: voteState,
  };
  return await httpService.put(`/answers/${answerId}/vote`, data);
};

export const editAnswer = async (questionId, answerId, updatedContent) => {
  const data = {
    content: updatedContent,
  };
  console.log("POLUDQVAM " + data);
  return await httpService.put(
    `questions/${questionId}/answers/${answerId}`,
    data
  );
};

export const postAnswer = async (questionId, content) => {
  const data = {
    content: content,
  };
  return await httpService.post(`/questions/${questionId}/answers`, data);
};

export const createCommentAnswer = async (answerId, content) => {
    const data = {
        content: content,
    }

    return await httpService.post(`/answers/${answerId}/comments`, data)
}

export const getComments = async (answerId) => {
    return await httpService.get(`/answers/${answerId}/comments`)
}
