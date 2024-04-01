import { AUTH_TOKEN_KEY } from '../const';


export const setToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ?? '';
};

export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
