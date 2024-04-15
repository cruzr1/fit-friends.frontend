import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace, RequestStatus } from '../../const';
import { AuthStatusType, RequestStatusType, UserType } from '../../types';
import { logoutUser } from '../action';
import { removeToken } from '../../services/token';

export type UserStateType = {
  authStatus: AuthStatusType;
  user: UserType | null;
  usersReadyTrain: UserType[];
  trainingsCount: number;
}

export const userState: UserStateType = {
  authStatus: AuthStatus.Unknown,
  user: null,
  usersReadyTrain: [],
  trainingsCount: 0,
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
      state.usersReadyTrain = payload;
    },
    setTrainingsCount: (state, {payload}: PayloadAction<number>) => {
      state.trainingsCount = payload;
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

export const {
  updateAuthStatus,
   setUser,
   setUsersReadyTrain,
   setTrainingsCount,
} = user.actions;
