import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { AppRoute, BASE_URL, REQUEST_TIMEOUT, } from '../const';
import { StatusCodes } from 'http-status-codes';
import { redirectToRoute } from '../store/action';


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
      if (config.headers) {
        if (token && config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    ({response}: AxiosError<DetailMessageType>) => {
      if (response && response.status === StatusCodes.UNAUTHORIZED) {
        redirectToRoute(AppRoute.Index);
      }
      throw response?.data.message;
    }
  );

  return api;
};
