import { api } from './api';

export const getComments = async () => {
  const resp = await api.get('/comments');
  return resp.data.comments;
};

export const postComments = async (postId, data) => {
  const resp = await api.post(`/posts/${postId}/comments`, data);
  console.log(resp.data);
  return resp.data;
};
