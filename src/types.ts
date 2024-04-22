import { AuthStatus, RequestStatus, Level, TrainType, Duration, Gender, TrainingItemClassApply, AppRoute, BackButtonClassApply, Location, Payment, OrderPayment, UserRole, ApplicationStatus, OrdersSortByFields, SortOrder, NotifyStatus } from './const';
import { store } from './store/store';

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export type AuthStatusType = typeof AuthStatus[keyof typeof AuthStatus];

export type AppRouteType = typeof AppRoute[keyof typeof AppRoute];

export type RequestStatusType = typeof RequestStatus[keyof typeof RequestStatus];


export type BackButtonClassApplyType = typeof BackButtonClassApply[keyof typeof BackButtonClassApply];


export type NotificationPayloadType = {
  to: string;
  subject: string;
  template: string;
  context: Record<string, string>;
};

export type ServerNotificationType = {
  id: string;
  notifyDate?: Date;
  userId: string;
  description: string;
  notifyStatus: NotifyStatus;
  payload: NotificationPayloadType;
  createdAt: Date;
}

export type ClientNotificationType = {
  description: string;
  name: string;
  createdAt: string;
}

export type TrainingType = {
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

export type CreateTrainingType = Pick<
  TrainingType,
  'name' |
  'backgroundImage' |
  'level' |
  'trainType' |
  'duration' |
  'price' |
  'calories' |
  'description' |
  'gender' |
  'videoURL' |
  'isSpecial'
>;

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
  applicationStatus: ApplicationStatus;
  applicationId: string;
  userId: string;
}

export type UserFeaturesType = Pick<UserType, 'caloriesDaily' | 'duration' | 'level' | 'trainType'>

export type UpdateUserType = Partial<UserType>;

export type LoginType = Pick<UserType, 'email'> & Record<'password', string>;

export type SigninType = Pick<
  UserType,
    'name' |
    'email' |
    'avatar' |
    'gender' |
    'birthDate' |
    'role' |
    'description' |
    'location' |
    'backgroundImage'
  > & Record<'password', string>;

export type LoggedUserType = UserType & {
  accessToken: string;
  refreshToken: string;
}

export type EntitiesWithPaginationType<T> = {
  entities: T[];
  totalPages?: number;
  currentPage?: number;
  totalItems: number;
}

export type SortOrderType = typeof SortOrder[keyof typeof SortOrder];

export type QueryTrainingsType = {
  take: number;
  priceFilter: number[];
  caloriesFilter: number[];
  ratingFilter: number[];
  trainTypeFilter: TrainType[];
  sortByOrder: SortOrderType;
  durationFilter?: Duration;
  sortByField?: string;
}

export type QueryTrainingsPurchasedType = {
  take: number;
  isActiveTrainings?: boolean;
}

export type OrdersSortByFieldType = typeof OrdersSortByFields[keyof typeof OrdersSortByFields];

export type QueryTrainingsOrderedType = {
  take: number;
  sortByOrder: SortOrderType;
  sortByField: OrdersSortByFieldType;
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
