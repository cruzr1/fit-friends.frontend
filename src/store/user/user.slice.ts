import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatus, CATALOG_COUNT, Level, Location, NameSpace, RequestStatus, TrainType, UserRole } from '../../const';
import { AuthStatusType, UserType } from '../../types';
import { logoutUser } from '../action';
import { removeToken } from '../../services/token';

export type UserStateType = {
  authStatus: AuthStatusType;
  user: UserType | null;
  usersReadyTrain: UserType[];
  trainingsCount: number;
  locationFilter: Location[];
  trainTypeFilter: TrainType[];
  levelFilter: Level;
  roleFilter: UserRole;
  usersList: UserType[];
  usersTake: number;
  usersTotalItems: number;
}

export const userState: UserStateType = {
  authStatus: AuthStatus.Unknown,
  user: null,
  usersReadyTrain: [],
  trainingsCount: 0,
  locationFilter:[],
  trainTypeFilter:[],
  levelFilter: Level.Amateur,
  roleFilter: UserRole.Trainer,
  usersList: [],
  usersTake: CATALOG_COUNT,
  usersTotalItems: 0,
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
    setUsersList: (state, {payload}: PayloadAction<UserType[]>) => {
      state.usersList = payload;
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
   setLocationFilter,
   setRoleFilter,
   setLevelFilter,
   setTrainTypeFilter,
   setUsersList,
   setUsersTake,
   setUsersTotalItems,
} = user.actions;
