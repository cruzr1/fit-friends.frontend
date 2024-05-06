import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createApi } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatchType, CreateTrainingType, EntitiesWithPaginationType, PostReviewType, QueryTrainingsOrderedType, QueryTrainingsPurchasedType, QueryTrainingsType, ReviewType, StateType, TrainingType, UpdateTrainingType, UserFeaturesType, UserType } from '../../types';
import { StatusCodes } from 'http-status-codes';
import { APIPath, CATALOG_COUNT, CHOISE_TRAININGS_COUNT, Duration, Level, MAXIMUM_PRICE_VALUE, NULL_VALUE, OrdersSortByFields, POPULAR_TRAININGS_COUNT, POPULAR_TRAININGS_SORT_FIELD, RATING_LIST, SPECIAL_OFFERS_COUNT, SortOrder, TRAININGS_CATALOG_SORT_FIELD, TrainType, UserValidationParams } from '../../const';
import { loadChoiseTrainingsAction, loadPopularTrainingsAction, loadReviewsAction, loadSpecialOffersAction, loadTrainerAction, loadTrainingAction, loadTrainingsAction, loadTrainingsOrderedAction, loadTrainingsPurchasedAction, postReviewAction, postTrainingAction, updateTrainingAction } from './training.actions';
import { setError } from '../error/error.slice';
import { clearErrorAction } from '../error/error.actions';
import { MOCK_TRAININGS as trainings } from '../../mocks/mock-trainings';
import { MOCK_REVIEWS as reviews } from '../../mocks/mock-reviews';
import { MOCK_USERS as users } from '../../mocks/mock-users';
import { addReview, setChoiseTrainings, setPopularTrainings, setReviews, setSpecialOffers, setTotalItems, setTrainer, setTraining, setTrainingsList, setTrainingsOrderedList } from './training.slice';
import { adaptSortOrder } from '../../helpers';

describe('Async training actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatchType>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const paginatedTrainings = {
    entities: trainings as TrainingType[],
    totalPages: NULL_VALUE,
    currentPage: NULL_VALUE,
    totalItems: NULL_VALUE,
  };


  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('loadSpecialOffersAction', () => {
    const mockQuery = {
      isSpecial: true,
      take: SPECIAL_OFFERS_COUNT,
    };
    it('should dispatch "loadSpecialOffersAction.pending", "setSpecialOffers", "loadSpecialOffersAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(APIPath.Trainings.Index, {params: mockQuery}).reply<EntitiesWithPaginationType<TrainingType>>(StatusCodes.OK, paginatedTrainings);
      await store.dispatch(loadSpecialOffersAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof loadSpecialOffersAction.fulfilled>;
      expect(actionTypes).toEqual([
        loadSpecialOffersAction.pending.type,
        setSpecialOffers.type,
        loadSpecialOffersAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedTrainings.entities);
    });

    it('should dispatch "loadSpecialOffersAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadSpecialOffersAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(APIPath.Trainings.Index, {params: mockQuery}).reply(StatusCodes.BAD_REQUEST, []);
      await store.dispatch(loadSpecialOffersAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadSpecialOffersAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadSpecialOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('loadPopularTrainingsAction', () => {
    const mockQuery = {
      take: POPULAR_TRAININGS_COUNT,
      sortByField: POPULAR_TRAININGS_SORT_FIELD,
    };
    it('should dispatch "loadPopularTrainingsAction.pending", "setPopularTrainings", "loadPopularTrainingsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(APIPath.Trainings.Index, {params: mockQuery}).reply<EntitiesWithPaginationType<TrainingType>>(StatusCodes.OK, paginatedTrainings);
      await store.dispatch(loadPopularTrainingsAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof loadPopularTrainingsAction.fulfilled>;
      expect(actionTypes).toEqual([
        loadPopularTrainingsAction.pending.type,
        setPopularTrainings.type,
        loadPopularTrainingsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedTrainings.entities);
    });

    it('should dispatch "loadPopularTrainingsAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadPopularTrainingsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(APIPath.Trainings.Index, {params: mockQuery}).reply(StatusCodes.BAD_REQUEST, []);
      await store.dispatch(loadPopularTrainingsAction());
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadPopularTrainingsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadPopularTrainingsAction.fulfilled.type,
      ]);
    });
  });

  describe('loadChoiseTrainingsAction', () => {
    const duration = Duration.From50to80min;
    const trainType = [TrainType.Aerobics, TrainType.Boxing];
    const level = Level.Professional;
    const caloriesDaily = UserValidationParams.Calories.Value.Maximum;
    const mockParams: UserFeaturesType = {duration, trainType, level, caloriesDaily};
    const mockQuery = {
      take: CHOISE_TRAININGS_COUNT,
      caloriesFilter: [NULL_VALUE, caloriesDaily],
      durationFilter: [duration],
      trainTypeFilter: trainType,
      level: level
    };
    it('should dispatch "loadChoiseTrainingsAction.pending", "setChoiseTrainings", "loadChoiseTrainingsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(APIPath.Trainings.Index, {params: mockQuery}).reply<EntitiesWithPaginationType<TrainingType>>(StatusCodes.OK, paginatedTrainings);
      await store.dispatch(loadChoiseTrainingsAction(mockParams));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof loadChoiseTrainingsAction.fulfilled>;
      expect(actionTypes).toEqual([
        loadChoiseTrainingsAction.pending.type,
        setChoiseTrainings.type,
        loadChoiseTrainingsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedTrainings.entities);
    });

    it('should dispatch "loadChoiseTrainingsAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadChoiseTrainingsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(APIPath.Trainings.Index, {params: mockQuery}).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadChoiseTrainingsAction(mockParams));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadChoiseTrainingsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadChoiseTrainingsAction.fulfilled.type,
      ]);
    });
  });

  describe('loadTrainingsAction', () => {

    const take = CATALOG_COUNT;
    const priceFilter = [NULL_VALUE, MAXIMUM_PRICE_VALUE];
    const caloriesFilter = [
      UserValidationParams.Calories.Value.Minimum,
      UserValidationParams.Calories.Value.Maximum,
    ];
    const ratingFilter = [
      Math.min(...RATING_LIST),
      Math.min(...RATING_LIST),
    ];
    const trainTypeFilter = [TrainType.Aerobics, TrainType.Boxing];
    const sortByOrder = SortOrder.Desc;
    const durationFilter = Duration.From50to80min;
    const sortByField = TRAININGS_CATALOG_SORT_FIELD;
    const mockParams: QueryTrainingsType = {take, priceFilter, caloriesFilter, ratingFilter, trainTypeFilter, sortByOrder, durationFilter};
    const mockQuery = {
      take,
      priceFilter,
      caloriesFilter,
      ratingFilter,
      trainTypeFilter,
      sortByOrder,
      sortByField,
      durationFilter: [durationFilter],
    };
    it('should dispatch "loadTrainingsAction.pending", "setTrainingsList", "setTotalItems", "loadTrainingsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(APIPath.Trainings.Index, {params: mockQuery}).reply<EntitiesWithPaginationType<TrainingType>>(StatusCodes.OK, paginatedTrainings);
      await store.dispatch(loadTrainingsAction(mockParams));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof loadTrainingsAction.fulfilled>;
      expect(actionTypes).toEqual([
        loadTrainingsAction.pending.type,
        setTrainingsList.type,
        setTotalItems.type,
        loadTrainingsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedTrainings.entities);
    });

    it('should dispatch "loadTrainingsAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadTrainingsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(APIPath.Trainings.Index, {params: mockQuery}).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadTrainingsAction(mockParams));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadTrainingsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadTrainingsAction.fulfilled.type,
      ]);
    });
  });

  describe('loadTrainingsPurchasedAction', () => {
    const take = CATALOG_COUNT;
    const isActiveTrainings = true;
    const mockParams: QueryTrainingsPurchasedType = {take, isActiveTrainings};
    const mockQuery = {
      take,
      isActiveTrainings,
    };
    it('should dispatch "loadTrainingsPurchasedAction.pending", "setTrainingsList", "setTotalItems", "loadTrainingsPurchasedAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(APIPath.Trainings.Purchases, {params: mockQuery}).reply<EntitiesWithPaginationType<TrainingType>>(StatusCodes.OK, paginatedTrainings);
      await store.dispatch(loadTrainingsPurchasedAction(mockParams));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof loadTrainingsPurchasedAction.fulfilled>;
      expect(actionTypes).toEqual([
        loadTrainingsPurchasedAction.pending.type,
        setTrainingsList.type,
        setTotalItems.type,
        loadTrainingsPurchasedAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedTrainings.entities);
    });

    it('should dispatch "loadTrainingsPurchasedAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadTrainingsPurchasedAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(APIPath.Trainings.Purchases, {params: mockQuery}).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadTrainingsPurchasedAction(mockParams));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadTrainingsPurchasedAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadTrainingsPurchasedAction.fulfilled.type,
      ]);
    });
  });

  describe('loadTrainingsOrderedAction', () => {
    const take = CATALOG_COUNT;
    const sortByField = OrdersSortByFields.Sum;
    const sortByOrder = SortOrder.Asc;
    const mockParams: QueryTrainingsOrderedType = {take, sortByField, sortByOrder};
    const mockQuery = {
      take,
      sortByField,
      sortByOrder: adaptSortOrder(sortByOrder),
    };
    it('should dispatch "loadTrainingsOrderedAction.pending", "setTrainingsOrderedList", "setTotalItems", "loadTrainingsOrderedAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(APIPath.Trainings.Orders, {params: mockQuery}).reply<EntitiesWithPaginationType<TrainingType>>(StatusCodes.OK, paginatedTrainings);
      await store.dispatch(loadTrainingsOrderedAction(mockParams));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof loadTrainingsOrderedAction.fulfilled>;
      expect(actionTypes).toEqual([
        loadTrainingsOrderedAction.pending.type,
        setTrainingsOrderedList.type,
        setTotalItems.type,
        loadTrainingsOrderedAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(paginatedTrainings.entities);
    });

    it('should dispatch "loadTrainingsOrderedAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadTrainingsOrderedAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(APIPath.Trainings.Orders, {params: mockQuery}).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadTrainingsOrderedAction(mockParams));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadTrainingsOrderedAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadTrainingsOrderedAction.fulfilled.type,
      ]);
    });
  });

  describe('postTrainingAction', () => {
    const mockTraining = trainings[NULL_VALUE] as TrainingType;
    const mockTrainingId = trainings[0].id;
    it('should dispatch "loadTrainingAction.pending", "loadTrainerAction", "setTraining", "loadTrainingAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Trainings.Index}/${mockTrainingId}`).reply<TrainingType>(StatusCodes.OK, mockTraining);
      await store.dispatch(loadTrainingAction(mockTrainingId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(2) as ReturnType<typeof loadTrainingAction.fulfilled>;
      expect(actionTypes).toEqual([
        loadTrainingAction.pending.type,
        loadTrainerAction.pending.type,
        setTraining.type,
        loadTrainingAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockTraining);
    });

    it('should dispatch "loadTrainingAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadTrainingAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Trainings.Index}/${mockTrainingId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadTrainingAction(mockTrainingId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadTrainingAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadTrainingAction.fulfilled.type,
      ]);
    });
  });

  describe('postTrainingAction', () => {
    const {
      name,
      backgroundImage,
      level,
      trainType,
      duration,
      price,
      calories,
      description,
      gender,
      videoURL,
      isSpecial
    } = trainings[NULL_VALUE] as TrainingType;
    const mockCreateTraining: CreateTrainingType = {
      name,
      backgroundImage,
      level,
      trainType,
      duration,
      price,
      calories,
      description,
      gender,
      videoURL,
      isSpecial
    };
    it('should dispatch "postTrainingAction.pending", "postTrainingAction.fulfilled", when server responds 201', async () => {
      mockApi.onPost(APIPath.Trainings.Index, mockCreateTraining).reply(StatusCodes.CREATED);
      await store.dispatch(postTrainingAction(mockCreateTraining));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        postTrainingAction.pending.type,
        postTrainingAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postTrainingAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "postTrainingAction.fulfilled", when server responds 400', async () => {
      mockApi.onPost(APIPath.Trainings.Index, mockCreateTraining).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(postTrainingAction(mockCreateTraining));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        postTrainingAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        postTrainingAction.fulfilled.type,
      ]);
    });
  });

  describe('updateTrainingAction', () => {
    const mockTraining = trainings[NULL_VALUE] as TrainingType;
    const {
      id,
      name,
      backgroundImage,
      level,
      trainType,
      description,
      gender,
      videoURL,
      isSpecial
    } = mockTraining;
    const mockUpdateTraining: UpdateTrainingType = {
      id,
      name,
      backgroundImage,
      level,
      trainType,
      description,
      gender,
      videoURL,
      isSpecial
    };
    const trainingData = {
      name,
      backgroundImage,
      level,
      trainType,
      description,
      gender,
      videoURL,
      isSpecial
    };
    it('should dispatch "updateTrainingAction.pending", "setTraining", "updateTrainingAction.fulfilled", when server responds 200', async () => {
      mockApi.onPatch(`${APIPath.Trainings.Index}/${id}`, trainingData).reply<TrainingType>(StatusCodes.OK, mockTraining);
      await store.dispatch(updateTrainingAction(mockUpdateTraining));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setTraining>;
      expect(actionTypes).toEqual([
        updateTrainingAction.pending.type,
        setTraining.type,
        updateTrainingAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockTraining);
    });

    it('should dispatch "updateTrainingAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "updateTrainingAction.fulfilled", when server responds 400', async () => {
      mockApi.onPatch(`${APIPath.Trainings.Index}/${id}`, trainingData).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(updateTrainingAction(mockUpdateTraining));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        updateTrainingAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        updateTrainingAction.fulfilled.type,
      ]);
    });
  });

  describe('loadTrainerAction', () => {
    const mockTrainer = users[NULL_VALUE] as UserType;
    const mockTrainerId = mockTrainer.id;
    it('should dispatch "loadTrainerAction.pending", "setTrainer", "loadTrainerAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Users.Old}/${mockTrainerId}`).reply<UserType>(StatusCodes.OK, mockTrainer);
      await store.dispatch(loadTrainerAction(mockTrainerId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setTrainer>;
      expect(actionTypes).toEqual([
        loadTrainerAction.pending.type,
        setTrainer.type,
        loadTrainerAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockTrainer);
    });

    it('should dispatch "loadTrainerAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadTrainerAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Users.Old}/${mockTrainerId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadTrainerAction(mockTrainerId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadTrainerAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadTrainerAction.fulfilled.type,
      ]);
    });
  });

  describe('loadReviewsAction', () => {
    const mockTraining = trainings[NULL_VALUE] as TrainingType;
    const mockTrainingId = mockTraining.id;
    const paginatedReviews = {
      entities: reviews as ReviewType[],
      totalPages: NULL_VALUE,
      currentPage: NULL_VALUE,
      totalItems: NULL_VALUE,
    };
    it('should dispatch "loadReviewsAction.pending", "setReviews", "loadReviewsAction.fulfilled", when server responds 200', async () => {
      mockApi.onGet(`${APIPath.Reviews.Index}/${mockTrainingId}`).reply<EntitiesWithPaginationType<ReviewType>>(StatusCodes.OK, paginatedReviews);
      await store.dispatch(loadReviewsAction(mockTrainingId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof setReviews>;
      expect(actionTypes).toEqual([
        loadReviewsAction.pending.type,
        setReviews.type,
        loadReviewsAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(reviews);
    });

    it('should dispatch "loadReviewsAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "loadReviewsAction.fulfilled", when server responds 400', async () => {
      mockApi.onGet(`${APIPath.Reviews.Index}/${mockTrainingId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(loadReviewsAction(mockTrainingId));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        loadReviewsAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        loadReviewsAction.fulfilled.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    const mockReview = reviews[NULL_VALUE] as ReviewType;
    const {trainingId} = mockReview;
    const mockReviewItem: PostReviewType = {
      comment: mockReview.comment,
      rating: mockReview.rating,
      trainingId: mockReview.trainingId,
    };
    it('should dispatch "postReviewAction.pending", "addReview", "postReviewAction.fulfilled", when server responds 201', async () => {
      mockApi.onPost(`${APIPath.Reviews.Index}/${trainingId}`).reply<ReviewType>(StatusCodes.CREATED, mockReview);
      await store.dispatch(postReviewAction(mockReviewItem));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      const thunkFulfilled = actions.at(1) as ReturnType<typeof addReview>;
      expect(actionTypes).toEqual([
        postReviewAction.pending.type,
        addReview.type,
        postReviewAction.fulfilled.type,
      ]);
      expect(thunkFulfilled.payload).toEqual(mockReview);
    });

    it('should dispatch "postReviewAction.pending", "clearErrorAction.pending", "setError.", "clearErrorAction.fulfilled", "postReviewAction.fulfilled", when server responds 400', async () => {
      mockApi.onPost(`${APIPath.Reviews.Index}/${trainingId}`).reply(StatusCodes.BAD_REQUEST);
      await store.dispatch(postReviewAction(mockReviewItem));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        postReviewAction.pending.type,
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
        postReviewAction.fulfilled.type,
      ]);
    });
  });
});
