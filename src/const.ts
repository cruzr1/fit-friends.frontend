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
  Signin: '/signin',
  Signup: '/signup',
  Quest: '/quest',
  PersonalAccountCoach: '/personal-account-coach',
  PersonalAccountUser: '/personal-account-user',
  CreateTraining: '/create-training',
  MyTrainings: '/my-trainings',
  MyOrders: '/my-orders',
  MyPurchases: '/my-purchases',
  MyFriendsCoach: '/my-friends-coach',
  MyFriendsUser: '/my-friends-user',
  Main: '/main',
  TrainingCatalogue: '/training-catalog',
  TrainingCardUser: '/training-card-user',
  TrainingCardCoach: '/training-card-coach',
  UserCatalogue: '/user-catalogue',
  UserCardUser: '/user-card-user',
  UserCardCoach: '/user-card-coach',
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

export enum TrainType {
  Yoga = 'Yoga',
  Running = 'Running',
  Boxing = 'Boxing',
  Stretching = 'Stretching',
  Crossfit = 'Crossfit',
  Aerobics = 'Aerobics',
  Pilates = 'Pilates',
}

export enum TrainTypeCaption {
  Yoga = 'йога',
  Running = 'бег',
  Boxing = 'бокс',
  Stretching = 'стрейчинг',
  Crossfit = 'кроссфит',
  Aerobics = 'аэробика',
  Pilates = 'пилатес',
}

export enum Duration {
  From10to30min = '10-30min',
  From30to50min = '30-50min',
  From50to80min = '50-80min',
  From80to100min = '80-100min',
}

export enum DurationCaption {
  From10to30min = '10 мин - 30 мин',
  From30to50min = '30 мин - 50 мин',
  From50to80min = '50 мин - 80 мин',
  From80to100min = '80 мин - 100 мин',
}

export enum Level {
  Newby = 'Newby',
  Amateur = 'Amateur',
  Professional = 'Professional',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Any = 'Any',
}

export enum LevelCaption {
  Newby = 'Новичок',
  Amateur = 'Любитель',
  Professional = 'Профессионал',
}

export enum GenderCaption {
  Male = 'Мужской',
  Female = 'Женский',
  Any = 'Любой',
}

export const TrainingItemClassApply = {
  [AppRoute.MyTrainings]: 'my-trainings',
  [AppRoute.MyOrders]: 'my-orders',
  [AppRoute.MyPurchases]: 'my-purchases',
  [AppRoute.TrainingCatalogue]: 'training-catalog',
} as const;

