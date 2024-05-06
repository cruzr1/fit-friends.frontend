import { Duration, MAXIMUM_PRICE_VALUE, NULL_VALUE, OrdersSortByFields, RATING_LIST, RequestStatus, SortOrder, TrainType, UserValidationParams } from '../../const';
import { TrainingStateType, addReview, setCaloriesFilter, setChoiseTrainings, setDurationFilter, setIsActiveTrainings, setPopularTrainings, setPostTrainingStatus, setPriceFilter, setRatingFilter, setReviews, setSortByField, setSortByOrder, setSpecialOffers, setTake, setTotalItems, setTrainTypeFilter, setTrainer, setTraining, setTrainingsList, setTrainingsOrderedList, training } from './training.slice';
import { MOCK_TRAININGS as trainings } from '../../mocks/mock-trainings';
import { MOCK_USERS as users } from '../../mocks/mock-users';
import { MOCK_REVIEWS as reviews } from '../../mocks/mock-reviews';
import { ReviewType, TrainingOrderedType, TrainingType, UserType } from '../../types';
import { loadChoiseTrainingsAction, loadPopularTrainingsAction, loadReviewsAction, loadSpecialOffersAction, loadTrainerAction, loadTrainingAction, loadTrainingsAction, loadTrainingsOrderedAction, loadTrainingsPurchasedAction, postReviewAction, postTrainingAction, updateTrainingAction } from './training.actions';

describe('Training Slice', () => {
  const initialState: TrainingStateType = {
    trainingsList: [],
    trainingsOrderedList: [],
    specialOffers: [],
    popularTrainings: [],
    choiseTrainings: [],
    durationFilter: Duration.From10to30min,
    take: 0,
    priceFilter: [0, 0],
    caloriesFilter: [0, 0],
    ratingFilter: [0, 0],
    trainTypeFilter: [],
    sortByOrder: 'desc',
    sortByField: OrdersSortByFields.Count,
    totalItems: 0,
    training: null,
    trainer: null,
    reviews: [],
    isActiveTrainings: false,
    postTrainingStatus: RequestStatus.Idle,
    loadSpecialOffersStatus: RequestStatus.Idle,
    loadPopularTrainingsStatus: RequestStatus.Idle,
    loadChoiseTrainingsStatus: RequestStatus.Idle,
    loadTrainingsStatus: RequestStatus.Idle,
    loadTrainingsPurchasedStatus: RequestStatus.Idle,
    loadTrainingsOrderedStatus: RequestStatus.Idle,
    loadTrainingStatus: RequestStatus.Idle,
    updateTrainingStatus: RequestStatus.Idle,
    loadTrainerStatus: RequestStatus.Idle,
    loadReviewsStatus: RequestStatus.Idle,
    postReviewStatus: RequestStatus.Idle,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = training.reducer(initialState, emptyAction);

    expect(result).toEqual({...initialState});
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = training.reducer(undefined, emptyAction);

    expect(result).toEqual({...initialState});
  });

  it('should set postTrainingStatus with "setPostTrainingStatus" action', () => {
    const mockStatus = RequestStatus.Pending;
    const expectedState = {
      ...initialState,
      postTrainingStatus: mockStatus,
    };
    const result = training.reducer(initialState, setPostTrainingStatus(mockStatus));
    expect(result).toEqual(expectedState);
  });

  it('should set specialOffers with "setSpecialOffers" action', () => {
    const mockTrainings = trainings as TrainingType[];
    const expectedState = {
      ...initialState,
      specialOffers: mockTrainings,
    };
    const result = training.reducer(initialState, setSpecialOffers(mockTrainings));
    expect(result).toEqual(expectedState);
  });

  it('should set popularTrainings with "setPopularTrainings" action', () => {
    const mockTrainings = trainings as TrainingType[];
    const expectedState = {
      ...initialState,
      popularTrainings: mockTrainings,
    };
    const result = training.reducer(initialState, setPopularTrainings(mockTrainings));
    expect(result).toEqual(expectedState);
  });

  it('should set choiseTrainings with "setChoiseTrainings" action', () => {
    const mockTrainings = trainings as TrainingType[];
    const expectedState = {
      ...initialState,
      choiseTrainings: mockTrainings,
    };
    const result = training.reducer(initialState, setChoiseTrainings(mockTrainings));
    expect(result).toEqual(expectedState);
  });

  it('should set trainingsList with "setTrainingsList" action', () => {
    const mockTrainings = trainings as TrainingType[];
    const expectedState = {
      ...initialState,
      trainingsList: mockTrainings,
    };
    const result = training.reducer(initialState, setTrainingsList(mockTrainings));
    expect(result).toEqual(expectedState);
  });

  it('should set trainingsOrderedList with "setTrainingsOrderedList" action', () => {
    const mockOrderedTrainings = trainings.map((trainingItem) => ({training: trainingItem, trainingsCount: NULL_VALUE, trainingsSum: NULL_VALUE})) as TrainingOrderedType[];
    const expectedState = {
      ...initialState,
      trainingsOrderedList: mockOrderedTrainings,
    };
    const result = training.reducer(initialState, setTrainingsOrderedList(mockOrderedTrainings));
    expect(result).toEqual(expectedState);
  });

  it('should set take with "setTake" action', () => {
    const mockTake = NULL_VALUE;
    const expectedState = {
      ...initialState,
      take: mockTake,
    };
    const result = training.reducer(initialState, setTake(mockTake));
    expect(result).toEqual(expectedState);
  });

  it('should set durationFilter with "setDurationFilter" action', () => {
    const mockDuration = Duration.From10to30min;
    const expectedState = {
      ...initialState,
      durationFilter: mockDuration,
    };
    const result = training.reducer(initialState, setDurationFilter(mockDuration));
    expect(result).toEqual(expectedState);
  });

  it('should set priceFilter with "setPriceFilter" action', () => {
    const mockPriceFilter = [NULL_VALUE, MAXIMUM_PRICE_VALUE];
    const expectedState = {
      ...initialState,
      priceFilter: mockPriceFilter,
    };
    const result = training.reducer(initialState, setPriceFilter(mockPriceFilter));
    expect(result).toEqual(expectedState);
  });

  it('should set caloriesFilter with "setCaloriesFilter" action', () => {
    const mockCaloriesFilter = [
      UserValidationParams.Calories.Value.Minimum,
      UserValidationParams.Calories.Value.Maximum
    ];
    const expectedState = {
      ...initialState,
      caloriesFilter: mockCaloriesFilter,
    };
    const result = training.reducer(initialState, setCaloriesFilter(mockCaloriesFilter));
    expect(result).toEqual(expectedState);
  });

  it('should set ratingFilter with "setRatingFilter" action', () => {
    const mockRatingFilter = [
      Math.min(...RATING_LIST),
      Math.max(...RATING_LIST),
    ];
    const expectedState = {
      ...initialState,
      ratingFilter: mockRatingFilter,
    };
    const result = training.reducer(initialState, setRatingFilter(mockRatingFilter));
    expect(result).toEqual(expectedState);
  });

  it('should set trainTypeFilter with "setTrainTypeFilter" action', () => {
    const mockTrainTypeFilter = [TrainType.Aerobics, TrainType.Yoga];
    const expectedState = {
      ...initialState,
      trainTypeFilter: mockTrainTypeFilter,
    };
    const result = training.reducer(initialState, setTrainTypeFilter(mockTrainTypeFilter));
    expect(result).toEqual(expectedState);
  });

  it('should set sortByOrder with "setSortByOrder" action', () => {
    const mockSortOrder = SortOrder.Desc;
    const expectedState = {
      ...initialState,
      sortByOrder: mockSortOrder,
    };
    const result = training.reducer(initialState, setSortByOrder(mockSortOrder));
    expect(result).toEqual(expectedState);
  });

  it('should set sortByField with "setSortByField" action', () => {
    const mockSortField = OrdersSortByFields.Count;
    const expectedState = {
      ...initialState,
      sortByField: mockSortField,
    };
    const result = training.reducer(initialState, setSortByField(mockSortField));
    expect(result).toEqual(expectedState);
  });

  it('should set totalItems with "setTotalItems" action', () => {
    const mockTotalItems = NULL_VALUE;
    const expectedState = {
      ...initialState,
      totalItems: mockTotalItems,
    };
    const result = training.reducer(initialState, setTotalItems(mockTotalItems));
    expect(result).toEqual(expectedState);
  });

  it('should set isActiveTrainings with "setIsActiveTrainings" action', () => {
    const mockIsActiveTrainings = true;
    const expectedState = {
      ...initialState,
      isActiveTrainings: mockIsActiveTrainings,
    };
    const result = training.reducer(initialState, setIsActiveTrainings(mockIsActiveTrainings));
    expect(result).toEqual(expectedState);
  });

  it('should set training with "setTraining" action', () => {
    const mockTraining = trainings[NULL_VALUE] as TrainingType;
    const expectedState = {
      ...initialState,
      training: mockTraining,
    };
    const result = training.reducer(initialState, setTraining(mockTraining));
    expect(result).toEqual(expectedState);
  });

  it('should set trainer with "setTrainer" action', () => {
    const mockTrainer = users[NULL_VALUE] as UserType;
    const expectedState = {
      ...initialState,
      trainer: mockTrainer,
    };
    const result = training.reducer(initialState, setTrainer(mockTrainer));
    expect(result).toEqual(expectedState);
  });

  it('should set reviews with "setReviews" action', () => {
    const mockReviews = reviews as ReviewType[];
    const expectedState = {
      ...initialState,
      reviews: mockReviews,
    };
    const result = training.reducer(initialState, setReviews(mockReviews));
    expect(result).toEqual(expectedState);
  });

  it('should add review with "addReview" action', () => {
    const mockReview = reviews[NULL_VALUE] as ReviewType;
    const expectedState = {
      ...initialState,
      reviews: [mockReview, ...initialState.reviews],
    };
    const result = training.reducer(initialState, addReview(mockReview));
    expect(result).toEqual(expectedState);
  });

  it('should set postTrainingStatus to RequestStatus.Pending with "postTrainingAction.pending"', () => {
    const expectedState = {
      ...initialState,
      postTrainingStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, postTrainingAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set postTrainingStatus to RequestStatus.Rejected with "postTrainingAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      postTrainingStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, postTrainingAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set postTrainingStatus to RequestStatus.Fulfilled with "postTrainingAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      postTrainingStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, postTrainingAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadSpecialOffersStatus to RequestStatus.Pending with "loadSpecialOffersAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadSpecialOffersStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadSpecialOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadPopularTrainingsStatus to RequestStatus.Pending with "loadPopularTrainingsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadPopularTrainingsStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadPopularTrainingsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadChoiseTrainingsStatus to RequestStatus.Pending with "loadChoiseTrainingsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadChoiseTrainingsStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadChoiseTrainingsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsStatus to RequestStatus.Pending with "loadTrainingsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadTrainingsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsPurchasedStatus to RequestStatus.Pending with "loadTrainingsPurchasedAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsPurchasedStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadTrainingsPurchasedAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsOrderedStatus to RequestStatus.Pending with "loadTrainingsOrderedAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsOrderedStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadTrainingsOrderedAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingStatus to RequestStatus.Pending with "loadTrainingAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadTrainingAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set updateTrainingStatus to RequestStatus.Pending with "updateTrainingAction.pending"', () => {
    const expectedState = {
      ...initialState,
      updateTrainingStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, updateTrainingAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainerStatus to RequestStatus.Pending with "loadTrainerAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadTrainerStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadTrainerAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadReviewsStatus to RequestStatus.Pending with "loadReviewsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      loadReviewsStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, loadReviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set postReviewStatus to RequestStatus.Pending with "postReviewAction.pending"', () => {
    const expectedState = {
      ...initialState,
      postReviewStatus: RequestStatus.Pending,
    };
    const result = training.reducer(initialState, postReviewAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set loadSpecialOffersStatus to RequestStatus.Rejected with "loadSpecialOffersAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadSpecialOffersStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadSpecialOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadPopularTrainingsStatus to RequestStatus.Rejected with "loadPopularTrainingsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadPopularTrainingsStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadPopularTrainingsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadChoiseTrainingsStatus to RequestStatus.Rejected with "loadChoiseTrainingsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadChoiseTrainingsStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadChoiseTrainingsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsStatus to RequestStatus.Rejected with "loadTrainingsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadTrainingsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsPurchasedStatus to RequestStatus.Rejected with "loadTrainingsPurchasedAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsPurchasedStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadTrainingsPurchasedAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsOrderedStatus to RequestStatus.Rejected with "loadTrainingsOrderedAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsOrderedStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadTrainingsOrderedAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingStatus to RequestStatus.Rejected with "loadTrainingAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadTrainingAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set updateTrainingStatus to RequestStatus.Rejected with "updateTrainingAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      updateTrainingStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, updateTrainingAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainerStatus to RequestStatus.Rejected with "loadTrainerAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadTrainerStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadTrainerAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadReviewsStatus to RequestStatus.Rejected with "loadReviewsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      loadReviewsStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, loadReviewsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set postReviewStatus to RequestStatus.Rejected with "postReviewAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      postReviewStatus: RequestStatus.Rejected,
    };
    const result = training.reducer(initialState, postReviewAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set loadSpecialOffersStatus to RequestStatus.Fulfilled with "loadSpecialOffersAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadSpecialOffersStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadSpecialOffersAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadPopularTrainingsStatus to RequestStatus.Fulfilled with "loadPopularTrainingsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadPopularTrainingsStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadPopularTrainingsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadChoiseTrainingsStatus to RequestStatus.Fulfilled with "loadChoiseTrainingsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadChoiseTrainingsStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadChoiseTrainingsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsStatus to RequestStatus.Fulfilled with "loadTrainingsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadTrainingsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsPurchasedStatus to RequestStatus.Fulfilled with "loadTrainingsPurchasedAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsPurchasedStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadTrainingsPurchasedAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingsOrderedStatus to RequestStatus.Fulfilled with "loadTrainingsOrderedAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingsOrderedStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadTrainingsOrderedAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainingStatus to RequestStatus.Fulfilled with "loadTrainingAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadTrainingStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadTrainingAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set updateTrainingStatus to RequestStatus.Fulfilled with "updateTrainingAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      updateTrainingStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, updateTrainingAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadTrainerStatus to RequestStatus.Fulfilled with "loadTrainerAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadTrainerStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadTrainerAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set loadReviewsStatus to RequestStatus.Fulfilled with "loadReviewsAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      loadReviewsStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, loadReviewsAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should set postReviewStatus to RequestStatus.Fulfilled with "postReviewAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      postReviewStatus: RequestStatus.Fulfilled,
    };
    const result = training.reducer(initialState, postReviewAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
