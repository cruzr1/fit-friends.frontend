import {createAction} from '@reduxjs/toolkit';
import { Action, NameSpace } from '../const';
import { AppRouteType } from '../types';

export const redirectToRoute = createAction<AppRouteType>(`${NameSpace.Route}/${Action.Redirect}`);

export const logoutUser = createAction<void>(`${NameSpace.User}/${Action.Logout}`)


