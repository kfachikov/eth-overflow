import axios from 'axios';
import { API_URL } from '../constants';

const httpService = axios.create({
  baseURL: API_URL,
});

export const attachToken = (request) => {
  const token = localStorage.getItem('access_token');
  request.headers.Authorization = token ? `Bearer ${token}` : '';
  return request;
};

export const setAccessToken = (response) => {
  console.log(response);
  let token = response.headers.Authorization;
  token = token ? token.split(' ')[1] : null;

  localStorage.setItem('access_token', token);
  return response;
};

httpService.interceptors.response.use(setAccessToken);
httpService.interceptors.request.use(attachToken);

export default httpService;