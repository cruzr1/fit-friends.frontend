import { StateType } from '../../types';
import { StateName } from '../../const';
import { createSelector } from '@reduxjs/toolkit';

export const selectSpecialOffers = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].specialOffers;
export const selectPopularTrainings = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].popularTrainings;
export const selectChoiseTrainings = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].choiseTrainings;
export const selectTrainingsList = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].trainingsList;
export const selectTrainingsOrderedList = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].trainingsOrderedList;
export const selectTake = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].take;
export const selectPriceFilter = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].priceFilter;
export const selectCaloriesFilter = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].caloriesFilter;
export const selectRatingFilter = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].ratingFilter;
export const selectTrainTypeFilter = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].trainTypeFilter;
export const selectSortByOrder = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].sortByOrder;
export const selectSortByField = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].sortByField;
export const selectTotalItems = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].totalItems;
export const selectTraining = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].training;
export const selectTrainer = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].trainer;
export const selectReviews = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].reviews;
export const selectTrainingItem = (trainingId: string) => createSelector(selectTrainingsList, (trainingsList) => trainingsList.find((training) => training.id === trainingId));
export const selectDurationFilter = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].durationFilter;
export const selectPostTrainingStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].postTrainingStatus;
export const selectIsActiveTrainings = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].isActiveTrainings;
export const selectLoadSpecialOffersStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadSpecialOffersStatus;
export const selectLoadPopularTrainingsStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadPopularTrainingsStatus;
export const selectLoadChoiseTrainingsStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadChoiseTrainingsStatus;
export const selectLoadTrainingsStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadTrainingsStatus;
export const selectLoadTrainingsPurchasedStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadTrainingsPurchasedStatus;
export const selectLoadTrainingsOrderedStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadTrainingsOrderedStatus;
export const selectLoadTrainingStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadTrainingStatus;
export const selectUpdateTrainingStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].updateTrainingStatus;
export const selectLoadTrainerStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadTrainerStatus;
export const selectLoadReviewsStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].loadReviewsStatus;
export const selectPostReviewStatus = (state: Pick<StateType, StateName.Training>) => state[StateName.Training].postReviewStatus;
