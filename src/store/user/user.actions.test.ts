import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createApi } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AccountType, AppThunkDispatchType, ApplicationType, CreateOrderType, EntitiesWithPaginationType, LoggedUserType, LoginType, OrderType, QueryUsersType, ServerNotificationType, SigninType, StateType, TrainingType, UpdateApplicationParams, UpdateUserType, UserType } from '../../types';
import { StatusCodes } from 'http-status-codes';
import { APIPath, ApplicationStatus,Level, Location, NULL_VALUE, NotifyStatus, OrderPayment, Payment, TrainType, USERS_READY_TRAIN, UserRole} from '../../const';
import { setError } from '../error/error.slice';
import { clearErrorAction } from '../error/error.actions';
import { MOCK_TRAININGS as trainings } from '../../mocks/mock-trainings';
import { MOCK_APPLICATIONS as applications } from '../../mocks/mock-applications';
import { MOCK_NOTIFICATIONS as notifications } from '../../mocks/mock-notifications';
import { MOCK_USERS as users } from '../../mocks/mock-users';
import { addToFriendsAction, applyPersonalTrainingAction, authoriseUserAction, loadAuthorApplicationsAction, loadAvailableTrainingsCountAction, loadNotificationsAction, loadUserApplicationsAction, loadUserFriendsAction, loadUserItemAction, loadUserItemTrainingsAction, loadUsersListAction, loadUsersReadyTrainAction, loginUserAction, orderTrainingsAction, signinUserAction, subscribeNotificationsAction, updateApplicationAction, updateUserAction } from './user.actions';
import { setApplicationsList, setNotifications, setTrainingsCount, setUser, setUserFriends, setUserItem, setUsersList, setUsersReadyTrain, setUsersTake, setUsersTotalItems, updateAuthStatus } from './user.slice';
import { setTrainingsList } from '../training/training.slice';

describe('Async user actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const adaptApplications = (applicationsList: typeof applications) => applicationsList.map((application) => ({
    ...application,
    updatedAt: new Date(application.updatedAt),
    status: application.status as ApplicationStatus,
  }));
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatchType>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const paginatedUsers = {
    entities: users as UserType[],
    totalPages: NULL_VALUE,
    currentPage: NULL_VALUE,
    totalItems: NULL_VALUE,
  };
  const paginatedTrainings = {
    entities: trainings as TrainingType[],
    totalPages: NULL_VALUE,
    currentPage: NULL_VALUE,
    totalItems: NULL_VALUE,
  };
  const SAMPLE_PASSWORD = 'ZAQ123$%^';
  const mockUser = users[NULL_VALUE] as UserType;
  const mockTraining = trainings[NULL_VALUE] as TrainingType;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('loadUsersReadyTrainAction', () => {
    const mockQuery = {
      take: USERS_READY_TRAIN,
      role: UserRole.User,
      isReadyTrain: true,
    };
    it('should dispatch "loadUsersReadyTrainAction.pending", "setUsersReadyTrain", "loadUsersReadyTrainAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(APIPath.Users.Index, {params: mockQuery}).reply<EntitiesWithPaginationType<UserType>>(StatusCodes.OK, paginatedUsers);
      await store.dispatch(loadUsersReadyTrainAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setUsersReadyTrain>;
      expect(actionTypes).toEqual([
        loadUsersReadyTrainAction.pending.type,
        setUsersReadyTrain.type,
        loadUsersReadyTrainAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedUsers.entities);
    });

    it('should dispatch "loadUsersReadyTrainAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadUsersReadyTrainAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(APIPath.Users.Index, {params: mockQuery}).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadUsersReadyTrainAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadUsersReadyTrainAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadUsersReadyTrainAction.fulfilled.type,
      ]);
    });
  });

  describe('signinUserAction', () => {
    const {name, email, avatar, gender, birthDate, role, description, location, backgroundImage} = mockUser;
    const mockNewUser: SigninType = {
      name,
      email,
      avatar,
      gender,
      birthDate,
      role,
      description,
      location,
      backgroundImage,
      password: SAMPLE_PASSWORD
    };
    const mockReply: LoggedUserType = {
      ...mockUser,
      accessToken: crypto.randomUUID(),
      refreshToken: crypto.randomUUID()
    };
    it('should dispatch "signinUserAction.pending", "updateAuthStatus", "setUser", "signinUserAction.fulfilled", when server responds 201', async () => {
      mockApi.onPost(APIPath.Users.Signin, mockNewUser).reply<LoggedUserType>(StatusCodes.CREATED, mockReply);
      await store.dispatch(signinUserAction(mockNewUser));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(2) as ReturnType<typeof setUser>;
      expect(actionTypes).toEqual([
        signinUserAction.pending.type,
        updateAuthStatus.type,
        setUser.type,
        signinUserAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "signinUserAction.pending", "updateAuthStatus.type", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "signinUserAction.fulfilled", when server responds 400', async () => {
      mockApi.onPost(APIPath.Users.Signin, mockNewUser).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(signinUserAction(mockNewUser));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        signinUserAction.pending.type,
        updateAuthStatus.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        signinUserAction.fulfilled.type,
      ]);
    });
  });

  describe('authoriseUserAction', () => {
    it('should dispatch "authoriseUserAction.pending", "updateAuthStatus", "setUser", "authoriseUserAction.fulfilled", when server responds 200', async () => {
      mockApi.onPost(APIPath.Users.Verify, {}).reply<UserType>(StatusCodes.OK, mockUser);
      await store.dispatch(authoriseUserAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(2) as ReturnType<typeof setUser>;
      expect(actionTypes).toEqual([
        authoriseUserAction.pending.type,
        updateAuthStatus.type,
        setUser.type,
        authoriseUserAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "authoriseUserAction.pending", "updateAuthStatus", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "authoriseUserAction.fulfilled", when server responds 400', async () => {
      mockApi.onPost(APIPath.Users.Verify, {}).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(authoriseUserAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        authoriseUserAction.pending.type,
        updateAuthStatus.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        authoriseUserAction.fulfilled.type,
      ]);
    });
  });

  describe('loginUserAction', () => {
    const mockLoginUser: LoginType = {
      email: mockUser.email,
      password: SAMPLE_PASSWORD,
    };
    const mockReply: LoggedUserType = {
      ...mockUser,
      accessToken: crypto.randomUUID(),
      refreshToken: crypto.randomUUID()
    };
    it('should dispatch "loginUserAction.pending", "updateAuthStatus", "setUser", "loginUserAction.fulfilled", when server responds 200', async () => {
      mockApi.onPost(APIPath.Users.Login, mockLoginUser).reply<LoggedUserType>(StatusCodes.OK, mockReply);
      await store.dispatch(loginUserAction(mockLoginUser));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(2) as ReturnType<typeof setUser>;
      expect(actionTypes).toEqual([
        loginUserAction.pending.type,
        updateAuthStatus.type,
        setUser.type,
        loginUserAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "loginUserAction.pending", "updateAuthStatus", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loginUserAction.fulfilled", when server responds 400', async () => {
      mockApi.onPost(APIPath.Users.Login, mockLoginUser).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loginUserAction(mockLoginUser));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loginUserAction.pending.type,
        updateAuthStatus.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loginUserAction.fulfilled.type,
      ]);
    });
  });

  describe('updateUserAction', () => {
    const SAMPLE_DESCRIPTION = 'Lore ipsum dolor sit amet';
    const mockUpdateUser: UpdateUserType = {
      description: SAMPLE_DESCRIPTION,
    };
    it('should dispatch "updateUserAction.pending", "setUser", "updateUserAction.fulfilled", when server responds 200', async () => {
      mockApi.onPatch(APIPath.Users.Update, mockUpdateUser).reply<UserType>(StatusCodes.OK, mockUser);
      await store.dispatch(updateUserAction(mockUpdateUser));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setUser>;
      expect(actionTypes).toEqual([
        updateUserAction.pending.type,
        setUser.type,
        updateUserAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "updateUserAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "updateUserAction.fulfilled", when server responds 400', async () => {
      mockApi.onPatch(APIPath.Users.Update, mockUpdateUser).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(updateUserAction(mockUpdateUser));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        updateUserAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        updateUserAction.fulfilled.type,
      ]);
    });
  });

  describe('orderTrainingsAction', () => {
    const mockCreateOrder: CreateOrderType = {
      orderType: OrderPayment.Subscription,
      trainingId: mockTraining.id,
      trainingsCount: NULL_VALUE,
      payment: Payment.Visa,
    };
    const mockOrder = {
      ...mockCreateOrder,
      id: crypto.randomUUID(),
      userId: mockUser.id,
      trainingPrice: NULL_VALUE,
      trainingSum: NULL_VALUE,
    };
    it('should dispatch "orderTrainingsAction.pending", "loadAvailableTrainingsCountAction.pending", "orderTrainingsAction.fulfilled", when server responds 200', async () => {
      mockApi.onPost(`${APIPath.Orders.Index}`, mockCreateOrder).reply<OrderType>(StatusCodes.OK, mockOrder);
      await store.dispatch(orderTrainingsAction(mockCreateOrder));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof orderTrainingsAction.fulfilled>;
      expect(actionTypes).toEqual([
        orderTrainingsAction.pending.type,
        loadAvailableTrainingsCountAction.pending.type,
        orderTrainingsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.meta.arg).toEqual(mockOrder.trainingId);
    });

    it('should dispatch "orderTrainingsAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "orderTrainingsAction.fulfilled", when server responds 400', async () => {
      mockApi.onPost(`${APIPath.Orders.Index}`, mockCreateOrder).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(orderTrainingsAction(mockCreateOrder));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        orderTrainingsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        orderTrainingsAction.fulfilled.type,
      ]);
    });
  });

  describe('loadAvailableTrainingsCountAction', () => {
    const mockTrainingId = mockTraining.id;
    const SAMPLE_TRAINING_COUNT = 16;
    const mockAccount: AccountType = {
      id: crypto.randomUUID(),
      userId: mockUser.id,
      trainingId: mockTraining.id,
      trainingsActive: SAMPLE_TRAINING_COUNT,
      trainingsInactive: NULL_VALUE,
    };
    it('should dispatch "loadAvailableTrainingsCountAction.pending", "setTrainingsCount", "orderTrainingsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Accounts.Index}/${mockTrainingId}`).reply<AccountType>(StatusCodes.OK, mockAccount);
      await store.dispatch(loadAvailableTrainingsCountAction(mockTrainingId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setTrainingsCount>;
      expect(actionTypes).toEqual([
        loadAvailableTrainingsCountAction.pending.type,
        setTrainingsCount.type,
        loadAvailableTrainingsCountAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(SAMPLE_TRAINING_COUNT);
    });

    it('should dispatch "loadAvailableTrainingsCountAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadAvailableTrainingsCountAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Accounts.Index}/${mockTrainingId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadAvailableTrainingsCountAction(mockTrainingId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadAvailableTrainingsCountAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadAvailableTrainingsCountAction.fulfilled.type,
      ]);
    });
  });

  describe('loadUsersListAction', () => {
    const mockQuery: QueryUsersType = {
      take: NULL_VALUE,
      location: [Location.Petrogradskaya, Location.Zvezdnaya],
      trainType: [TrainType.Aerobics, TrainType.Pilates],
      level: Level.Amateur,
      role: UserRole.Trainer,
    };
    it('should dispatch "loadUsersListAction.pending", "setUsersList", "setUsersTotalItems", "setUsersTake","loadUsersListAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Users.Index}`, {
        params: {
          ...mockQuery
        }
      }).reply<EntitiesWithPaginationType<UserType>>(StatusCodes.OK, paginatedUsers);
      await store.dispatch(loadUsersListAction(mockQuery));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setUsersList>;
      expect(actionTypes).toEqual([
        loadUsersListAction.pending.type,
        setUsersList.type,
        setUsersTotalItems.type,
        setUsersTake.type,
        loadUsersListAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedUsers.entities);
    });

    it('should dispatch "loadUsersListAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadUsersListAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Users.Index}`, {
        params: {
          ...mockQuery
        }
      }).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadUsersListAction(mockQuery));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadUsersListAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadUsersListAction.fulfilled.type,
      ]);
    });
  });

  describe('loadUserFriendsAction', () => {
    const mockTake = NULL_VALUE;
    it('should dispatch "loadUserFriendsAction.pending", "setUserFriends", "setUsersTotalItems", "loadUserFriendsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Users.Friends}`, {
        params: {take: mockTake}
      }).reply<EntitiesWithPaginationType<UserType>>(StatusCodes.OK, paginatedUsers);
      await store.dispatch(loadUserFriendsAction(mockTake));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setUserFriends>;
      expect(actionTypes).toEqual([
        loadUserFriendsAction.pending.type,
        setUserFriends.type,
        setUsersTotalItems.type,
        loadUserFriendsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedUsers.entities);
    });

    it('should dispatch "loadUserFriendsAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadUserFriendsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Users.Friends}`, {
        params: {take: mockTake}
      }).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadUserFriendsAction(mockTake));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadUserFriendsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadUserFriendsAction.fulfilled.type,
      ]);
    });
  });

  describe('loadUserItemAction', () => {
    const mockUserId = mockUser.id;
    it('should dispatch "loadUserItemAction.pending", "setUserItem", "loadUserItemAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Users.Old}/${mockUserId}`).reply<UserType>(StatusCodes.OK, mockUser);
      await store.dispatch(loadUserItemAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setUserItem>;
      expect(actionTypes).toEqual([
        loadUserItemAction.pending.type,
        setUserItem.type,
        loadUserItemAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "loadUserItemAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadUserItemAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Users.Old}/${mockUserId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadUserItemAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadUserItemAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadUserItemAction.fulfilled.type,
      ]);
    });
  });

  describe('addToFriendsAction', () => {
    const mockUserId = mockUser.id;
    it('should dispatch "addToFriendsAction.pending", "setUser", "addToFriendsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Users.Friends}/${mockUserId}`).reply<UserType>(StatusCodes.OK, mockUser);
      await store.dispatch(addToFriendsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setUser>;
      expect(actionTypes).toEqual([
        addToFriendsAction.pending.type,
        setUser.type,
        addToFriendsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "addToFriendsAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "addToFriendsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Users.Friends}/${mockUserId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(addToFriendsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        addToFriendsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        addToFriendsAction.fulfilled.type,
      ]);
    });
  });

  describe('applyPersonalTrainingAction', () => {
    const mockUserId = mockUser.id;
    it('should dispatch "applyPersonalTrainingAction.pending", "setUser", "applyPersonalTrainingAction.fulfilled", when server responds 200', async () => {
      mockApi.onPost(`${APIPath.Applications.Index}/${mockUserId}`).reply<ApplicationType>(StatusCodes.OK);
      await store.dispatch(applyPersonalTrainingAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        applyPersonalTrainingAction.pending.type,
        applyPersonalTrainingAction.fulfilled.type,
      ]);
    });

    it('should dispatch "applyPersonalTrainingAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "applyPersonalTrainingAction.fulfilled", when server responds 400', async () => {
      mockApi.onPost(`${APIPath.Applications.Index}/${mockUserId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(applyPersonalTrainingAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        applyPersonalTrainingAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        applyPersonalTrainingAction.fulfilled.type,
      ]);
    });
  });

  describe('subscribeNotificationsAction', () => {
    const mockUserId = mockUser.id;
    it('should dispatch "subscribeNotificationsAction.pending", "setUser", "subscribeNotificationsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Users.Subscribe}/${mockUserId}`).reply<UserType>(StatusCodes.OK, mockUser);
      await store.dispatch(subscribeNotificationsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setUser>;
      expect(actionTypes).toEqual([
        subscribeNotificationsAction.pending.type,
        setUser.type,
        subscribeNotificationsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockUser);
    });

    it('should dispatch "subscribeNotificationsAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "subscribeNotificationsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Users.Subscribe}/${mockUserId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(subscribeNotificationsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        subscribeNotificationsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        subscribeNotificationsAction.fulfilled.type,
      ]);
    });
  });

  describe('loadUserItemTrainingsAction', () => {
    const mockUserId = mockUser.id;
    it('should dispatch "loadUserItemTrainingsAction.pending", "setUser", "loadUserItemTrainingsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Trainings.Trainer}/${mockUserId}`).reply<EntitiesWithPaginationType<TrainingType>>(StatusCodes.OK, paginatedTrainings);
      await store.dispatch(loadUserItemTrainingsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setTrainingsList>;
      expect(actionTypes).toEqual([
        loadUserItemTrainingsAction.pending.type,
        setTrainingsList.type,
        loadUserItemTrainingsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedTrainings.entities);
    });

    it('should dispatch "loadUserItemTrainingsAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadUserItemTrainingsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Trainings.Trainer}/${mockUserId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadUserItemTrainingsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadUserItemTrainingsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadUserItemTrainingsAction.fulfilled.type,
      ]);
    });
  });

  describe('loadUserApplicationsAction', () => {
    const mockUserId = mockUser.id;
    const mockApplications = adaptApplications(applications);
    it('should dispatch "loadUserApplicationsAction.pending", "setApplicationsList", "loadUserApplicationsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Applications.List}/${mockUserId}`).reply<ApplicationType[]>(StatusCodes.OK, mockApplications);
      await store.dispatch(loadUserApplicationsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setApplicationsList>;
      expect(actionTypes).toEqual([
        loadUserApplicationsAction.pending.type,
        setApplicationsList.type,
        loadUserApplicationsAction.fulfilled.type,
      ]);
      expect(adaptApplications(thunkFulfilled.payload)).toEqual(mockApplications);
    });

    it('should dispatch "loadUserApplicationsAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadUserApplicationsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Applications.List}/${mockUserId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadUserApplicationsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadUserApplicationsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadUserApplicationsAction.fulfilled.type,
      ]);
    });
  });

  describe('loadAuthorApplicationsAction', () => {
    const mockUserId = mockUser.id;
    const mockApplications = adaptApplications(applications);
    it('should dispatch "loadAuthorApplicationsAction.pending", "setApplicationsList", "loadAuthorApplicationsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Applications.Author}/${mockUserId}`).reply<ApplicationType[]>(StatusCodes.OK, mockApplications);
      await store.dispatch(loadAuthorApplicationsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setApplicationsList>;
      expect(actionTypes).toEqual([
        loadAuthorApplicationsAction.pending.type,
        setApplicationsList.type,
        loadAuthorApplicationsAction.fulfilled.type,
      ]);
      expect(adaptApplications(thunkFulfilled.payload)).toEqual(mockApplications);
    });

    it('should dispatch "loadAuthorApplicationsAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadAuthorApplicationsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Applications.Author}/${mockUserId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadAuthorApplicationsAction(mockUserId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadAuthorApplicationsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadAuthorApplicationsAction.fulfilled.type,
      ]);
    });
  });

  describe('updateApplicationAction', () => {
    const applicationStatus = ApplicationStatus.Accepted;
    const applicationId = applications[NULL_VALUE].id;
    const userId = mockUser.id;
    const mockUpdateApplications: UpdateApplicationParams = {
      applicationStatus,
      applicationId,
      userId,
    };
    it('should dispatch "updateApplicationAction.pending", "setApplicationsList", "updateApplicationAction.fulfilled", when server responds 200', async () => {
      mockApi.onPatch(`${APIPath.Applications.Index}/${applicationId}`, {
        status: applicationStatus,
      }).reply<ApplicationType[]>(StatusCodes.OK);
      await store.dispatch(updateApplicationAction(mockUpdateApplications));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        updateApplicationAction.pending.type,
        loadUserApplicationsAction.pending.type,
        updateApplicationAction.fulfilled.type,
      ]);
    });

    it('should dispatch "updateApplicationAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "updateApplicationAction.fulfilled", when server responds 400', async () => {
      mockApi.onPatch(`${APIPath.Applications.Index}/${applicationId}`, {
        status: applicationStatus,
      }).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(updateApplicationAction(mockUpdateApplications));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        updateApplicationAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        updateApplicationAction.fulfilled.type,
      ]);
    });
  });

  describe('loadNotificationsAction', () => {
    const SAMPLE_STRING = 'Lorem ipsum dolor sit amet';
    const mockServerNotifications = notifications.map((notification) => ({
      id: crypto.randomUUID(),
      notifyDate: new Date(notification.createdAt),
      userId: mockUser.id,
      description: notification.description,
      notifyStatus: NotifyStatus.Created,
      payload: {
        to: mockUser.email,
        subject: SAMPLE_STRING,
        template: SAMPLE_STRING,
        context: {
          name: notification.name,
        },
      },
      createdAt: new Date(notification.createdAt),

    }));
    it('should dispatch "loadNotificationsAction.pending", "setApplicationsList", "loadNotificationsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(APIPath.Notifications.Index).reply<ServerNotificationType[]>(StatusCodes.OK, mockServerNotifications);
      await store.dispatch(loadNotificationsAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setNotifications>;
      expect(actionTypes).toEqual([
        loadNotificationsAction.pending.type,
        setNotifications.type,
        loadNotificationsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(notifications);
    });

    it('should dispatch "loadNotificationsAction.pending", "clearErrorAction.pending", "setError", "clearErrorAction.fulfilled", "loadNotificationsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(APIPath.Notifications.Index).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadNotificationsAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadNotificationsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadNotificationsAction.fulfilled.type,
      ]);
    });
  });
});
