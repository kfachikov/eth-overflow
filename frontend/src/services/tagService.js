import httpService from './httpService';

export const getTags = async () => {
    return await httpService.get('/tags');
};
  
export const createTag = async (data) => {
    return await httpService.post('/tags', data);
}