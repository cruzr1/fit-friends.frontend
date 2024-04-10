import { loadUsersReadyTrainAction } from './store/user/user.actions';

export const AUTH_TOKEN_KEY = 'ZGRmZGZkZkBkZmtsamRmLmNvbQ==';

export const REFRESH_TOKEN_KEY = '==ZGRmZGZkZkBkZmtsamRmLmNvbQ';

export const BASE_URL = 'http://localhost:3000/api';

export const REQUEST_TIMEOUT = 5000;

export const TIMEOUT_SHOW_ERROR = 5000;

export const PASSWORD_REGEX = /^.{6,12}$/;

export const NAME_REGEX = /^.{1,15}$/;

export const BIRTHDAY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const AVATAR_REGEX = /(.png$|.jpg$|.jpeg$)/;

export const CERTIFICATE_REGEX = /(.pdf$)/;

export const ITEMS_PER_PAGE = 3;

export const MAIN_ITEMS_PER_PAGE = 4;

export const NULL_VALUE = 0;

export const STEP = 1;

export const errorStyle = {color: 'red'};

export const DEFAULT_PATH = 'markup/img/content';

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
  Users: {
    Signin: 'users/signin',
    Login: 'users/login',
    Verify: 'users/check',
    Update: 'users/update',
    Index: 'users'
  },
  Trainings: {
    Index: 'trainings'
  }
} as const;

export const Action = {
  Create: 'create',
  Get: 'get',
  Update: 'update',
  Delete: 'delete',
  Login: 'login',
  Logout: 'logout',
  Redirect: 'redirect',
  LoadSpecialOffers: 'loadSpecialOffers',
  LoadPopularTrainings: 'loadPopularTrainings',
  LoadChoiseTrainings: 'loadChoiseTrainings',
  LoadUsersReadyTrain: 'loadUsersReadyTrain',
} as const;

export const AuthStatus = {
  Auth: 'auth',
  NoAuth: 'unauth',
  Unknown: 'unknown',
  Signed: 'signed'
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

export enum QuestionDurationCaption {
  '10-30min' = '10 мин - 30 мин',
  '30-50min' = '30 мин - 50 мин',
  '50-80min' = '50 мин - 80 мин',
  '80-100min' = '80 мин - 100 мин',
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
  Training: 'training'
} as const;

export const ErrorMessage = {
  UserUnauthorised: 'User is unauthorised',
  FailedUserLogout: 'Failed to log user out',
  FailedUserLogin: 'Failed to log user in',
  FailedUserSignin: 'Failed to sign user in',
  FailedUserUpdate: 'Failed to update user',
  FailedLoadPopularTrainings: 'Failed to load popular trainings',
  FailedLoadChoiseTrainings: 'Failed to load choise trainings',
  FailedLoadSpecialOffers: 'Failed to load special offers',
  FailedLoadUserReadyTrain: 'Failed to load users ready to train',
} as const;

export const UserValidationParams = {
  Image: {
    Regex: RegExp(/(.png$|.jpg$|.jpeg$)/i),
  },
  Description: {
    Length: {
      Minimum: 10,
      Maximum: 140,
    },
  },
  Calories: {
    Value: {
      Minimum: 1000,
      Maximum: 5000,
    },
  },
  Certificates: {
    Regex: RegExp(/.pdf/i),
  },
} as const;

export const SpecialSlideNumbers = ['первый слайд', 'второй слайд', 'третий слайд'] as const;

export const SPECIAL_OFFERS_COUNT = 3;

export const POPULAR_TRAININGS_COUNT = 8;

export const CHOISE_TRAININGS_COUNT = 9;

export const USERS_READY_TRAIN = 8;

export const POPULAR_TRAININGS_VISIBLE_COUNT = 4;

export const POPULAR_TRAININGS_SORT_FIELD = 'rating';
