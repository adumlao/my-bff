import { api, updateToken } from './api';

export const registerUser = async (user) => {
  const { email, password } = user;
  const name = user.name;

  const resp = await api.post('/users/', {
    email,
    password,
    name
  });

  const { data } = resp;

  updateToken(data.token);
  return data;
};

export const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  if (token === null) {
    return false;
  } else {

    try {
      const resp = await api.get('/users/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      updateToken(token);
      return resp.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export const loginUser = async ({ email, password }) => {
  const resp = await api.post('/users/login', {
    email,
    password
  });
  const data = resp.data;

  updateToken(data.token);
  return data;
}

export const getAllUsers = async () => {
  const resp = await api.get(`/users/`);
  return resp.data;
};

export const getUser = async (id) => {
  const resp = await api.get(`/users/${id}`);
  return resp.data;
};

export const updateUser = async (id, data) => {
  const resp = await api.put(`/users/${id}`, data);
  return resp.data;
}
