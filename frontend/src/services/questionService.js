import { questions } from '../Mock/questions';

export const getQuestions = (offset, limit) => {  
    // Slice the array to simulate pagination
    const paginatedQuestions = questions.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
    return paginatedQuestions;
};
  