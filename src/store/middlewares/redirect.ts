import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import { rootReducer } from '../root-reducer';
import { Action, NameSpace } from '../../const';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === `${NameSpace.Route}/${Action.Redirect}`) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
