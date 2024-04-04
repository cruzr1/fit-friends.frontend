import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateAuthStatus, setUser } from './user.slice';
import { setRefreshToken, setToken} from '../../services/token';
import { clearErrorAction } from '../error/error.actions';
import { NameSpace, Action, APIPath, AuthStatus, ErrorMessage} from '../../const';
import { StateType, AppDispatchType, UserType, LoggedUserType, SigninType, LoginType } from '../../types';


export const signinUserAction = createAsyncThunk<void, SigninType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.Create}`,
  async (newUser, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.post<UserType>(APIPath.Signin, newUser);
      dispatch(updateAuthStatus(AuthStatus.Auth));
      dispatch(setUser(data));
    } catch (message) {
      dispatch(updateAuthStatus(AuthStatus.NoAuth));
      dispatch(clearErrorAction(`${ErrorMessage.FailedUserSignin}: ${message}`));
    }
  },
);

export const authoriseUserAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.Get}`,
  async (_arg, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.post<UserType>(APIPath.Verify, {});
      dispatch(updateAuthStatus(AuthStatus.Auth));
      dispatch(setUser(data));
    } catch (message) {
      dispatch(updateAuthStatus(AuthStatus.NoAuth));
      dispatch(clearErrorAction(`${ErrorMessage.UserUnauthorised}: ${message}`));
    }
  },
);

export const loginUserAction = createAsyncThunk<void, LoginType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.Login}`,
  async (loginUser, {dispatch, extra: axiosApi}) => {
    try {
      const {data: {accessToken, refreshToken, ...user}} = await axiosApi.post<LoggedUserType>(APIPath.Login, loginUser);
      setToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(updateAuthStatus(AuthStatus.Auth));
      dispatch(setUser(user as UserType));
    } catch (message) {
      dispatch(updateAuthStatus(AuthStatus.NoAuth));
      dispatch(clearErrorAction(`${ErrorMessage.FailedUserLogin}: ${message}`));
    }
  }
);
