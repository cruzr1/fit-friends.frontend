import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { error } from './error/error.slice';
import { user } from './user/user.slice';


export const rootReducer = combineReducers({
  [NameSpace.User]: user.reducer,
  [NameSpace.Error]: error.reducer,
});
