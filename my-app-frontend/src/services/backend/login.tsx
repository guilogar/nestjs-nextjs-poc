import { getApi } from './base';

export const login = async (body: object = {}) => {
  const api = getApi();
  const { data } = await api.post('/login', body);
  return data.token;
};
