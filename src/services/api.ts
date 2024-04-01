import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { BASE_URL, REQUEST_TIMEOUT, } from '../const';


type DetailMessageType = {
  type: string;
  message: string;
}

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (config.headers)
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    ({response}: AxiosError<DetailMessageType>) => {
      throw response?.data.message;
    }
  );

  return api;
};
