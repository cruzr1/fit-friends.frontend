import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateAuthStatus, setUser } from './user.slice';
import { setRefreshToken, setToken} from '../../services/token';
import { clearErrorAction } from '../error/error.actions';
import { NameSpace, Action, APIPath, AuthStatus, ErrorMessage, AppRoute, UserRole } from '../../const';
import { StateType, AppDispatchType, UserType, LoggedUserType, SigninType, LoginType, UpdateUserType } from '../../types';
import { redirect } from '../middlewares/redirect';
import { redirectToRoute } from '../action';



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
      const {data: {accessToken, refreshToken, ...user}} = await axiosApi.post<LoggedUserType>(APIPath.Signin, newUser);
      dispatch(updateAuthStatus(AuthStatus.Signed));
      dispatch(setUser(user));
      setToken(accessToken);
      setRefreshToken(refreshToken);
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

export const updateUserAction = createAsyncThunk<void, UpdateUserType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>(
  `${NameSpace.User}/${Action.Update}`,
  async (updateUser, {dispatch, extra: axiosApi}) => {
    try {
      const {data} = await axiosApi.patch<UserType>(APIPath.Update, updateUser);
      dispatch(setUser(data));
      const newRoute = data.role === UserRole.Trainer ? AppRoute.PersonalAccountCoach : AppRoute.Main;
      dispatch(redirectToRoute(newRoute));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedUserUpdate}: ${message}`));
      console.log(message);
    }
  }
);
