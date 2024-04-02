import { RequestStatus } from './const';
import { RequestStatusType } from './types';

export const isStatusPending = (status: RequestStatusType) => status === RequestStatus.Pending;

export const adaptPrice = (price: number) => price > 0 ? `${price} ₽` : 'Бесплатно';

export const adaptImage = (image: string) => image.slice(0, image.indexOf('.'));
