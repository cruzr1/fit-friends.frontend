import { AuthStatus, RequestStatus, Level, TrainType, Duration, Gender, TrainingItemClassApply } from './const';
import { store } from "./store/store";

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;

export type AuthStatusType = typeof AuthStatus[keyof typeof AuthStatus];

export type RequestStatusType = typeof RequestStatus[keyof typeof RequestStatus];

export type TrainingType  = {
  id?: string;
  name: string;
  backgroundImage: string;
  level: string;
  trainType: string;
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

export type TrainingItemClassApplyType = typeof TrainingItemClassApply[keyof typeof TrainingItemClassApply];

export type TrainingOrderedType = {
  training: TrainingType;
  trainingsCount: number;
  trainingsSum: number;
};
