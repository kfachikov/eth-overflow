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

httpService.interceptors.request.use(attachToken);

export default httpService;