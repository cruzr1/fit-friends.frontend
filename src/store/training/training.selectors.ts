import { StateType } from '../../types';
import { NameSpace } from '../../const';

export const selectSpecialOffers = (state: StateType) => state[NameSpace.Training].specialOffers;
export const selectPopularTrainings = (state: StateType) => state[NameSpace.Training].popularTrainings;
export const selectChoiseTrainings = (state: StateType) => state[NameSpace.Training].choiseTrainings;
export const selectTrainingLoadingStatus = (state: StateType) => state[NameSpace.Training].loadingStatus;
