import axios from "../services/axios";

export type CreateProductBody = {
  title: string;
  description: string;
  image: string
}

export const getAllProducts = () => {
  return axios.get('/products');
}

export const createProduct = (body: CreateProductBody) => {
  return axios.post('/products', body)
}

export const deleteProduct = (id: number) => {
  return axios.delete(`/products/${id}`)
}

export const getProduct = (id: number) => {
  return axios.get(`/products/${id}`)
}