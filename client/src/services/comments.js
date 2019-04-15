import { api } from './api';

export const getComments = async () => {
  const resp = await api.get('/comments');
  return resp.data.comments;
};
