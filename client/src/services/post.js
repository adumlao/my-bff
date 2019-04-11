import { api } from './api';

export const getPosts = async () => {
  const resp = await api.get('/posts');
  return resp.data.posts;
};


export const createPost = async (id, data) => {
  const resp = await api.post(`/users/${id}/posts`, data);
  return resp.data;
}

export const getUserPosts = async (id) => {
  const resp = await api.get(`/users/${id}/posts`)
  return resp.data;
}

export const updatePosts = async (userId, postId, data) => {
  const resp = await api.put(`/users/${userId}/posts/${postId}`, data)

  return resp.data;
}

export const deletePost = async (userId, postId) => {
  const resp = await api.delete(`/users/${userId}/posts/${postId}`)

  return resp.data;
}

export const getSpecificPost = async (userId, postId) => {
  const resp = await api.get(`/users/${userId}/posts/${postId}`)

  return resp.data;
}
