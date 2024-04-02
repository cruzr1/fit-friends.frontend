import { AuthStatus, RequestStatus, Level, TrainType, Duration, Gender } from './const';
import { store } from "./store/store";

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export type AuthStatusType = typeof AuthStatus[keyof typeof AuthStatus];

export type RequestStatusType = typeof RequestStatus[keyof typeof RequestStatus];

export type Training  = {
  id?: string;
  name: string;
  backgroundImage: string;
  level: Level;
  trainType: TrainType;
  duration: Duration;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  videoURL: string;
  rating: number;
  trainerId: string;
  isSpecial: boolean;
}
