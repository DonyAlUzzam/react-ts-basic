import api from './api';

const prefix = '/categories';

export const fetchCategory = async () => {
  const response = await api.get(`${prefix}/list`);
  return response.data;
};

export const fetchOneCategory = async (id: number) => {
    const response = await api.get(`${prefix}/find?id=${id}`);
    return response.data;
  };

export const createCategory = async (category: any) => {
  const response = await api.post(`${prefix}/create`, category);
  return response.data;
};

export const updateCategory = async (id: number, category: any) => {
  const response = await api.put(`${prefix}/update?id=${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`${prefix}/delete?id=${id}`);
  return response.data;
};
