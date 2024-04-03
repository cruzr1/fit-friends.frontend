import { RequestStatus } from './const';
import { RequestStatusType, TrainingItemClassApplyType, TrainingType, TrainingOrderedType } from './types';

export const isStatusPending = (status: RequestStatusType) => status === RequestStatus.Pending;

export const adaptPrice = (price: number) => price > 0 ? `${price} ₽` : 'Бесплатно';

export const adaptImage = (image: string) => image.slice(0, image.indexOf('.'));

export const adaptPathname = (pathname: string): TrainingItemClassApplyType => pathname.slice(1) as TrainingItemClassApplyType;

export const isTrainingType = (trainingsList: TrainingType[] | TrainingOrderedType[]): trainingsList is TrainingType[] => (trainingsList as TrainingType[])[0].name !== undefined;

export const isTrainingOrderedType = (trainingsList: TrainingType[] | TrainingOrderedType[]): trainingsList is TrainingOrderedType[] => (trainingsList as TrainingOrderedType[])[0].training !== undefined;
