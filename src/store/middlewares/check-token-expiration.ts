import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer';
import { getToken } from '../../services/token';
import { jwtDecode } from 'jwt-decode';

type Reducer = ReturnType<typeof rootReducer>;

export const checkTokenExpiration: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        const token = getToken();
        if(token) {
          const expired = jwtDecode(token).exp;
          if (expired! < Date.now() / 1000) {
            localStorage.clear();
          }
        }
        next(action);
};
