import { AuthStatus, CATALOG_COUNT, Level, Location, NULL_VALUE, RequestStatus, TrainType, UserRole } from '../../const';
import { UserStateType, setApplicationsList, setLevelFilter, setLocationFilter, setNotifications, setRoleFilter, setTrainTypeFilter, setTrainingsCount, setUser, setUserFriends, setUserItem, setUsersList, setUsersReadyTrain, setUsersTake, setUsersTotalItems, updateAuthStatus, user } from './user.slice';
import {MOCK_USERS as users} from '../../mocks/mock-users';
import {MOCK_NOTIFICATIONS as notifications} from '../../mocks/mock-notifications';
import {MOCK_APPLICATIONS as applications} from '../../mocks/mock-applications';
import { ApplicationType, ClientNotificationType, UserType } from '../../types';
import { addToFriendsAction, applyPersonalTrainingAction, authoriseUserAction, consumeActiveTrainingsAction, loadAuthorApplicationsAction, loadAvailableTrainingsCountAction, loadNotificationsAction, loadUserApplicationsAction, loadUserFriendsAction, loadUserItemAction, loadUserItemTrainingsAction, loadUsersListAction, loadUsersReadyTrainAction, loginUserAction, orderTrainingsAction, signinUserAction, subscribeNotificationsAction, updateApplicationAction, updateUserAction } from './user.actions';

describe('User Slice', () => {
  const initialState: UserStateType = {
    authStatus: AuthStatus.Unknown,
    user: null,
    userItem: null,
    usersReadyTrain: [],
    userFriends: [],
    trainingsCount: NULL_VALUE,
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


  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = user.reducer(initialState, emptyAction);

    expect(result).toEqual({...initialState});
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = user.reducer(undefined, emptyAction);

    expect(result).toEqual({...initialState});
  });

  it('should set authStatus with "updateAuthStatus" action', () => {
    const mockStatus = AuthStatus.Auth;
    const expectedState = {
      ...initialState,
      authStatus: mockStatus,
    };
    const result = user.reducer(initialState, updateAuthStatus(mockStatus));
    expect(result).toEqual(expectedState);
  });

  it('should set user with "setUser" action', () => {
    const mockUser = users[NULL_VALUE] as UserType;
    const expectedState = {
      ...initialState,
      user: mockUser,
    };
    const result = user.reducer(initialState, setUser(mockUser));
    expect(result).toEqual(expectedState);
  });

  it('should set userItem with "setUserItem" action', () => {
    const mockUserItem = users[NULL_VALUE] as UserType;
    const expectedState = {
      ...initialState,
      userItem: mockUserItem,
    };
    const result = user.reducer(initialState, setUserItem(mockUserItem));
    expect(result).toEqual(expectedState);
  });

  it('should set usersReadyTrain with "setUsersReadyTrain" action', () => {
    const mockUsersReadyTrain = users as UserType[];
    const expectedState = {
      ...initialState,
      usersReadyTrain: mockUsersReadyTrain,
    };
    const result = user.reducer(initialState, setUsersReadyTrain(mockUsersReadyTrain));
    expect(result).toEqual(expectedState);
  });

  it('should set userFriends with "setUserFriends" action', () => {
    const mockUserFriends = users as UserType[];
    const expectedState = {
      ...initialState,
      userFriends: mockUserFriends,
    };
    const result = user.reducer(initialState, setUserFriends(mockUserFriends));
    expect(result).toEqual(expectedState);
  });

  it('should set usersList with "setUsersList" action', () => {
    const mockUsersList = users as UserType[];
    const expectedState = {
      ...initialState,
      usersList: mockUsersList,
    };
    const result = user.reducer(initialState, setUsersList(mockUsersList));
    expect(result).toEqual(expectedState);
  });

  it('should set notifications with "setNotifications" action', () => {
    const mockNotifications = notifications as ClientNotificationType[];
    const expectedState = {
      ...initialState,
      notifications: mockNotifications,
    };
    const result = user.reducer(initialState, setNotifications(mockNotifications));
    expect(result).toEqual(expectedState);
  });

  it('should set trainingsCount with "setTrainingsCount" action', () => {
    const mockTrainingsCount = NULL_VALUE;
    const expectedState = {
      ...initialState,
      trainingsCount: mockTrainingsCount,
    };
    const result = user.reducer(initialState, setTrainingsCount(mockTrainingsCount));
    expect(result).toEqual(expectedState);
  });

  it('should add new location to locationFilter with "setLocationFilter" action', () => {
    const mockNewLocation = Location.Pionerskaya;
    const expectedState = {
      ...initialState,
      locationFilter: initialState.locationFilter.concat(mockNewLocation),
    };
    const result = user.reducer(initialState, setLocationFilter(mockNewLocation));
    expect(result).toEqual(expectedState);
  });

  it('should remove location from locationFilter with "setLocationFilter" action', () => {
    const mockNewLocation = Location.Petrogradskaya;
    const preparedState = {
      ...initialState,
      locationFilter: [Location.Petrogradskaya, Location.Pionerskaya]
    };
    const expectedState = {
      ...preparedState,
      locationFilter: preparedState.locationFilter.filter((location) => location !== mockNewLocation),
    };
    const result = user.reducer(preparedState, setLocationFilter(mockNewLocation));
    expect(result).toEqual(expectedState);
  });

  it('should add new trainType to trainTypeFilter with "setTrainTypeFilter" action', () => {
    const mockNewTrainType = TrainType.Pilates;
    const expectedState = {
      ...initialState,
      trainTypeFilter: initialState.trainTypeFilter.concat(mockNewTrainType),
    };
    const result = user.reducer(initialState, setTrainTypeFilter(mockNewTrainType));
    expect(result).toEqual(expectedState);
  });

  it('should remove trainType from trainTypeFilter with "setTrainTypeFilter" action', () => {
    const mockNewTrainType = TrainType.Aerobics;
    const preparedState = {
      ...initialState,
      trainTypeFilter: [TrainType.Aerobics, TrainType.Pilates]
    };
    const expectedState = {
      ...preparedState,
      trainTypeFilter: preparedState.trainTypeFilter.filter((type) => type !== mockNewTrainType),
    };
    const result = user.reducer(preparedState, setTrainTypeFilter(mockNewTrainType));
    expect(result).toEqual(expectedState);
  });

  it('should set levelFilter with "setLevelFilter" action', () => {
    const mockLevelFilter = Level.Professional;
    const expectedState = {
      ...initialState,
      levelFilter: mockLevelFilter,
    };
    const result = user.reducer(initialState, setLevelFilter(mockLevelFilter));
    expect(result).toEqual(expectedState);
  });

  it('should set roleFilter with "setRoleFilter" action', () => {
    const mockRoleFilter = UserRole.User;
    const expectedState = {
      ...initialState,
      roleFilter: mockRoleFilter,
    };
    const result = user.reducer(initialState, setRoleFilter(mockRoleFilter));
    expect(result).toEqual(expectedState);
  });

  it('should set usersTake with "setUsersTake" action', () => {
    const mockUsersTake = NULL_VALUE;
    const expectedState = {
      ...initialState,
      usersTake: mockUsersTake,
    };
    const result = user.reducer(initialState, setUsersTake(mockUsersTake));
    expect(result).toEqual(expectedState);
  });

  it('should set usersTotalItems with "setUsersTotalItems" action', () => {
    const mockUsersTotalItems = NULL_VALUE;
    const expectedState = {
      ...initialState,
      usersTotalItems: mockUsersTotalItems,
    };
    const result = user.reducer(initialState, setUsersTotalItems(mockUsersTotalItems));
    expect(result).toEqual(expectedState);
  });

  it('should set applicationsList with "setApplicationsList" action', () => {
    const mockApplicationsList = applications as ApplicationType[];
    const expectedState = {
      ...initialState,
      applicationsList: mockApplicationsList,
    };
    const result = user.reducer(initialState, setApplicationsList(mockApplicationsList));
    expect(result).toEqual(expectedState);
  });

  it('should set loadUsersReadyTrainStatus to RequestStatus.Pending with "loadUsersReadyTrainAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadUsersReadyTrainStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadUsersReadyTrainAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set signinUserStatus to RequestStatus.Pending with "signinUserAction.pending"', () => {
    const expectedState = {
      ...initialState,
      signinUserStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, signinUserAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set authoriseUserStatus to RequestStatus.Pending with "authoriseUserAction.pending"', () => {
    const expectedState = {
      ...initialState,
      authoriseUserStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, authoriseUserAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loginUserStatus to RequestStatus.Pending with "loginUserAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loginUserStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loginUserAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set updateUserStatus to RequestStatus.Pending with "updateUserAction.pending"', () => {
    const expectedState = {
      ...initialState,
      updateUserStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, updateUserAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set orderTrainingsStatus to RequestStatus.Pending with "orderTrainingsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      orderTrainingsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, orderTrainingsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadAvailableTrainingsCountStatus to RequestStatus.Pending with "loadAvailableTrainingsCountAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadAvailableTrainingsCountStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadAvailableTrainingsCountAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set useActiveTrainingsStatus to RequestStatus.Pending with "consumeActiveTrainingsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      useActiveTrainingsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, consumeActiveTrainingsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUsersListStatus to RequestStatus.Pending with "loadUsersListAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadUsersListStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadUsersListAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserFriendsStatus to RequestStatus.Pending with "loadUserFriendsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadUserFriendsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadUserFriendsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserItemStatus to RequestStatus.Pending with "loadUserItemAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadUserItemStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadUserItemAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set addToFriendsStatus to RequestStatus.Pending with "addToFriendsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      addToFriendsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, addToFriendsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set applyPersonalTrainingStatus to RequestStatus.Pending with "applyPersonalTrainingAction.pending"', () => {
    const expectedState = {
      ...initialState,
      applyPersonalTrainingStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, applyPersonalTrainingAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set subscribeNotificationsStatus to RequestStatus.Pending with "subscribeNotificationsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      subscribeNotificationsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, subscribeNotificationsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserItemTrainingsStatus to RequestStatus.Pending with "loadUserItemTrainingsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadUserItemTrainingsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadUserItemTrainingsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserApplicationsStatus to RequestStatus.Pending with "loadUserApplicationsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadUserApplicationsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadUserApplicationsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadAuthorApplicationsStatus to RequestStatus.Pending with "loadAuthorApplicationsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadAuthorApplicationsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadAuthorApplicationsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set updateApplicationStatus to RequestStatus.Pending with "updateApplicationAction.pending"', () => {
    const expectedState = {
      ...initialState,
      updateApplicationStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, updateApplicationAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadNotificationsStatus to RequestStatus.Pending with "loadNotificationsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadNotificationsStatus: RequestStatus.Pending,
    };
    const result = user.reducer(initialState, loadNotificationsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUsersReadyTrainStatus to RequestStatus.Rejected with "loadUsersReadyTrainAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadUsersReadyTrainStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadUsersReadyTrainAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set signinUserStatus to RequestStatus.Rejected with "signinUserAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      signinUserStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, signinUserAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set authoriseUserStatus to RequestStatus.Rejected with "authoriseUserAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      authoriseUserStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, authoriseUserAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loginUserStatus to RequestStatus.Rejected with "loginUserAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loginUserStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loginUserAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set updateUserStatus to RequestStatus.Rejected with "updateUserAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      updateUserStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, updateUserAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set orderTrainingsStatus to RequestStatus.Rejected with "orderTrainingsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      orderTrainingsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, orderTrainingsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadAvailableTrainingsCountStatus to RequestStatus.Rejected with "loadAvailableTrainingsCountAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadAvailableTrainingsCountStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadAvailableTrainingsCountAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set useActiveTrainingsStatus to RequestStatus.Rejected with "consumeActiveTrainingsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      useActiveTrainingsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, consumeActiveTrainingsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUsersListStatus to RequestStatus.Rejected with "loadUsersListAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadUsersListStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadUsersListAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserFriendsStatus to RequestStatus.Rejected with "loadUserFriendsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadUserFriendsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadUserFriendsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserItemStatus to RequestStatus.Rejected with "loadUserItemAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadUserItemStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadUserItemAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set addToFriendsStatus to RequestStatus.Rejected with "addToFriendsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      addToFriendsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, addToFriendsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set applyPersonalTrainingStatus to RequestStatus.Rejected with "applyPersonalTrainingAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      applyPersonalTrainingStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, applyPersonalTrainingAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set subscribeNotificationsStatus to RequestStatus.Rejected with "subscribeNotificationsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      subscribeNotificationsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, subscribeNotificationsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserItemTrainingsStatus to RequestStatus.Rejected with "loadUserItemTrainingsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadUserItemTrainingsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadUserItemTrainingsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserApplicationsStatus to RequestStatus.Rejected with "loadUserApplicationsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadUserApplicationsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadUserApplicationsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadAuthorApplicationsStatus to RequestStatus.Rejected with "loadAuthorApplicationsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadAuthorApplicationsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadAuthorApplicationsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set updateApplicationStatus to RequestStatus.Rejected with "updateApplicationAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      updateApplicationStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, updateApplicationAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadNotificationsStatus to RequestStatus.Rejected with "loadNotificationsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadNotificationsStatus: RequestStatus.Rejected,
    };
    const result = user.reducer(initialState, loadNotificationsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUsersReadyTrainStatus to RequestStatus.Fulfilled with "loadUsersReadyTrainAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadUsersReadyTrainStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadUsersReadyTrainAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set signinUserStatus to RequestStatus.Fulfilled with "signinUserAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      signinUserStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, signinUserAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set authoriseUserStatus to RequestStatus.Fulfilled with "authoriseUserAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      authoriseUserStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, authoriseUserAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loginUserStatus to RequestStatus.Fulfilled with "loginUserAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loginUserStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loginUserAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set updateUserStatus to RequestStatus.Fulfilled with "updateUserAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      updateUserStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, updateUserAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set orderTrainingsStatus to RequestStatus.Fulfilled with "orderTrainingsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      orderTrainingsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, orderTrainingsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadAvailableTrainingsCountStatus to RequestStatus.Fulfilled with "loadAvailableTrainingsCountAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadAvailableTrainingsCountStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadAvailableTrainingsCountAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set useActiveTrainingsStatus to RequestStatus.Fulfilled with "consumeActiveTrainingsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      useActiveTrainingsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, consumeActiveTrainingsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUsersListStatus to RequestStatus.Fulfilled with "loadUsersListAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadUsersListStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadUsersListAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserFriendsStatus to RequestStatus.Fulfilled with "loadUserFriendsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadUserFriendsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadUserFriendsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserItemStatus to RequestStatus.Fulfilled with "loadUserItemAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadUserItemStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadUserItemAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set addToFriendsStatus to RequestStatus.Fulfilled with "addToFriendsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      addToFriendsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, addToFriendsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set applyPersonalTrainingStatus to RequestStatus.Fulfilled with "applyPersonalTrainingAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      applyPersonalTrainingStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, applyPersonalTrainingAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set subscribeNotificationsStatus to RequestStatus.Fulfilled with "subscribeNotificationsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      subscribeNotificationsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, subscribeNotificationsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserItemTrainingsStatus to RequestStatus.Fulfilled with "loadUserItemTrainingsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadUserItemTrainingsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadUserItemTrainingsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadUserApplicationsStatus to RequestStatus.Fulfilled with "loadUserApplicationsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadUserApplicationsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadUserApplicationsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadAuthorApplicationsStatus to RequestStatus.Fulfilled with "loadAuthorApplicationsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadAuthorApplicationsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadAuthorApplicationsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set updateApplicationStatus to RequestStatus.Fulfilled with "updateApplicationAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      updateApplicationStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, updateApplicationAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadNotificationsStatus to RequestStatus.Fulfilled with "loadNotificationsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadNotificationsStatus: RequestStatus.Fulfilled,
    };
    const result = user.reducer(initialState, loadNotificationsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
