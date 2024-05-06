import { AuthStatus, Level, UserRole, CATALOG_COUNT, RequestStatus, StateName, Location, TrainType, NULL_VALUE } from '../../const';
import { selectAddToFriendsStatus, selectApplicationsList, selectApplyPersonalTrainingStatus, selectAuthoriseUserStatus, selectLevelFilter, selectLoadAuthorApplicationsStatus, selectLoadAvailableTrainingsCountStatus, selectLoadNotificationsStatus, selectLoadUserApplicationsStatus, selectLoadUserFriendsStatus, selectLoadUserItemStatus, selectLoadUserItemTrainingsStatus, selectLoadUsersListStatus, selectLoadUsersReadyTrainStatus, selectLocationFilter, selectLoginUserStatus, selectNotifications, selectOrderTrainingsStatus, selectRoleFilter, selectSigninUserStatus, selectSubscribeNotificationsStatus, selectTrainTypeFilter, selectTrainingsCount, selectUpdateApplicationStatus, selectUseActiveTrainingsStatus, selectUser, selectUserAuthStatus, selectUserFriends, selectUserItem, selectUserUpdateStatus, selectUsersList, selectUsersReadyTrain, selectUsersTake, selectUsersTotalItems } from './user.selectors';
import {MOCK_USERS as users} from '../../mocks/mock-users';
import {MOCK_NOTIFICATIONS as notifications} from '../../mocks/mock-notifications';
import {MOCK_APPLICATIONS as applications} from '../../mocks/mock-applications';
import { ApplicationType, ClientNotificationType, UserType } from '../../types';

describe('Users selectors', () => {
  const state = {
    [StateName.User]: {
      authStatus: AuthStatus.Unknown,
      user: users[NULL_VALUE] as UserType,
      userItem: users[NULL_VALUE] as UserType,
      usersReadyTrain: users as UserType[],
      userFriends: users as UserType[],
      trainingsCount: NULL_VALUE,
      locationFilter:[Location.Petrogradskaya, Location.Pionerskaya],
      trainTypeFilter:[TrainType.Aerobics, TrainType.Pilates],
      levelFilter: Level.Amateur,
      roleFilter: UserRole.Trainer,
      usersList: users as UserType[],
      notifications: notifications as ClientNotificationType[],
      usersTake: CATALOG_COUNT,
      usersTotalItems: NULL_VALUE,
      applicationsList: applications as ApplicationType[],
      updateUserStatus: RequestStatus.Pending,
      loadUsersReadyTrainStatus: RequestStatus.Pending,
      signinUserStatus: RequestStatus.Pending,
      authoriseUserStatus: RequestStatus.Pending,
      loginUserStatus: RequestStatus.Pending,
      orderTrainingsStatus: RequestStatus.Pending,
      loadAvailableTrainingsCountStatus: RequestStatus.Pending,
      useActiveTrainingsStatus: RequestStatus.Pending,
      loadUsersListStatus: RequestStatus.Pending,
      loadUserFriendsStatus: RequestStatus.Pending,
      loadUserItemStatus: RequestStatus.Pending,
      addToFriendsStatus: RequestStatus.Pending,
      applyPersonalTrainingStatus: RequestStatus.Pending,
      subscribeNotificationsStatus: RequestStatus.Pending,
      loadUserItemTrainingsStatus: RequestStatus.Pending,
      loadUserApplicationsStatus: RequestStatus.Pending,
      loadAuthorApplicationsStatus: RequestStatus.Pending,
      updateApplicationStatus: RequestStatus.Pending,
      loadNotificationsStatus: RequestStatus.Pending,
    }
  };

  it('should return authStatus from state', () => {
    const {authStatus} = state[StateName.User];
    const result = selectUserAuthStatus(state);
    expect(result).toBe(authStatus);
  });

  it('should return user from state', () => {
    const {user} = state[StateName.User];
    const result = selectUser(state);
    expect(result).toEqual(user);
  });

  it('should return userItem from state', () => {
    const {userItem} = state[StateName.User];
    const result = selectUserItem(state);
    expect(result).toEqual(userItem);
  });

  it('should return usersReadyTrain from state', () => {
    const {usersReadyTrain} = state[StateName.User];
    const result = selectUsersReadyTrain(state);
    expect(result).toEqual(usersReadyTrain);
  });

  it('should return userFriends from state', () => {
    const {userFriends} = state[StateName.User];
    const result = selectUserFriends(state);
    expect(result).toEqual(userFriends);
  });

  it('should return trainingsCount from state', () => {
    const {trainingsCount} = state[StateName.User];
    const result = selectTrainingsCount(state);
    expect(result).toBe(trainingsCount);
  });

  it('should return locationFilter from state', () => {
    const {locationFilter} = state[StateName.User];
    const result = selectLocationFilter(state);
    expect(result).toEqual(locationFilter);
  });

  it('should return trainTypeFilter from state', () => {
    const {trainTypeFilter} = state[StateName.User];
    const result = selectTrainTypeFilter(state);
    expect(result).toEqual(trainTypeFilter);
  });

  it('should return levelFilter from state', () => {
    const {levelFilter} = state[StateName.User];
    const result = selectLevelFilter(state);
    expect(result).toBe(levelFilter);
  });

  it('should return roleFilter from state', () => {
    const {roleFilter} = state[StateName.User];
    const result = selectRoleFilter(state);
    expect(result).toBe(roleFilter);
  });

  it('should return usersList from state', () => {
    const {usersList} = state[StateName.User];
    const result = selectUsersList(state);
    expect(result).toEqual(usersList);
  });

  it('should return usersList from state', () => {
    const {usersList} = state[StateName.User];
    const result = selectUsersList(state);
    expect(result).toEqual(usersList);
  });

  it('should return usersTake from state', () => {
    const {usersTake} = state[StateName.User];
    const result = selectUsersTake(state);
    expect(result).toBe(usersTake);
  });

  it('should return usersTotalItems from state', () => {
    const {usersTotalItems} = state[StateName.User];
    const result = selectUsersTotalItems(state);
    expect(result).toBe(usersTotalItems);
  });

  it('should return notifications from state', () => {
    const {notifications: notificationsList} = state[StateName.User];
    const result = selectNotifications(state);
    expect(result).toEqual(notificationsList);
  });

  it('should return applicationsList from state', () => {
    const {applicationsList} = state[StateName.User];
    const result = selectApplicationsList(state);
    expect(result).toEqual(applicationsList);
  });

  it('should return updateUserStatus from state', () => {
    const {updateUserStatus} = state[StateName.User];
    const result = selectUserUpdateStatus(state);
    expect(result).toBe(updateUserStatus);
  });

  it('should return loadUsersReadyTrainStatus from state', () => {
    const {loadUsersReadyTrainStatus} = state[StateName.User];
    const result = selectLoadUsersReadyTrainStatus(state);
    expect(result).toBe(loadUsersReadyTrainStatus);
  });

  it('should return signinUserStatus from state', () => {
    const {signinUserStatus} = state[StateName.User];
    const result = selectSigninUserStatus(state);
    expect(result).toBe(signinUserStatus);
  });

  it('should return authoriseUserStatus from state', () => {
    const {authoriseUserStatus} = state[StateName.User];
    const result = selectAuthoriseUserStatus(state);
    expect(result).toBe(authoriseUserStatus);
  });

  it('should return loginUserStatus from state', () => {
    const {loginUserStatus} = state[StateName.User];
    const result = selectLoginUserStatus(state);
    expect(result).toBe(loginUserStatus);
  });

  it('should return orderTrainingsStatus from state', () => {
    const {orderTrainingsStatus} = state[StateName.User];
    const result = selectOrderTrainingsStatus(state);
    expect(result).toBe(orderTrainingsStatus);
  });

  it('should return loadAvailableTrainingsCountStatus from state', () => {
    const {loadAvailableTrainingsCountStatus} = state[StateName.User];
    const result = selectLoadAvailableTrainingsCountStatus(state);
    expect(result).toBe(loadAvailableTrainingsCountStatus);
  });

  it('should return useActiveTrainingsStatus from state', () => {
    const {useActiveTrainingsStatus} = state[StateName.User];
    const result = selectUseActiveTrainingsStatus(state);
    expect(result).toBe(useActiveTrainingsStatus);
  });

  it('should return loadUsersListStatus from state', () => {
    const {loadUsersListStatus} = state[StateName.User];
    const result = selectLoadUsersListStatus(state);
    expect(result).toBe(loadUsersListStatus);
  });

  it('should return loadUserFriendsStatus from state', () => {
    const {loadUserFriendsStatus} = state[StateName.User];
    const result = selectLoadUserFriendsStatus(state);
    expect(result).toBe(loadUserFriendsStatus);
  });

  it('should return loadUserItemStatus from state', () => {
    const {loadUserItemStatus} = state[StateName.User];
    const result = selectLoadUserItemStatus(state);
    expect(result).toBe(loadUserItemStatus);
  });

  it('should return addToFriendsStatus from state', () => {
    const {addToFriendsStatus} = state[StateName.User];
    const result = selectAddToFriendsStatus(state);
    expect(result).toBe(addToFriendsStatus);
  });

  it('should return applyPersonalTrainingStatus from state', () => {
    const {applyPersonalTrainingStatus} = state[StateName.User];
    const result = selectApplyPersonalTrainingStatus(state);
    expect(result).toBe(applyPersonalTrainingStatus);
  });

  it('should return subscribeNotificationsStatus from state', () => {
    const {subscribeNotificationsStatus} = state[StateName.User];
    const result = selectSubscribeNotificationsStatus(state);
    expect(result).toBe(subscribeNotificationsStatus);
  });

  it('should return loadUserItemTrainingsStatus from state', () => {
    const {loadUserItemTrainingsStatus} = state[StateName.User];
    const result = selectLoadUserItemTrainingsStatus(state);
    expect(result).toBe(loadUserItemTrainingsStatus);
  });

  it('should return loadUserApplicationsStatus from state', () => {
    const {loadUserApplicationsStatus} = state[StateName.User];
    const result = selectLoadUserApplicationsStatus(state);
    expect(result).toBe(loadUserApplicationsStatus);
  });

  it('should return loadAuthorApplicationsStatus from state', () => {
    const {loadAuthorApplicationsStatus} = state[StateName.User];
    const result = selectLoadAuthorApplicationsStatus(state);
    expect(result).toBe(loadAuthorApplicationsStatus);
  });

  it('should return updateApplicationStatus from state', () => {
    const {updateApplicationStatus} = state[StateName.User];
    const result = selectUpdateApplicationStatus(state);
    expect(result).toBe(updateApplicationStatus);
  });

  it('should return loadNotificationsStatus from state', () => {
    const {loadNotificationsStatus} = state[StateName.User];
    const result = selectLoadNotificationsStatus(state);
    expect(result).toBe(loadNotificationsStatus);
  });
});
