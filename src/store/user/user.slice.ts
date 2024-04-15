import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace, RequestStatus } from '../../const';
import { AuthStatusType, RequestStatusType, UserType } from '../../types';
import { logoutUser } from '../action';
import { removeToken } from '../../services/token';

export type UserStateType = {
  authStatus: AuthStatusType;
  user: UserType | null;
  usersRadyTrain: UserType[];
  
}

export const userState: UserStateType = {
  authStatus: AuthStatus.Unknown,
  user: null,
  usersRadyTrain: [],
};

export const user = createSlice({
  name: NameSpace.User,
  initialState: userState,
  reducers: {
    updateAuthStatus: (state, {payload}: PayloadAction<AuthStatusType>) => {
      state.authStatus = payload;
    },
    setUser: (state, {payload}: PayloadAction<UserType | null>) => {
      state.user = payload;
    },
    setUsersReadyTrain: (state, {payload}: PayloadAction<UserType[]>) => {
      state.usersRadyTrain = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logoutUser, () => {
        removeToken();
        updateAuthStatus(AuthStatus.NoAuth);
        setUser(null);
      })
  },
});

export const {updateAuthStatus, setUser, setUsersReadyTrain} = user.actions;
