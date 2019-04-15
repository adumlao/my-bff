import { api } from './api';

export const getComments = async(postId) => {
  const resp = await api.get(`/posts/${id}/comments`)
  return resp.data;
}
