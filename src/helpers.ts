import { RequestStatus } from './const';
import { RequestStatusType } from './types';

export const isStatusPending = (status: RequestStatusType) => status === RequestStatus.Pending;
