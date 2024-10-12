import httpService from './httpService';

export const getQuestions = async (search, offset, limit) => {
    if (search) {
      search = `&search=${search}`;
    }
    return await httpService.get(`/questions/all?offset=${offset}&limit=${limit}${search}`);
};
  