import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export const dummyApi = {
  // Produtos
  getProducts: async (limit: number = 10, skip: number = 0) => {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
  },
  
  // Usuários
  getUsers: async (limit: number = 10, skip: number = 0) => {
    const response = await api.get(`/users?limit=${limit}&skip=${skip}`);
    return response.data;
  },
  
  // Todos
  getTodos: async (limit: number = 10, skip: number = 0) => {
    const response = await api.get(`/todos?limit=${limit}&skip=${skip}`);
    return response.data;
  },
  
  // Teste da API
  testApi: async () => {
    const response = await api.get('/test');
    return response.data;
  },
};