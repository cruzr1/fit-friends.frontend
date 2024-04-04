export const AUTH_TOKEN_KEY = 'ZGRmZGZkZkBkZmtsamRmLmNvbQ==';

export const REFRESH_TOKEN_KEY = '==ZGRmZGZkZkBkZmtsamRmLmNvbQ';

export const BASE_URL = 'http://localhost:3000/api';

export const REQUEST_TIMEOUT = 5000;

export const TIMEOUT_SHOW_ERROR = 5000;

export const PASSWORD_REGEX = /^.{6,12}$/;

export const NAME_REGEX = /^.{1,15}$/;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const NULL_LENGTH = 0;

export const errorStyle = {color: 'red'};

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
  MyFriends: '/friends-list',
  Main: '/main',
  TrainingCatalogue: '/training-catalog',
  TrainingCard: '/training-card',
  UserCatalogue: '/users-catalog',
  UserCard: '/user-card',
} as const;

export const APIPath = {
  Signin: 'users/signin',
  Login: 'users/login',
  Verify: 'users/check',
} as const;

export const Action = {
  Create: 'create',
  Get: 'get',
  Update: 'update',
  Delete: 'delete',
  Login: 'login',
  Logout: 'logout',
  Redirect: 'redirect',
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

export enum Location {
  Pionerskaya = 'Pionerskaya',
  Petrogradskaya = 'Petrogradskaya',
  Udelnaya = 'Udelnaya',
  Zvezdnaya = 'Zvezdnaya',
  Sportivnaya = 'Sportivnaya',
}

export enum LocationCaption {
  Pionerskaya = 'Пионерская',
  Petrogradskaya = 'Петроградская',
  Udelnaya = 'Удельная',
  Zvezdnaya = 'Звездная',
  Sportivnaya = 'Спортивная',
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

export const BackButtonClassApply = {
  MyTrainings: 'my-trainings',
  MyOrders: 'my-orders__back',
  MyPurchases: 'my-purchases__back',
  TrainingCatalog: 'gym-catalog-form__btnback',
  TrainingForm: 'my-training-form__btnback',
  UserForm: 'user-catalog-form__btnback',
  UserCard: 'inner-page__back',
  FriendsList: 'friends-list__back',
  ReviewsList: 'reviews-side-bar__back',
} as const;

export const NameSpace = {
  AuthStatus: 'auth',
  User: 'user',
  Error: 'error',
  Route: 'route',
} as const;

export const ErrorMessage = {
  UserUnauthorised: 'User is unauthorised',
  FailedUserLogout: 'Failed to log user out',
  FailedUserLogin: 'Failed to log user in',
  FailedUserSignin: 'Failed to sign user in',
} as const;
