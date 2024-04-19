import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatus, CATALOG_COUNT, Level, Location, NameSpace, RequestStatus, TrainType, UserRole } from '../../const';
import { ApplicationType, AuthStatusType, ClientNotificationType, RequestStatusType, UserType } from '../../types';
import { logoutUser } from '../action';
import { removeToken } from '../../services/token';
import { signinUserAction, addToFriendsAction, applyPersonalTrainingAction, authoriseUserAction, useActiveTrainingsAction, loadAuthorApplicationsAction, loadAvailableTrainingsCountAction, updateApplicationAction, loadUserApplicationsAction, loginUserAction, loadUsersReadyTrainAction, updateUserAction, loadUserItemAction, loadUsersListAction, orderTrainingsAction, loadUserFriendsAction, loadNotificationsAction, loadUserItemTrainingsAction, subscribeNotificationsAction} from './user.actions';

export type UserStateType = {
  authStatus: AuthStatusType;
  user: UserType | null;
  userItem: UserType | null;
  usersReadyTrain: UserType[];
  userFriends: UserType[];
  trainingsCount: number;
  locationFilter: Location[];
  trainTypeFilter: TrainType[];
  levelFilter: Level;
  roleFilter: UserRole;
  usersList: UserType[];
  usersTake: number;
  usersTotalItems: number;
  notifications: ClientNotificationType[];
  applicationsList: ApplicationType[];
  updateUserStatus: RequestStatusType;
  loadUsersReadyTrainStatus: RequestStatusType;
  signinUserStatus: RequestStatusType;
  authoriseUserStatus: RequestStatusType;
  loginUserStatus: RequestStatusType;
  orderTrainingsStatus: RequestStatusType;
  loadAvailableTrainingsCountStatus: RequestStatusType;
  useActiveTrainingsStatus: RequestStatusType;
  loadUsersListStatus: RequestStatusType;
  loadUserFriendsStatus: RequestStatusType;
  loadUserItemStatus: RequestStatusType;
  addToFriendsStatus: RequestStatusType;
  applyPersonalTrainingStatus: RequestStatusType;
  subscribeNotificationsStatus: RequestStatusType;
  loadUserItemTrainingsStatus: RequestStatusType;
  loadUserApplicationsStatus: RequestStatusType;
  loadAuthorApplicationsStatus: RequestStatusType;
  updateApplicationStatus: RequestStatusType;
  loadNotificationsStatus: RequestStatusType;
}

export const userState: UserStateType = {
  authStatus: AuthStatus.Unknown,
  user: null,
  userItem: null,
  usersReadyTrain: [],
  userFriends: [],
  trainingsCount: 0,
  locationFilter:[],
  trainTypeFilter:[],
  levelFilter: Level.Amateur,
  roleFilter: UserRole.Trainer,
  usersList: [],
  notifications: [],
  usersTake: CATALOG_COUNT,
  usersTotalItems: 0,
  applicationsList: [],
  updateUserStatus: RequestStatus.Idle,
  loadUsersReadyTrainStatus: RequestStatus.Idle,
  signinUserStatus: RequestStatus.Idle,
  authoriseUserStatus: RequestStatus.Idle,
  loginUserStatus: RequestStatus.Idle,
  orderTrainingsStatus: RequestStatus.Idle,
  loadAvailableTrainingsCountStatus: RequestStatus.Idle,
  useActiveTrainingsStatus: RequestStatus.Idle,
  loadUsersListStatus: RequestStatus.Idle,
  loadUserFriendsStatus: RequestStatus.Idle,
  loadUserItemStatus: RequestStatus.Idle,
  addToFriendsStatus: RequestStatus.Idle,
  applyPersonalTrainingStatus: RequestStatus.Idle,
  subscribeNotificationsStatus: RequestStatus.Idle,
  loadUserItemTrainingsStatus: RequestStatus.Idle,
  loadUserApplicationsStatus: RequestStatus.Idle,
  loadAuthorApplicationsStatus: RequestStatus.Idle,
  updateApplicationStatus: RequestStatus.Idle,
  loadNotificationsStatus: RequestStatus.Idle,
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
    setUserItem: (state, {payload}: PayloadAction<UserType | null>) => {
      state.userItem = payload;
    },
    setUsersReadyTrain: (state, {payload}: PayloadAction<UserType[]>) => {
      state.usersReadyTrain = payload;
    },
    setUserFriends: (state, {payload}: PayloadAction<UserType[]>) => {
      state.userFriends = payload;
    },
    setUsersList: (state, {payload}: PayloadAction<UserType[]>) => {
      state.usersList = payload;
    },
    setNotifications: (state, {payload}: PayloadAction<ClientNotificationType[]>) => {
      state.notifications = payload;
    },
    setTrainingsCount: (state, {payload}: PayloadAction<number>) => {
      state.trainingsCount = payload;
    },
    setLocationFilter: (state, {payload}: PayloadAction<Location>) => {
      if (state.locationFilter.includes(payload)) {
        state.locationFilter = state.locationFilter.filter((location) => location !== payload);
      } else {
        state.locationFilter =  state.locationFilter.concat(payload);
      }
    },
    setTrainTypeFilter: (state, {payload}: PayloadAction<TrainType>) => {
      if (state.trainTypeFilter.includes(payload)) {
        state.trainTypeFilter = state.trainTypeFilter.filter((type) => type !== payload);
      } else {
        state.trainTypeFilter =  state.trainTypeFilter.concat(payload);
      }
    },
    setLevelFilter: (state, {payload}: PayloadAction<Level>) => {
      state.levelFilter = payload;
    },
    setRoleFilter: (state, {payload}: PayloadAction<UserRole>) => {
      state.roleFilter = payload;
    },
    setUsersTake: (state, {payload}: PayloadAction<number>) => {
      state.usersTake = payload;
    },
    setUsersTotalItems: (state, {payload}: PayloadAction<number>) => {
      state.usersTotalItems = payload;
    },
    setApplicationsList: (state, {payload}: PayloadAction<ApplicationType[]>) => {
      state.applicationsList = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logoutUser, () => {
        removeToken();
        updateAuthStatus(AuthStatus.NoAuth);
        setUser(null);
      })
      .addCase(loadUsersReadyTrainAction.pending, (state) => {
        state.loadUsersReadyTrainStatus = RequestStatus.Pending;
      })
      .addCase(signinUserAction.pending, (state) => {
        state.signinUserStatus = RequestStatus.Pending;
      })
      .addCase(authoriseUserAction.pending, (state) => {
        state.authoriseUserStatus = RequestStatus.Pending;
      })
      .addCase(loginUserAction.pending, (state) => {
        state.loginUserStatus = RequestStatus.Pending;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.updateUserStatus = RequestStatus.Pending;
      })
      .addCase(orderTrainingsAction.pending, (state) => {
        state.orderTrainingsStatus = RequestStatus.Pending;
      })
      .addCase(loadAvailableTrainingsCountAction.pending, (state) => {
        state.loadAvailableTrainingsCountStatus = RequestStatus.Pending;
      })
      .addCase(useActiveTrainingsAction.pending, (state) => {
        state.useActiveTrainingsStatus = RequestStatus.Pending;
      })
      .addCase(loadUsersListAction.pending, (state) => {
        state.loadUsersListStatus = RequestStatus.Pending;
      })
      .addCase(loadUserFriendsAction.pending, (state) => {
        state.loadUserFriendsStatus = RequestStatus.Pending;
      })
      .addCase(loadUserItemAction.pending, (state) => {
        state.loadUserItemStatus = RequestStatus.Pending;
      })
      .addCase(addToFriendsAction.pending, (state) => {
        state.addToFriendsStatus = RequestStatus.Pending;
      })
      .addCase(applyPersonalTrainingAction.pending, (state) => {
        state.applyPersonalTrainingStatus = RequestStatus.Pending;
      })
      .addCase(subscribeNotificationsAction.pending, (state) => {
        state.subscribeNotificationsStatus = RequestStatus.Pending;
      })
      .addCase(loadUserItemTrainingsAction.pending, (state) => {
        state.loadUserItemTrainingsStatus = RequestStatus.Pending;
      })
      .addCase(loadUserApplicationsAction.pending, (state) => {
        state.loadUserApplicationsStatus = RequestStatus.Pending;
      })
      .addCase(loadAuthorApplicationsAction.pending, (state) => {
        state.loadAuthorApplicationsStatus = RequestStatus.Pending;
      })
      .addCase(updateApplicationAction.pending, (state) => {
        state.updateApplicationStatus = RequestStatus.Pending;
      })
      .addCase(loadNotificationsAction.pending, (state) => {
        state.loadNotificationsStatus = RequestStatus.Pending;
      })
      .addCase(loadUsersReadyTrainAction.rejected, (state) => {
        state.loadUsersReadyTrainStatus = RequestStatus.Rejected;
      })
      .addCase(signinUserAction.rejected, (state) => {
        state.signinUserStatus = RequestStatus.Rejected;
      })
      .addCase(authoriseUserAction.rejected, (state) => {
        state.authoriseUserStatus = RequestStatus.Rejected;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.loginUserStatus = RequestStatus.Rejected;
      })
      .addCase(updateUserAction.rejected, (state) => {
        state.updateUserStatus = RequestStatus.Rejected;
      })
      .addCase(orderTrainingsAction.rejected, (state) => {
        state.orderTrainingsStatus = RequestStatus.Rejected;
      })
      .addCase(loadAvailableTrainingsCountAction.rejected, (state) => {
        state.loadAvailableTrainingsCountStatus = RequestStatus.Rejected;
      })
      .addCase(useActiveTrainingsAction.rejected, (state) => {
        state.useActiveTrainingsStatus = RequestStatus.Rejected;
      })
      .addCase(loadUsersListAction.rejected, (state) => {
        state.loadUsersListStatus = RequestStatus.Rejected;
      })
      .addCase(loadUserFriendsAction.rejected, (state) => {
        state.loadUserFriendsStatus = RequestStatus.Rejected;
      })
      .addCase(loadUserItemAction.rejected, (state) => {
        state.loadUserItemStatus = RequestStatus.Rejected;
      })
      .addCase(addToFriendsAction.rejected, (state) => {
        state.addToFriendsStatus = RequestStatus.Rejected;
      })
      .addCase(applyPersonalTrainingAction.rejected, (state) => {
        state.applyPersonalTrainingStatus = RequestStatus.Rejected;
      })
      .addCase(subscribeNotificationsAction.rejected, (state) => {
        state.subscribeNotificationsStatus = RequestStatus.Rejected;
      })
      .addCase(loadUserItemTrainingsAction.rejected, (state) => {
        state.loadUserItemTrainingsStatus = RequestStatus.Rejected;
      })
      .addCase(loadUserApplicationsAction.rejected, (state) => {
        state.loadUserApplicationsStatus = RequestStatus.Rejected;
      })
      .addCase(loadAuthorApplicationsAction.rejected, (state) => {
        state.loadAuthorApplicationsStatus = RequestStatus.Rejected;
      })
      .addCase(updateApplicationAction.rejected, (state) => {
        state.updateApplicationStatus = RequestStatus.Rejected;
      })
      .addCase(loadNotificationsAction.rejected, (state) => {
        state.loadNotificationsStatus = RequestStatus.Rejected;
      })
      .addCase(loadUsersReadyTrainAction.fulfilled, (state) => {
        state.loadUsersReadyTrainStatus = RequestStatus.Fulfilled;
      })
      .addCase(signinUserAction.fulfilled, (state) => {
        state.signinUserStatus = RequestStatus.Fulfilled;
      })
      .addCase(authoriseUserAction.fulfilled, (state) => {
        state.authoriseUserStatus = RequestStatus.Fulfilled;
      })
      .addCase(loginUserAction.fulfilled, (state) => {
        state.loginUserStatus = RequestStatus.Fulfilled;
      })
      .addCase(updateUserAction.fulfilled, (state) => {
        state.updateUserStatus = RequestStatus.Fulfilled;
      })
      .addCase(orderTrainingsAction.fulfilled, (state) => {
        state.orderTrainingsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadAvailableTrainingsCountAction.fulfilled, (state) => {
        state.loadAvailableTrainingsCountStatus = RequestStatus.Fulfilled;
      })
      .addCase(useActiveTrainingsAction.fulfilled, (state) => {
        state.useActiveTrainingsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadUsersListAction.fulfilled, (state) => {
        state.loadUsersListStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadUserFriendsAction.fulfilled, (state) => {
        state.loadUserFriendsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadUserItemAction.fulfilled, (state) => {
        state.loadUserItemStatus = RequestStatus.Fulfilled;
      })
      .addCase(addToFriendsAction.fulfilled, (state) => {
        state.addToFriendsStatus = RequestStatus.Fulfilled;
      })
      .addCase(applyPersonalTrainingAction.fulfilled, (state) => {
        state.applyPersonalTrainingStatus = RequestStatus.Fulfilled;
      })
      .addCase(subscribeNotificationsAction.fulfilled, (state) => {
        state.subscribeNotificationsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadUserItemTrainingsAction.fulfilled, (state) => {
        state.loadUserItemTrainingsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadUserApplicationsAction.fulfilled, (state) => {
        state.loadUserApplicationsStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadAuthorApplicationsAction.fulfilled, (state) => {
        state.loadAuthorApplicationsStatus = RequestStatus.Fulfilled;
      })
      .addCase(updateApplicationAction.fulfilled, (state) => {
        state.updateApplicationStatus = RequestStatus.Fulfilled;
      })
      .addCase(loadNotificationsAction.fulfilled, (state) => {
        state.loadNotificationsStatus = RequestStatus.Fulfilled;
      })
  },
});

export const {
  updateAuthStatus,
   setUser,
   setUsersReadyTrain,
   setTrainingsCount,
   setLocationFilter,
   setRoleFilter,
   setLevelFilter,
   setTrainTypeFilter,
   setUsersList,
   setUsersTake,
   setUsersTotalItems,
   setUserItem,
   setUserFriends,
   setApplicationsList,
   setNotifications,
} = user.actions;
