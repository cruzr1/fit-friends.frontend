import { StateType } from '../../types';
import { NameSpace } from '../../const';

export const selectUser = (state: StateType) => state[NameSpace.User].user;
export const selectUserAuthStatus = (state: StateType) => state[NameSpace.User].authStatus;
