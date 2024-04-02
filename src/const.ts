export const AUTH_TOKEN_KEY = 'ZGRmZGZkZkBkZmtsamRmLmNvbQ==';

export const BASE_URL = 'http://localhost:3000/api';

export const REQUEST_TIMEOUT = 5000;

export const RequestStatus = {
  Idle: 'idle',
  Pending: 'pending',
  Fulfilled: 'fulfilled',
  Rejected: 'rejected'
} as const;

export const AppRoute = {
  Index: '/',
  Signin: 'signin',
  Signup: 'signup',
  QuestCoach: 'quest-coach',
  QuestUser: 'quest-user',
  PersonalAccountCoach: 'personal-account-coach',
  PersonalAccountUser: 'personal-account-user',
  CreateTraining: 'create-training',
  MyTrainings: 'my-trainings',
  MyOrders: 'my-orders',
  MyPurchases: 'my-purchases',
  MyFriendsCoach: 'my-friends-coach',
  MyFriendsUser: 'my-friends-user',
  Main: 'main',
  TrainingCatalogue: 'training-catalog',
  TrainingCardUser: 'training-card-user',
  TrainingCardCoach: 'training-card-coach',
  UserCatalogue: 'user-catalogue',
  UserCardUser: 'user-card-user',
  UserCardCoach: 'user-card-coach',
} as const;


export const AuthStatus = {
  Auth: 'auth',
  NoAuth: 'unauth',
  Unknown: 'unknown'
} as const;

export enum UserRole {
  Trainer = 'Trainer',
  User = 'User',
}
