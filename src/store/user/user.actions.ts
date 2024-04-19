import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateAuthStatus, setUser, setUsersReadyTrain, setTrainingsCount, setUsersList, setUsersTotalItems, setUsersTake, setUserItem, setUserFriends, setApplicationsList, setNotifications } from './user.slice';
import { setRefreshToken, setToken} from '../../services/token';
import { clearErrorAction } from '../error/error.actions';
import { NameSpace, Action, APIPath, AuthStatus, ErrorMessage, UserRole, USERS_READY_TRAIN, CATALOG_COUNT } from '../../const';
import { StateType, AppDispatchType, UserType, LoggedUserType, SigninType, LoginType, UpdateUserType, EntitiesWithPaginationType, CreateOrderType, OrderType, AccountType, QueryUsersType, ApplicationType, TrainingType, UpdateApplicationParams, ServerNotificationType } from '../../types';
import { setTrainingsList } from '../training/training.slice';
import { adaptNotifications } from '../../adapters/adapt-to-client';

export const loadUsersReadyTrainAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadUsersReadyTrain}`,
  async (_arg, {dispatch, extra: axiosApi}) => {
    try {
      const {data: {entities}} = await axiosApi.get<EntitiesWithPaginationType<UserType>>(APIPath.Users.Index, {
        params: {
          take: USERS_READY_TRAIN,
          role: UserRole.User,
          isReadyTrain: true,
        }
      });
      dispatch(setUsersReadyTrain(entities));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadUserReadyTrain}: ${message}`));
    }
  },
);

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
      const {data: {accessToken, refreshToken, ...user}} = await axiosApi.post<LoggedUserType>(APIPath.Users.Signin, newUser);
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
      const {data} = await axiosApi.post<UserType>(APIPath.Users.Verify, {});
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
      const {data: {accessToken, refreshToken, ...user}} = await axiosApi.post<LoggedUserType>(APIPath.Users.Login, loginUser);
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
      const {data} = await axiosApi.patch<UserType>(APIPath.Users.Update, updateUser);
      dispatch(setUser(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedUserUpdate}: ${message}`));
    }
  }
);

export const orderTrainingsAction = createAsyncThunk<void, CreateOrderType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.OrderTrainings}`,
  async (order, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.post<OrderType>(`${APIPath.Orders.Index}`, order);
      dispatch(loadAvailableTrainingsCountAction(data.trainingId));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedOrderTrainings}: ${message}`));
    }
  }
)

export const loadAvailableTrainingsCountAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadAvailableTrainingsCount}`,
  async (trainingId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<AccountType>(`${APIPath.Accounts.Index}/${trainingId}`);
      dispatch(setTrainingsCount(data.trainingsActive || 0));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadAvailableTrainings}: ${message}`));
    }
  }
)

export const useActiveTrainingsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.UseActiveTrainings}`,
  async (trainingId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.patch<AccountType>(`${APIPath.Accounts.Use}`, {trainingId, trainingsCount: 1});
      dispatch(setTrainingsCount(data.trainingsActive || 0));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedUseActiveTrainings}: ${message}`));
    }
  }
)

export const loadUsersListAction = createAsyncThunk<void, QueryUsersType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadUsersList}`,
  async (query, {dispatch, extra: axiosApi}) => {
    try {
      const { data: { entities, totalItems } } = await axiosApi.get<EntitiesWithPaginationType<UserType>>(`${APIPath.Users.Index}`, {
        params: {
          ...query
        }
      });
      dispatch(setUsersList(entities));
      dispatch(setUsersTotalItems(totalItems));
      if (totalItems <= query.take) {
        dispatch(setUsersTake(CATALOG_COUNT));
      }
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadUsersList}: ${message}`));
    }
  }
)

export const loadUserFriendsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadUserFriends}`,
  async (take, {dispatch, extra: axiosApi}) => {
    try {
      const { data: { entities, totalItems } } = await axiosApi.get<EntitiesWithPaginationType<UserType>>(`${APIPath.Users.Friends}`, {
        params: {take}
      });
      dispatch(setUserFriends(entities));
      dispatch(setUsersTotalItems(totalItems));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadUserFriends}: ${message}`));
    }
  }
)

export const loadUserItemAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadUserItem}`,
  async (userId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<UserType>(`${APIPath.Users.Old}/${userId}`);
      dispatch(setUserItem(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadUserItem}: ${message}`));
    }
  }
)

export const addToFriendsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.AddToFriends}`,
  async (userId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<UserType>(`${APIPath.Users.Friends}/${userId}`);
      dispatch(setUser(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedAddToFriend}: ${message}`));
    }
  }
)

export const applyPersonalTrainingAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.ApplyPersonalTraining}`,
  async (userId, {dispatch, extra: axiosApi}) => {
    try {
      await axiosApi.post<ApplicationType>(`${APIPath.Applications.Index}/${userId}`);
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedApplyPersonalTraining}: ${message}`));
    }
  }
)

export const subscribeNotificationsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.SubscribeNotifications}`,
  async (userId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<UserType>(`${APIPath.Users.Subscribe}/${userId}`);
      dispatch(setUser(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedSubscribeNotifications}: ${message}`));
    }
  }
)

export const loadUserItemTrainingsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadUserItemTrainings}`,
  async (userItemId, {dispatch, extra: axiosApi}) => {
    try {
      const { data: { entities } } = await axiosApi.get<EntitiesWithPaginationType<TrainingType>>(`${APIPath.Trainings.Trainer}/${userItemId}`);
      dispatch(setTrainingsList(entities));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadUserItemTrainings}: ${message}`));
    }
  }
)

export const loadUserApplicationsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadUserApplications}`,
  async (userId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<ApplicationType[]>(`${APIPath.Applications.List}/${userId}`);
      dispatch(setApplicationsList(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadUserApplications}: ${message}`));
    }
  }
)

export const loadAuthorApplicationsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadAuthorApplications}`,
  async (userId, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<ApplicationType[]>(`${APIPath.Applications.Author}/${userId}`);
      dispatch(setApplicationsList(data));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadAuthorApplications}: ${message}`));
    }
  }
)

export const updateApplicationAction = createAsyncThunk<void, UpdateApplicationParams, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.UpdateApplication}`,
  async ({applicationStatus, applicationId, userId}, {dispatch, extra: axiosApi}) => {
    try {
      await axiosApi.patch<ApplicationType[]>(`${APIPath.Applications.Index}/${applicationId}`, {
        status: applicationStatus,
      });
      dispatch(loadUserApplicationsAction(userId));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedUpdateApplication}: ${message}`));
    }
  }
)

export const loadNotificationsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
  }
>
(
  `${NameSpace.User}/${Action.LoadNotifications}`,
  async (_arg, {dispatch, extra: axiosApi}) => {
    try {
      const { data } = await axiosApi.get<ServerNotificationType[]>(APIPath.Notifications.Index);
      const clientNotifications = data.map((notification) => adaptNotifications(notification))
      dispatch(setNotifications(clientNotifications));
    } catch (message) {
      dispatch(clearErrorAction(`${ErrorMessage.FailedLoadNotifications}: ${message}`));
    }
  }
)
