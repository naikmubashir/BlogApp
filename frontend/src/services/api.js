import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const getPosts = () => api.get('/posts');
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (postData) => api.post('/posts', postData);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export const registerUser = (userData) => api.post('/users/signup', userData);
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const logoutUser = (credentials) => api.post('/users/logout', credentials);
export const isLoggedIn = () => api.get('/isLoggedIn');

export default api;