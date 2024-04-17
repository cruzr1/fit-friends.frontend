import { StateType } from '../../types';
import { NameSpace } from '../../const';
import { createSelector } from '@reduxjs/toolkit';

export const selectSpecialOffers = (state: StateType) => state[NameSpace.Training].specialOffers;
export const selectPopularTrainings = (state: StateType) => state[NameSpace.Training].popularTrainings;
export const selectChoiseTrainings = (state: StateType) => state[NameSpace.Training].choiseTrainings;
export const selectTrainingsList = (state: StateType) => state[NameSpace.Training].trainingsList;
export const selectTake = (state: StateType) => state[NameSpace.Training].take;
export const selectPriceFilter = (state: StateType) => state[NameSpace.Training].priceFilter;
export const selectCaloriesFilter = (state: StateType) => state[NameSpace.Training].caloriesFilter;
export const selectRatingFilter = (state: StateType) => state[NameSpace.Training].ratingFilter;
export const selectTrainTypeFilter = (state: StateType) => state[NameSpace.Training].trainTypeFilter;
export const selectSortByOrder = (state: StateType) => state[NameSpace.Training].sortByOrder;
export const selectTotalItems = (state: StateType) => state[NameSpace.Training].totalItems;
export const selectTraining = (state: StateType) => state[NameSpace.Training].training;
export const selectTrainer = (state: StateType) => state[NameSpace.Training].trainer;
export const selectReviews = (state: StateType) => state[NameSpace.Training].reviews;
export const selectTrainingItem = (trainingId: string) => createSelector(selectTrainingsList, (trainingsList) => trainingsList.find((training) => training.id === trainingId));
export const selectDurationFilter= (state: StateType) => state[NameSpace.Training].durationFilter;

