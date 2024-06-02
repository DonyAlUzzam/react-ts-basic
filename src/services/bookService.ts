import api from './api';
import { Book } from '../services/types'; 


const prefix = '/books';

export const fetchBook = async () => {
  const response = await api.get(`${prefix}/list`);
  return response.data;
};

export const fetchOneBook = async (id: number) => {
    const response = await api.get(`${prefix}/find?id=${id}`);
    return response.data;
  };

export const createBook = async (book: any) => {
  const response = await api.post(`${prefix}/create`, book);
  return response.data;
};

export const updateBook = async (id: number, bookData: Book) => {
  const response = await api.put(`${prefix}/update?id=${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: number) => {
  const response = await api.delete(`${prefix}/delete?id=${id}`);
  return response.data;
};
