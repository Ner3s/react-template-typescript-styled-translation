import axios, { CancelTokenSource } from 'axios';

const api = axios.create({
  baseURL: `SUA_API_AQUI/v1`,
});

export const getToken = (): CancelTokenSource => axios.CancelToken.source();

export default api;
