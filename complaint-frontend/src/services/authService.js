import API from './api'; // Axios instance with baseURL

export const login = async ({ email, password }) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data.token; // ✅ Only return the token string
};

export const register = async (userData) => {
  const res = await API.post('/auth/register', userData);
  return res.data; // Can be a success message
};
