import { RequestStatus, StateName, TrainType, NULL_VALUE, SortOrder, OrdersSortByFields, MAXIMUM_PRICE_VALUE, UserValidationParams, RATING_LIST, Duration } from '../../const';
import { selectCaloriesFilter, selectChoiseTrainings, selectDurationFilter, selectIsActiveTrainings, selectLoadChoiseTrainingsStatus, selectLoadPopularTrainingsStatus, selectLoadReviewsStatus, selectLoadSpecialOffersStatus, selectLoadTrainerStatus, selectLoadTrainingStatus, selectLoadTrainingsOrderedStatus, selectLoadTrainingsPurchasedStatus, selectPopularTrainings, selectPostReviewStatus, selectPostTrainingStatus, selectPriceFilter, selectRatingFilter, selectReviews, selectSortByField, selectSortByOrder, selectSpecialOffers, selectTake, selectTotalItems, selectTrainTypeFilter, selectTrainer, selectTraining, selectTrainingsList, selectTrainingsOrderedList, selectUpdateTrainingStatus } from './training.selectors';
import { MOCK_TRAININGS as trainings } from '../../mocks/mock-trainings';
import { MOCK_USERS as users } from '../../mocks/mock-users';
import { MOCK_REVIEWS as reviews } from '../../mocks/mock-reviews';
import { TrainingType, TrainingOrderedType, UserType, ReviewType } from '../../types';

describe('Training selectors', () => {
  const orderedTrainings = trainings.map((training) => ({training, trainingsCount: NULL_VALUE, trainingsSum: NULL_VALUE}));
  const state = {
    [StateName.Training]: {
      trainingsList: trainings as TrainingType[],
      trainingsOrderedList: orderedTrainings as TrainingOrderedType[],
      specialOffers: trainings as TrainingType[],
      popularTrainings: trainings as TrainingType[],
      choiseTrainings: trainings as TrainingType[],
      take: NULL_VALUE,
      priceFilter: [NULL_VALUE, MAXIMUM_PRICE_VALUE],
      caloriesFilter: [
        UserValidationParams.Calories.Value.Minimum,
        UserValidationParams.Calories.Value.Maximum
      ],
      ratingFilter: [
        Math.min(...RATING_LIST),
        Math.max(...RATING_LIST),
      ],
      durationFilter: Duration.From10to30min,
      trainTypeFilter: [TrainType.Aerobics, TrainType.Yoga],
      sortByOrder: SortOrder.Desc,
      sortByField: OrdersSortByFields.Count,
      totalItems: NULL_VALUE,
      training: trainings[NULL_VALUE] as TrainingType,
      trainer: users[NULL_VALUE] as UserType,
      reviews: reviews as ReviewType[],
      isActiveTrainings: true,
      postTrainingStatus: RequestStatus.Pending,
      loadPopularTrainingsStatus: RequestStatus.Pending,
      loadSpecialOffersStatus: RequestStatus.Pending,
      loadChoiseTrainingsStatus: RequestStatus.Pending,
      loadTrainingsStatus: RequestStatus.Pending,
      loadTrainingsPurchasedStatus: RequestStatus.Pending,
      loadTrainingsOrderedStatus: RequestStatus.Pending,
      loadTrainingStatus: RequestStatus.Pending,
      updateTrainingStatus: RequestStatus.Pending,
      loadTrainerStatus: RequestStatus.Pending,
      loadReviewsStatus: RequestStatus.Pending,
      postReviewStatus: RequestStatus.Pending,
    }
  };

  it('should return trainingsList from state', () => {
    const {trainingsList} = state[StateName.Training];
    const result = selectTrainingsList(state);
    expect(result).toEqual(trainingsList);
  });

  it('should return trainingsOrderedList from state', () => {
    const {trainingsOrderedList} = state[StateName.Training];
    const result = selectTrainingsOrderedList(state);
    expect(result).toEqual(trainingsOrderedList);
  });

  it('should return specialOffers from state', () => {
    const {specialOffers} = state[StateName.Training];
    const result = selectSpecialOffers(state);
    expect(result).toEqual(specialOffers);
  });

  it('should return popularTrainings from state', () => {
    const {popularTrainings} = state[StateName.Training];
    const result = selectPopularTrainings(state);
    expect(result).toEqual(popularTrainings);
  });

  it('should return choiseTrainings from state', () => {
    const {choiseTrainings} = state[StateName.Training];
    const result = selectChoiseTrainings(state);
    expect(result).toEqual(choiseTrainings);
  });

  it('should return take from state', () => {
    const {take} = state[StateName.Training];
    const result = selectTake(state);
    expect(result).toBe(take);
  });

  it('should return priceFilter from state', () => {
    const {priceFilter} = state[StateName.Training];
    const result = selectPriceFilter(state);
    expect(result).toEqual(priceFilter);
  });

  it('should return caloriesFilter from state', () => {
    const {caloriesFilter} = state[StateName.Training];
    const result = selectCaloriesFilter(state);
    expect(result).toEqual(caloriesFilter);
  });

  it('should return ratingFilter from state', () => {
    const {ratingFilter} = state[StateName.Training];
    const result = selectRatingFilter(state);
    expect(result).toEqual(ratingFilter);
  });

  it('should return durationFilter from state', () => {
    const {durationFilter} = state[StateName.Training];
    const result = selectDurationFilter(state);
    expect(result).toBe(durationFilter);
  });

  it('should return trainTypeFilter from state', () => {
    const {trainTypeFilter} = state[StateName.Training];
    const result = selectTrainTypeFilter(state);
    expect(result).toEqual(trainTypeFilter);
  });

  it('should return sortByOrder from state', () => {
    const {sortByOrder} = state[StateName.Training];
    const result = selectSortByOrder(state);
    expect(result).toBe(sortByOrder);
  });

  it('should return sortByField from state', () => {
    const {sortByField} = state[StateName.Training];
    const result = selectSortByField(state);
    expect(result).toBe(sortByField);
  });

  it('should return totalItems from state', () => {
    const {totalItems} = state[StateName.Training];
    const result = selectTotalItems(state);
    expect(result).toBe(totalItems);
  });

  it('should return training from state', () => {
    const {training} = state[StateName.Training];
    const result = selectTraining(state);
    expect(result).toEqual(training);
  });

  it('should return trainer from state', () => {
    const {trainer} = state[StateName.Training];
    const result = selectTrainer(state);
    expect(result).toEqual(trainer);
  });

  it('should return reviews from state', () => {
    const {reviews: reviewsList} = state[StateName.Training];
    const result = selectReviews(state);
    expect(result).toEqual(reviewsList);
  });

  it('should return isActiveTrainings from state', () => {
    const {isActiveTrainings} = state[StateName.Training];
    const result = selectIsActiveTrainings(state);
    expect(result).toEqual(isActiveTrainings);
  });

  it('should return postTrainingStatus from state', () => {
    const {postTrainingStatus} = state[StateName.Training];
    const result = selectPostTrainingStatus(state);
    expect(result).toBe(postTrainingStatus);
  });

  it('should return loadPopularTrainingsStatus from state', () => {
    const {loadPopularTrainingsStatus} = state[StateName.Training];
    const result = selectLoadPopularTrainingsStatus(state);
    expect(result).toBe(loadPopularTrainingsStatus);
  });

  it('should return loadSpecialOffersStatus from state', () => {
    const {loadSpecialOffersStatus} = state[StateName.Training];
    const result = selectLoadSpecialOffersStatus(state);
    expect(result).toBe(loadSpecialOffersStatus);
  });

  it('should return loadChoiseTrainingsStatus from state', () => {
    const {loadChoiseTrainingsStatus} = state[StateName.Training];
    const result = selectLoadChoiseTrainingsStatus(state);
    expect(result).toBe(loadChoiseTrainingsStatus);
  });

  it('should return loadTrainingsStatus from state', () => {
    const {loadTrainingsStatus} = state[StateName.Training];
    const result = selectLoadTrainingStatus(state);
    expect(result).toBe(loadTrainingsStatus);
  });

  it('should return loadTrainingsPurchasedStatus from state', () => {
    const {loadTrainingsPurchasedStatus} = state[StateName.Training];
    const result = selectLoadTrainingsPurchasedStatus(state);
    expect(result).toBe(loadTrainingsPurchasedStatus);
  });

  it('should return loadTrainingsOrderedStatus from state', () => {
    const {loadTrainingsOrderedStatus} = state[StateName.Training];
    const result = selectLoadTrainingsOrderedStatus(state);
    expect(result).toBe(loadTrainingsOrderedStatus);
  });

  it('should return loadTrainingStatus from state', () => {
    const {loadTrainingStatus} = state[StateName.Training];
    const result = selectLoadTrainingStatus(state);
    expect(result).toBe(loadTrainingStatus);
  });

  it('should return updateTrainingStatus from state', () => {
    const {updateTrainingStatus} = state[StateName.Training];
    const result = selectUpdateTrainingStatus(state);
    expect(result).toBe(updateTrainingStatus);
  });

  it('should return loadTrainerStatus from state', () => {
    const {loadTrainerStatus} = state[StateName.Training];
    const result = selectLoadTrainerStatus(state);
    expect(result).toBe(loadTrainerStatus);
  });

  it('should return loadReviewsStatus from state', () => {
    const {loadReviewsStatus} = state[StateName.Training];
    const result = selectLoadReviewsStatus(state);
    expect(result).toBe(loadReviewsStatus);
  });

  it('should return postReviewStatus from state', () => {
    const {postReviewStatus} = state[StateName.Training];
    const result = selectPostReviewStatus(state);
    expect(result).toBe(postReviewStatus);
  });
});
