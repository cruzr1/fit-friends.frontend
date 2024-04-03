import { StateType } from '../../types';
import { NameSpace } from '../../const';

export const selectEmail = (state: StateType) => state[NameSpace.User].email;
export const selectUserAuthStatus = (state: StateType) => state[NameSpace.User].authStatus;
