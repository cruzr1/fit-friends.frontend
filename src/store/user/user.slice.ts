import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { AuthStatusType } from '../../types';
import { logoutUser } from '../action';
import { removeToken } from '../../services/token';

export type UserStateType = {
  email: string;
  authStatus: AuthStatusType;
}

export const userState: UserStateType = {
  email: '',
  authStatus: AuthStatus.Unknown
};

export const user = createSlice({
  name: NameSpace.User,
  initialState: userState,
  reducers: {
    updateAuthStatus: (state, {payload}: PayloadAction<AuthStatusType>) => {
      state.authStatus = payload;
    },
    setEmail: (state, {payload}: PayloadAction<string>) => {
      state.email = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(logoutUser, () => {
        removeToken();
        updateAuthStatus(AuthStatus.NoAuth);
        setEmail('');
      })
  },
});

export const {updateAuthStatus, setEmail} = user.actions;
