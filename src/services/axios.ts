import axios, { AxiosInstance, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com',
    headers: {
      "Content-Type": "application/json",
    },
  });

const responseHandler = (response: AxiosResponse) => response.data;
instance.interceptors.response.use(responseHandler);

export default instance;
