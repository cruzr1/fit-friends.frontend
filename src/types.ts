import { AuthStatus, RequestStatus, Level, TrainType, Duration, Gender, TrainingItemClassApply, AppRoute, BackButtonClassApply, Location, Payment, OrderPayment, UserRole, ApplicationStatus } from './const';
import { store } from "./store/store";

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export type AuthStatusType = typeof AuthStatus[keyof typeof AuthStatus];

export type AppRouteType = typeof AppRoute[keyof typeof AppRoute];

export type RequestStatusType = typeof RequestStatus[keyof typeof RequestStatus];


export type BackButtonClassApplyType = typeof BackButtonClassApply[keyof typeof BackButtonClassApply];

export type TrainingType  = {
  id: string;
  name: string;
  backgroundImage: string;
  level: string;
  trainType: TrainType;
  duration: string;
  price: number;
  calories: number;
  description: string;
  gender: string;
  videoURL: string;
  rating: number;
  trainerId: string;
  isSpecial: boolean;
}

export type UpdateTrainingType = Partial<TrainingType>;

export type TrainingItemClassApplyType = typeof TrainingItemClassApply[keyof typeof TrainingItemClassApply];

export type TrainingOrderedType = {
  training: TrainingType;
  trainingsCount: number;
  trainingsSum: number;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  passwordHash?: string;
  gender: Gender;
  birthDate?: string;
  role: UserRole;
  description: string;
  location: Location;
  backgroundImage: string;
  level: Level;
  friends?: string[];
  trainType: TrainType[];
  isReadyTrain: boolean;
  subscribedFor?: string[];
  duration?: Duration;
  caloriesTarget?: number;
  caloriesDaily?: number;
  certificates?: string;
  achievements?: string;
}

export type ApplicationType = {
  id: string;
  authorId: string;
  userId: string;
  status: ApplicationStatus;
  updatedAt: Date;
}

export type UpdateApplicationParams ={
  applicationStatus: ApplicationStatus,
  applicationId: string,
  userId: string;
}

export type UserFeaturesType = Pick<UserType, 'caloriesDaily' | 'duration' | 'level' | 'trainType'>

export type UpdateUserType = Partial<UserType>;

export type LoginType = Pick<UserType, 'email'> & Record<'password', string>;

  export type SigninType = UserType & Record<'password', string>;

  export type LoggedUserType = UserType & {
    accessToken: string;
    refreshToken: string;
  }

  export type EntitiesWithPaginationType<T> = {
    entities: T[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
  }

  export type SortOrderType = 'desc' | 'asc';

  export type QueryTrainingsType = {
    take: number;
    priceFilter: number[];
    caloriesFilter: number[];
    ratingFilter: number[];
    trainTypeFilter: TrainType[];
    sortByOrder: SortOrderType;
  }

  export type QueryUsersType = {
    take: number;
    location: Location[];
    trainType: TrainType[];
    level: Level;
    role: UserRole;
  }

  export type ReviewType = {
    id: string;
    authorId: string;
    name: string;
    avatar: string;
    trainingId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }

  export type PostReviewType = Pick<ReviewType, 'comment' | 'rating' | 'trainingId'>

  export type CreateOrderType = {
    orderType: OrderPayment;
    trainingId: string;
    trainingsCount: number;
    payment: Payment;
  }

  export type OrderType = {
    id?: string;
    userId: string;
    orderType: OrderPayment;
    trainingId: string;
    trainingsCount: number;
    trainingPrice: number;
    trainingSum: number;
    payment: Payment;
  }

  export type AccountType = {
    id?: string;
    userId: string;
    trainingId: string;
    trainingsActive: number;
    trainingsInactive: number;
  }
